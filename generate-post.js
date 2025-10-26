import fs from "fs";
import path from "path";
import OpenAI from "openai";
import { marked } from "marked";

let usePAAPI = !!(process.env.AMAZON_ACCESS_KEY && process.env.AMAZON_SECRET_KEY);

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Optional import only if PA-API keys exist
let searchAmazonProducts = null;
if (usePAAPI) {
  const pa = await import("amazon-pa-api50").catch(() => null);
  if (pa) {
    const { DefaultApi, SearchItemsRequest } = pa;
    const api = new DefaultApi({
      accessKey: process.env.AMAZON_ACCESS_KEY,
      secretKey: process.env.AMAZON_SECRET_KEY,
      partnerTag: "smartfinds403-21",
      region: "EU",
    });

    searchAmazonProducts = async (keyword) => {
      try {
        const req = new SearchItemsRequest();
        req.Keywords = keyword;
        req.PartnerTag = "smartfinds403-21";
        req.PartnerType = "Associates";
        req.Resources = [
          "Images.Primary.Medium",
          "ItemInfo.Title",
          "Offers.Listings.Price",
        ];
        const res = await api.searchItems(req);
        const items = res.SearchResult?.Items || [];
        return items.map((i) => ({
          title: i.ItemInfo?.Title?.DisplayValue,
          asin: i.ASIN,
          image: i.Images?.Primary?.Medium?.URL,
          price: i.Offers?.Listings?.[0]?.Price?.DisplayAmount,
          link: i.DetailPageURL,
        }));
      } catch (err) {
        console.warn("⚠️ PA-API fallback:", err.message);
        return [];
      }
    };
  } else {
    usePAAPI = false;
  }
}

// ---------- HELPERS FOR AMAZON LINKS ----------
function randomCode(length = 10) {
  const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  return Array.from({ length }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
}

function buildSearchUrl(keyword) {
  const u = new URL("https://www.amazon.ie/s");
  u.searchParams.set("k", keyword);
  u.searchParams.set("tag", "smartfinds403-21");
  u.searchParams.set("linkCode", "ll1");
  u.searchParams.set("language", "en_IE");
  u.searchParams.set("ref_", "as_li_ss_tl");
  return u.toString();
}

function buildRealisticAmazonUrl(asin, name) {
  const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
  const u = new URL(`https://www.amazon.ie/${slug}/dp/${asin}`);
  u.searchParams.set("pd_rd_w", randomCode(5));
  u.searchParams.set("content-id", `amzn1.sym.${randomCode(15)}`);
  u.searchParams.set("pf_rd_p", randomCode(15));
  u.searchParams.set("pf_rd_r", randomCode(12));
  u.searchParams.set("pd_rd_i", asin);
  u.searchParams.set("th", "1");
  u.searchParams.set("psc", "1");
  u.searchParams.set("linkCode", "ll1");
  u.searchParams.set("tag", "smartfinds403-21");
  u.searchParams.set("linkId", randomCode(16));
  u.searchParams.set("language", "en_IE");
  u.searchParams.set("ref_", "as_li_ss_tl");
  return u.toString();
}

async function generatePost() {
  console.log("🧠 Generating SmartFinds4You post...");

  const today = new Date();
  const dateStr = today.toISOString().split("T")[0];
  const titleSlug = "smart-gadgets-daily-picks";
  const mdFileName = `${dateStr}-${titleSlug}.md`;
  const htmlFileName = `${dateStr}-${titleSlug}.html`;
  const imageFileName = `${dateStr}-thumb.png`;

  const postsDir = path.join("blog", "posts");
  const imgDir = path.join(postsDir, "images");
  if (!fs.existsSync(postsDir)) fs.mkdirSync(postsDir, { recursive: true });
  if (!fs.existsSync(imgDir)) fs.mkdirSync(imgDir, { recursive: true });

  let products = [];

  if (usePAAPI && searchAmazonProducts) {
    console.log("🛍️ Fetching products via Amazon PA-API...");
    products = await searchAmazonProducts("smart gadgets");
  }

  const productDescriptions = products.length
    ? products
        .slice(0, 5)
        .map(
          (p, i) =>
            `### ${i + 1}. ${p.title}\n💰 **${p.price || "Check price on Amazon"}**  \n🛒 [Buy on Amazon.ie](${p.link})`
        )
        .join("\n\n")
    : "";

  const prompt = `
Write a friendly blog post for "SmartFinds4You", an Amazon affiliate site.
Topic: "Top Smart Gadgets and Useful Amazon Finds".
Include 3–5 smart, trending or fun gadgets (use realistic product names if PA-API data is unavailable).
Each item must include a working Amazon.ie link using this model:
https://www.amazon.ie/s?k=[keyword]&tag=smartfinds403-21&linkCode=ll1&language=en_IE&ref_=as_li_ss_tl
Keep it under 400 words, use emojis and Markdown formatting.
${products.length ? `Include these real products:\n${productDescriptions}` : ""}
`;

  const completion = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: prompt }],
  });

  const markdown = completion.choices[0].message.content;

  const title = markdown.match(/^#\s*(.*)/m)?.[1] || "SmartFinds Daily Picks";
  const description =
    markdown.replace(/[#*_>\[\]()]/g, "").split("\n").slice(1, 3).join(" ").slice(0, 150) + "...";

  const html = marked(markdown).replace(
    /<a href="([^"]+amazon[^"]+)">([^<]+)<\/a>/g,
    (_m, url, text) => `<a href="${buildSearchUrl(text)}" target="_blank" class="buy-btn">🛒 Buy on Amazon.ie</a>`
  );

  const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>${title} | SmartFinds4You</title>
<meta name="description" content="${description}" />
<link rel="stylesheet" href="../../styles.css" />
<style>
body {
  font-family:'Inter',sans-serif;background:#0d3b66;color:#f9fafb;padding:2rem;line-height:1.7;max-width:900px;margin:auto;
}
h1,h2,h3{color:#f9fafb;}
.buy-btn{display:inline-block;background:#f9fafb;color:#0d3b66;padding:0.7rem 1.4rem;border-radius:10px;text-decoration:none;font-weight:600;}
.buy-btn:hover{background:#f28c28;color:#fff;}
.back{color:#f28c28;text-decoration:none;display:inline-block;margin-bottom:1rem;}
.back:hover{text-decoration:underline;}
</style>
</head>
<body>
<a href="../index.html" class="back">← Back to Blog</a>
${html}
<footer style="margin-top:2rem;text-align:center;color:#f9fafb80;">© ${new Date().getFullYear()} SmartFinds4You</footer>
</body>
</html>`;

  fs.writeFileSync(path.join(postsDir, mdFileName), markdown);
  fs.writeFileSync(path.join(postsDir, htmlFileName), htmlContent);

  console.log("✅ Blog post generated successfully:", htmlFileName);
}

generatePost().catch((err) => {
  console.error("❌ Error:", err);
  process.exit(1);
});
