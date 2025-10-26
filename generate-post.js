import fs from "fs";
import path from "path";
import OpenAI from "openai";
import { marked } from "marked";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function generatePost() {
  console.log("🧠 Generating SmartFinds4You blog post with real Amazon.ie links...");

  const today = new Date();
  const dateStr = today.toISOString().split("T")[0];
  const titleSlug = "smart-gadgets-daily-picks";
  const mdFileName = `${dateStr}-${titleSlug}.md`;
  const htmlFileName = `${dateStr}-${titleSlug}.html`;

  const postsDir = path.join("blog", "posts");
  if (!fs.existsSync(postsDir)) fs.mkdirSync(postsDir, { recursive: true });

  // 🧠 Novo prompt para gerar conteúdo com produtos reais
  const prompt = `
  You are writing a blog post for a site called "SmartFinds4You".
  Your goal: create a markdown article titled **"Smart Gadgets Worth Checking Out Today"**.

  ✅ Requirements:
  - Include 3–5 **real** tech or gadget products that exist on **Amazon.ie**.
  - Each product must have a short fun description (2–3 sentences max).
  - Include emojis, section headers, and markdown formatting.
  - Use your own engaging style ("these are worth it", "perfect for gifting", etc.).
  - Include an affiliate link in each product like this example:
    https://www.amazon.ie/dp/<ASIN>?tag=smartfinds403-21&language=en_IE&linkCode=ll1&ref_=as_li_ss_tl
  - Replace <ASIN> with real product IDs from Amazon.ie that match your description.
  - Keep the total under 400 words.

  Write only markdown. No HTML.
  `;

  const completion = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: prompt }],
  });

  const markdownContent = completion.choices[0].message.content;

  // --- Salvar o Markdown ---
  const mdPath = path.join(postsDir, mdFileName);
  fs.writeFileSync(mdPath, markdownContent);
  console.log(`✅ Markdown saved: ${mdPath}`);

  // --- Converter Markdown em HTML ---
  const htmlContent = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>SmartFinds4You — ${dateStr}</title>
    <link rel="stylesheet" href="../../styles.css" />
    <style>
      body { font-family: 'Poppins', sans-serif; padding: 2rem; background:#f9fafb; color:#0d3b66; line-height:1.6; }
      h1, h2, h3 { color:#f28c28; }
      a { color:#0d3b66; font-weight:600; text-decoration:none; }
      a:hover { text-decoration:underline; }
      .back { display:inline-block; margin-bottom:1rem; color:#f28c28; }
    </style>
  </head>
  <body>
    <a href="../index.html" class="back">← Back to Blog</a>
    ${marked(markdownContent)}
  </body>
  </html>
  `;

  const htmlPath = path.join(postsDir, htmlFileName);
  fs.writeFileSync(htmlPath, htmlContent);
  console.log(`✅ HTML post saved: ${htmlPath}`);

  // --- Atualizar o blog/index.html ---
  const blogIndexPath = "blog/index.html";
  if (fs.existsSync(blogIndexPath)) {
    const titleMatch = markdownContent.match(/^#\s*(.*)/m);
    const title = titleMatch ? titleMatch[1] : "SmartFinds Daily Picks";
    const summary = markdownContent.split("\n").slice(1, 5).join(" ").slice(0, 180) + "...";

    const snippet = `
    <article class="post-card">
      <h3>${title}</h3>
      <p>${summary}</p>
      <a href="./posts/${htmlFileName}" class="btn">Read more</a>
    </article>
    `;

    let indexHTML = fs.readFileSync(blogIndexPath, "utf8");
    if (indexHTML.includes("</main>")) {
      indexHTML = indexHTML.replace("</main>", `${snippet}\n</main>`);
      fs.writeFileSync(blogIndexPath, indexHTML);
      console.log("📰 Blog index updated with new post snippet.");
    }
  }

  console.log("✨ Done! Post with Amazon.ie affiliate links created successfully.");
}

generatePost().catch((err) => {
  console.error("❌ Error generating post:", err);
  process.exit(1);
});
