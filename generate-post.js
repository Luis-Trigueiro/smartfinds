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

  // 🎯 Prompt atualizado para gerar conteúdo com links válidos
 const prompt = `
Write a blog post for "SmartFinds4You", an Amazon affiliate site.
Theme: "Top Smart Gadgets and Useful Amazon Finds".
Include 3–5 real products available on Amazon.ie with short, engaging descriptions.
Each product must include a valid affiliate link strictly in this format:
https://www.amazon.ie/[product-name]/dp/[ASIN]?crid=XXXX&dib=YYYY&dib_tag=se&keywords=[keyword]&qid=XXXXXX&sprefix=[keyword]%2Caps%2C57&sr=8-1&linkCode=ll1&tag=smartfinds403-21&linkId=[random-string]&language=en_IE&ref_=as_li_ss_tl

Make sure each product link follows that format and uses realistic-looking parameters.
Format everything in Markdown with sections, emojis, and bullet points.
Keep it under 400 words and start with a fun, friendly intro.
`;


  const completion = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: prompt }],
  });

  const markdownContent = completion.choices[0].message.content;

  // Extrair título para SEO
  const titleMatch = markdownContent.match(/^#\s*(.*)/m);
  const title = titleMatch ? titleMatch[1].trim() : "SmartFinds Daily Picks";
  const description = markdownContent
    .replace(/[#*_>\[\]()]/g, "")
    .split("\n")
    .slice(1, 4)
    .join(" ")
    .slice(0, 150) + "...";

  // 🧠 Gerar imagem de capa (thumbnail)
  console.log("🎨 Generating thumbnail image...");
  const imagePrompt = `A minimal and modern banner image for a blog post titled "${title}", using brand colors #0d3b66 (blue) and #f28c28 (orange), flat design style, white background, tech/gadgets theme, clean typography.`;
  const imageResponse = await client.images.generate({
    model: "gpt-image-1",
    prompt: imagePrompt,
    size: "1024x1536",
  });

  const imageBase64 = imageResponse.data[0].b64_json;
  fs.writeFileSync(
    path.join(imgDir, imageFileName),
    Buffer.from(imageBase64, "base64")
  );
  console.log("✅ Thumbnail saved:", imageFileName);

  // 🧱 Adicionar botão estilizado nos links de compra
  const htmlFromMarkdown = marked(markdownContent).replace(
    /<a href="([^"]+amazon[^"]+)">([^<]+)<\/a>/g,
    `<a href="$1" target="_blank" class="buy-btn">🛒 Buy on Amazon.ie</a>`
  );

  // 🌐 Criar HTML completo com SEO e thumbnail
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
  line-height: 1.8;
  margin: 0;
}

main {
  max-width: 900px;
  margin: 0 auto;
  background: #112a4a;
  border-radius: 16px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.5);
  padding: 2.5rem;
}

h1, h2, h3 {
  color: #e4e9f0;
  margin-top: 1.8rem;
}

p {
  color: #e4e9f0;
}

img.thumb {
  display: block;
  margin: 0 auto 2rem;
  border-radius: 16px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.4);
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
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.3);
}

.buy-btn:hover {
  background: #f9fafb;
  color: #0d3b66;
  transform: translateY(-2px);
}

.back {
  display: inline-block;
  margin-bottom: 1.5rem;
  color: #f9fafb;
  text-decoration: none;
  font-weight: 600;
}

.back:hover {
  text-decoration: underline;
}

a {
  color: #f9fafb;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}

footer {
  text-align: center;
  margin-top: 3rem;
  color: #9ca3af;
  font-size: 0.9rem;
}

</style>

  </head>
  <body>
  <a href="../index.html" class="back">← Back to Blog</a>
  <main>
    <img src="./images/${imageFileName}" alt="${title}" class="thumb" />
    ${htmlFromMarkdown}
  </main>
  <footer>© ${new Date().getFullYear()} SmartFinds4You</footer>
</body>
  </html>
  `;

  // Salvar arquivos
  const mdPath = path.join(postsDir, mdFileName);
  fs.writeFileSync(mdPath, markdownContent);
  const htmlPath = path.join(postsDir, htmlFileName);
  fs.writeFileSync(htmlPath, htmlContent);
  console.log(`✅ Post saved: ${htmlFileName}`);

  // 🔄 Atualizar index com snippet
  const blogIndexPath = "blog/index.html";
  if (fs.existsSync(blogIndexPath)) {
    const snippet = `
      <article class="post-card">
        <img src="./posts/images/${imageFileName}" alt="${title}" class="thumb" />
        <h3>${title}</h3>
        <p>${description}</p>
        <a href="./posts/${htmlFileName}" class="buy-btn">Read More</a>
      </article>
    `;
    let indexHTML = fs.readFileSync(blogIndexPath, "utf8");
    if (indexHTML.includes("</body>")) {
      indexHTML = indexHTML.replace("</body>", `${snippet}\n</body>`);
      fs.writeFileSync(blogIndexPath, indexHTML);
      console.log("📰 Blog index updated.");
    }
  }

  console.log("✨ Done! Post + Thumbnail + SEO generated successfully.");
}

generatePost().catch((err) => {
  console.error("❌ Error:", err);
  process.exit(1);
});
