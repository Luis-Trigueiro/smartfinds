import fs from "fs";
import path from "path";
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const today = new Date();
const dateStr = today.toISOString().split("T")[0];
const titleSlug = "smart-gadgets-daily-picks";
const fileName = `${dateStr}-${titleSlug}.md`;

const dir = path.join("blog", "posts");
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

async function generatePost() {
  const prompt = `
  Write a blog post for a site called SmartFinds4You, in markdown format.
  Theme: "Smart Gadgets and Useful Amazon Finds".
  Include 3–5 products with short, fun descriptions and affiliate links.
  Keep it under 400 words.
  Use sections and emojis.
  Example link: https://www.amazon.co.uk/dp/B0C6P6C8F6/?tag=smartfinds4you-21
  `;

  const completion = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: prompt }],
  });

  const content = completion.choices[0].message.content;
  const filePath = path.join(dir, fileName);
  fs.writeFileSync(filePath, content);
  console.log(`✅ Blog post generated: ${filePath}`);
}

generatePost();
