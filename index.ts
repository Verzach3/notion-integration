// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.
import { Client } from "https://cdn.skypack.dev/@notionhq/client";
import { createClient } from "https://cdn.skypack.dev/@supabase/supabase-js";
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
  const { link } = await req.json();
  const md = await getMdStringFromId(getNotionPageId(link), n2m);
  return new Response(JSON.stringify({link: link, content: md}),  {
    headers: { "Content-Type": "application/json" },
  });
});

/* To invoke locally:

  1. Run `supabase start` (see: https://supabase.com/docs/reference/cli/supabase-start)
  2. Make an HTTP request:

  curl -i --location --request POST 'http://127.0.0.1:54321/functions/v1/notion-to-md' \
    --header 'Authorization: Bearer ' \
    --header 'Content-Type: application/json' \
    --data '{"name":"Functions"}'

*/
