import { Client } from "https://cdn.skypack.dev/@notionhq/client";
import { NotionToMarkdown } from "https://cdn.skypack.dev/notion-to-md";
import getNotionPageId from "./util/getNotionPageId.ts";
import { getMdStringFromId } from "./util/getMDStringFromId.ts";

const notion = new Client({
  auth: Deno.env.get("NOTION_TOKEN"),
});
const n2m = new NotionToMarkdown({
  notionClient: notion,
});
Deno.serve(async (req) => {
  let parsedReq
  try {
    parsedReq = await req.json();
  } catch (_error) {
    return new Response(JSON.stringify({error: "Invalid JSON"}),  {
      headers: { "Content-Type": "application/json" },
    });
  }
  if (!parsedReq.link) {
    return new Response(JSON.stringify({error: "Invalid JSON"}),  {
      headers: { "Content-Type": "application/json" },
    });
  }
  const { link } = parsedReq;
  const md = await getMdStringFromId(getNotionPageId(link), n2m);
  return new Response(JSON.stringify({link: link, content: md}),  {
    headers: { "Content-Type": "application/json" },
  });
});
