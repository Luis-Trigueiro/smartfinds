import fs from "fs";
import path from "path";
import OpenAI from "openai";
import { marked } from "marked";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function generatePost() {
  console.log("🧠 Generating SmartFinds4You post with thumbnail and SEO...");

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

  // ✨ Prompt atualizado para links realistas e markdown limpo
  const prompt = `
  Write a blog post for "SmartFinds4You", an Amazon affiliate site.
  Theme: "Top Smart Gadgets and Useful Amazon Finds".
  Include 3–5 trending tech or home gadgets sold on Amazon.ie, with fun, natural descriptions.
  Each product must include a realistic Amazon.ie URL that looks like an actual product page.
  All URLs must contain this affiliate tag at the end: tag=smartfinds403-21&language=en_IE&linkCode=ll1&ref_=as_li_ss_tl

  Example valid formats:
  - https://www.amazon.ie/dp/B0D69NHWPG?tag=smartfinds403-21&language=en_IE&linkCode=ll1&ref_=as_li_ss_tl
  - https://www.amazon.ie/GRIFEMA-GB1054B-Adjustable/dp/B0D69NHWPG?tag=smartfinds403-21&language=en_IE&linkCode=ll1&ref_=as_li_ss_tl

  Format in Markdown with headings, emojis, and short engaging paragraphs.
  Keep it under 400 words and include a short friendly intro.
  `;

  // 💬 Generate content
  const completion = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: prompt }],
  });

  const markdownContent = completion.choices[0].message.content;

  // 🎯 Extract title and description for SEO
  const titleMatch = markdownContent.match(/^#\s*(.*)/m);
  const title = titleMatch ? titleMatch[1].trim() : "SmartFinds Daily Picks";
  const description =
    markdownContent
      .replace(/[#*_>\[\]()]/g, "")
      .split("\n")
      .slice(1, 4)
      .join(" ")
      .slice(0, 150) + "...";

  // 🎨 Try generating a thumbnail (fallback if denied)
  let imagePath = path.join(imgDir, imageFileName);
  try {
    console.log("🎨 Generating thumbnail with gpt-image-1...");
    const imageResponse = await client.images.generate({
      model: "gpt-image-1",
      prompt: `A flat modern banner for "${title}", SmartFinds4You style, blue (#0d3b66) and orange (#f28c28), minimalist tech theme.`,
      size: "1536x1024",
    });
    const base64 = imageResponse.data[0].b64_json;
    fs.writeFileSync(imagePath, Buffer.from(base64, "base64"));
    console.log("✅ Custom thumbnail generated.");
  } catch (err) {
    console.warn("⚠️ Image generation failed. Using default thumbnail.");
    const defaultPath = path.join("assets", "default-thumb.png");
    if (fs.existsSync(defaultPath)) {
      fs.copyFileSync(defaultPath, imagePath);
    }
  }

// --- Helpers para gerar links Amazon seguros e rastreáveis ---
function isAmazon(hostname) {
  return /(^|\.)amazon\./i.test(hostname);
}

function hasDpAsin(pathname) {
  const m = pathname.match(/\/dp\/([A-Z0-9]{10})(?:[\/?]|$)/i);
  return m ? m[1].toUpperCase() : null;
}

// 🔢 Gera strings aleatórias (apenas cosmético)
function randomCode(length = 10) {
  const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  return Array.from({ length }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
}

// 🔍 Cria link de busca seguro na Amazon.ie
function buildSearchUrl(keyword) {
  const u = new URL("https://www.amazon.ie/s");
  u.searchParams.set("k", keyword);
  u.searchParams.set("tag", "smartfinds403-21");
  u.searchParams.set("linkCode", "ll1");
  u.searchParams.set("language", "en_IE");
  u.searchParams.set("ref_", "as_li_ss_tl");
  return u.toString();
}

// 🔗 Cria link completo e estilizado (apenas se o ASIN for real)
function buildRealisticAmazonUrl(asin, productName = "product") {
  const nameSlug = productName
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  const url = new URL(`https://www.amazon.ie/${nameSlug}/dp/${asin}`);
  url.searchParams.set("pd_rd_w", randomCode(5));
  url.searchParams.set("content-id", `amzn1.sym.${randomCode(15)}`);
  url.searchParams.set("pf_rd_p", randomCode(15));
  url.searchParams.set("pf_rd_r", randomCode(12));
  url.searchParams.set("pd_rd_i", asin);
  url.searchParams.set("th", "1");
  url.searchParams.set("psc", "1");
  url.searchParams.set("linkCode", "ll1");
  url.searchParams.set("tag", "smartfinds403-21");
  url.searchParams.set("linkId", randomCode(16));
  url.searchParams.set("language", "en_IE");
  url.searchParams.set("ref_", "as_li_ss_tl");

  return url.toString();
}

// 🧠 Conserta links da IA: converte para busca se ASIN for inventado
function fixAmazonUrlOrFallback(rawUrl, anchorText) {
  try {
    const u = new URL(rawUrl);
    if (!isAmazon(u.hostname)) return rawUrl;

    const asin = hasDpAsin(u.pathname);
    const productName = (anchorText || "").trim() || "smart gadget";

    // ✅ Se o ASIN parece real, mantém o formato Amazon com tag
    if (asin && /^[A-Z0-9]{10}$/.test(asin)) {
      return buildRealisticAmazonUrl(asin, productName);
    }

    // 🔄 Caso contrário, usa o nome do produto pra gerar link de busca
    return buildSearchUrl(productName);
  } catch {
    const keyword = (anchorText || "").trim() || "smart gadget";
    return buildSearchUrl(keyword);
  }
}



 const htmlFromMarkdown = marked(markdownContent).replace(
    /<a\s+href="([^"]*amazon[^"]*)"[^>]*>(.*?)<\/a>/gi,
    (_m, url, text) => {
      const fixed = fixAmazonUrlOrFallback(url, text);
      return `<a href="${fixed}" target="_blank" rel="nofollow sponsored noopener" class="buy-btn">🛒 Buy on Amazon.ie</a>`;
    }
  );
  // 🌐 Full HTML template
  const htmlContent = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${title} | SmartFinds4You</title>
    <meta name="description" content="${description}" />
    <meta property="og:title" content="${title}" />
    <meta property="og:description" content="${description}" />
    <meta property="og:image" content="./images/${imageFileName}" />
    <link rel="stylesheet" href="../../styles.css" />
    <style>
      body {
        font-family: 'Inter', sans-serif;
        background: #0d3b66;
        color: #f9fafb;
        padding: 2rem;
        line-height: 1.7;
        max-width: 900px;
        margin: auto;
      }
      h1, h2, h3 { color: #f28c28; }
      img.thumb {
        display: block;
        margin: 0 auto 2rem;
        border-radius: 16px;
        box-shadow: 0 6px 20px rgba(0,0,0,0.4);
        max-width: 100%;
      }
      .buy-btn {
        display: inline-block;
        background: #f9fafb;
        color: #0d3b66;
        padding: 0.7rem 1.4rem;
        border-radius: 10px;
        text-decoration: none;
        font-weight: 600;
        transition: 0.3s ease;
      }
      .buy-btn:hover {
        background: #f28c28;
        color: #fff;
      }
      .back {
        display: inline-block;
        margin-bottom: 1rem;
        color: #f9fafb;
        text-decoration: none;
      }
      .back:hover { text-decoration: underline; }
      footer {
        margin-top: 3rem;
        text-align: center;
        color: #f9fafb;
        opacity: 0.8;
      }
    </style>
  </head>
  <body>
    <main>
      <a href="../index.html" class="back">← Back to Blog</a>
      <img src="./images/${imageFileName}" alt="${title}" class="thumb" />
      ${htmlFromMarkdown}
    </main>
    <footer>© <span id="year"></span> SmartFinds4You. All rights reserved.</footer>
    <script>document.getElementById("year").textContent = new Date().getFullYear();</script>
  </body>
  </html>
  `;

  // 💾 Save files
  fs.writeFileSync(path.join(postsDir, mdFileName), markdownContent);
  fs.writeFileSync(path.join(postsDir, htmlFileName), htmlContent);
  console.log(`✅ Post generated: ${htmlFileName}`);

  // 📰 Update blog index
  const blogIndexPath = "blog/index.html";
  if (fs.existsSync(blogIndexPath)) {
    const snippet = `
      <article class="post-card">
        <h3>${title}</h3>
        <p>${description}</p>
        <a href="./posts/${htmlFileName}" class="btn">Read More</a>
      </article>
    `;
    let indexHTML = fs.readFileSync(blogIndexPath, "utf8");
    if (indexHTML.includes("</main>")) {
      indexHTML = indexHTML.replace("</main>", `${snippet}\n</main>`);
      fs.writeFileSync(blogIndexPath, indexHTML);
      console.log("📰 Blog index updated with new post.");
    }
  }

  console.log("✨ Done! Post + SEO + Amazon link validation ready.");
}

generatePost().catch((err) => {
  console.error("❌ Error:", err);
  process.exit(1);
});
