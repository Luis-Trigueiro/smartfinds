import fs from "fs";
import path from "path";

// pasta onde ficam os posts HTML
const postsDir = path.join("blog", "posts");

// caminho do feed
const feedPath = path.join("blog", "feed.xml");

// gera um <item> do RSS
function generateItem({ title, link, description, date }) {
  return `
    <item>
      <title><![CDATA[${title}]]></title>
      <link>${link}</link>
      <guid>${link}</guid>
      <pubDate>${new Date(date).toUTCString()}</pubDate>
      <description><![CDATA[${description}]]></description>
    </item>
  `;
}

// extrai dados de um post HTML
function parsePost(fileName) {
  const filePath = path.join(postsDir, fileName);
  const html = fs.readFileSync(filePath, "utf8");

  // URL pública do post
  const link = `https://www.smartfinds4you.com/blog/posts/${fileName}`;

  const title =
    html.match(/<h1.*?>(.*?)<\/h1>/)?.[1] ||
    html.match(/<title>(.*?)<\/title>/)?.[1] ||
    fileName.replace(".html", "");

  const description =
    html.match(/<p>(.*?)<\/p>/)?.[1] ||
    "Latest post on SmartFinds4You.";

  const stats = fs.statSync(filePath);

  return {
    title,
    link,
    description,
    date: stats.mtime,
  };
}

// pega só os .html (ignora .md e pasta images)
const posts = fs
  .readdirSync(postsDir)
  .filter(
    (file) =>
      file.endsWith(".html") &&
      file !== "index.html" &&
      file !== "images"
  )
  .map((file) => parsePost(file))
  .sort((a, b) => new Date(b.date) - new Date(a.date)); // mais novo primeiro

// monta o RSS inteiro
const feed = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0">
  <channel>
    <title>SmartFinds4You Blog</title>
    <link>https://www.smartfinds4you.com/blog/</link>
    <description>Latest Amazon finds, reviews and product discoveries.</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    ${posts.map(generateItem).join("\n")}
  </channel>
</rss>
`;

fs.writeFileSync(feedPath, feed);
console.log("✅ feed.xml atualizado em blog/feed.xml");
