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

  // ✨ Prompt atualizado para links reais e markdown limpo
  const prompt = `
  Write a blog post for "SmartFinds4You", an Amazon affiliate site.
  Theme: "Top Smart Gadgets and Useful Amazon Finds".
  Include 3–5 real products from Amazon.ie with fun, natural descriptions.
  Each product must use this link format:
  https://www.amazon.ie/dp/[ASIN]?crid=2LVFUQENY2V65&keywords=[keyword]&linkCode=ll1&tag=smartfinds403-21&linkId=99c260a4e41515f5f1c89b513de24f16&language=en_IE&ref_=as_li_ss_tl
  Format the post in Markdown with emojis and clear titles.
  Keep it under 400 words and include a friendly introduction.
  `;

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

  // 🎨 Attempt to generate thumbnail image (fallback if denied)
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

  // 🧱 Convert Markdown to HTML and style Amazon links
  const htmlFromMarkdown = marked(markdownContent).replace(
    /<a href="([^"]+amazon[^"]+)">([^<]+)<\/a>/g,
    `<a href="$1" target="_blank" class="buy-btn">🛒 Buy on Amazon.ie</a>`
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
      h1, h2, h3 { color: #f9fafb; }
      img.thumb {
        display: block;
        margin: 0 auto 2rem;
        border-radius: 16px;
        box-shadow: 0 6px 20px rgba(0,0,0,0.4);
        max-width: 100%;
      }
      .buy-btn {
        display: inline-block;
        background: #0d3b66;
        color: white;
        padding: 0.7rem 1.4rem;
        border-radius: 10px;
        text-decoration: none;
        font-weight: 600;
        transition: 0.3s ease;
      }
      .buy-btn:hover {
        background: #f9fafb;
        color: #0d3b66;
      }
      .back {
        display: inline-block;
        margin-bottom: 1rem;
        color: #f9fafb;
        text-decoration: none;
      }
      .back:hover { text-decoration: underline; }
      a { color: #f9fafb; text-decoration: none; }
      a:hover { text-decoration: underline; }
    </style>
  </head>
  <body>
    <a href="../index.html" class="back">← Back to Blog</a>
    <img src="./images/${imageFileName}" alt="${title}" class="thumb" />
    ${htmlFromMarkdown}
  </body>
  </html>
  `;

  // 💾 Save files
  fs.writeFileSync(path.join(postsDir, mdFileName), markdownContent);
  fs.writeFileSync(path.join(postsDir, htmlFileName), htmlContent);
  console.log(`✅ Post generated: ${htmlFileName}`);

  // 📰 Add snippet to blog index
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

  console.log("✨ Done! Post + SEO + Fallback Thumbnail ready.");
}

generatePost().catch((err) => {
  console.error("❌ Error:", err);
  process.exit(1);
});
