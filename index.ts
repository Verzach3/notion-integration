import { Client } from "https://cdn.skypack.dev/@notionhq/client";
import { NotionToMarkdown } from "https://cdn.skypack.dev/notion-to-md";
import { Application } from "oak";
import getNotionPageId from "./util/getNotionPageId.ts";
import { getMdStringFromId } from "./util/getMDStringFromId.ts";
import imgParser from "./util/imgParser.ts";

const notion = new Client({
  auth: Deno.env.get("NOTION_TOKEN"),
});
const n2m = new NotionToMarkdown({
  notionClient: notion,
});

const app = new Application();

app.use(async (ctx) => {
  const body = await ctx.request.body.json();
  if (!body.link) {
    ctx.response.body = JSON.stringify({ error: "Invalid JSON" });
    return;
  }
  let md = await getMdStringFromId(getNotionPageId(body.link), n2m);
  md = await imgParser(md); 
  ctx.response.body = { link: body.link, content: md };
  ctx.response.type = "application/json"
  ctx.response.status = 200
})

await app.listen({ port: 8000 });
