import fs from "fs";
import path from "path";

// Caminho da pasta do blog
const blogDir = path.join(process.cwd(), "blog");

// Caminho do feed
const feedPath = path.join(blogDir, "feed.xml");

// Função para gerar um item do RSS
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

// Função para extrair dados de um post HTML
function parsePost(fileName) {
  const filePath = path.join(blogDir, fileName);
  const html = fs.readFileSync(filePath, "utf8");

  const url = `https://www.smartfinds4you.com/blog/${fileName}`;

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
    link: url,
    description,
    date: stats.mtime,
  };
}

// Lê todos os arquivos HTML da pasta /blog
const posts = fs
  .readdirSync(blogDir)
  .filter((file) => file.endsWith(".html"))
  .map((file) => parsePost(file));

// Ordena por data (mais recente primeiro)
posts.sort((a, b) => new Date(b.date) - new Date(a.date));

// Gera o feed RSS completo
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

// Salva o feed.xml
fs.writeFileSync(feedPath, feed);

console.log("✅ feed.xml atualizado com sucesso!");
