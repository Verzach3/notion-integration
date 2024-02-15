import type { NotionToMarkdown } from "notion-to-md";

export async function getMdStringFromId(id: string, n2m: InstanceType<typeof NotionToMarkdown>) {
  return n2m.toMarkdownString(
    await n2m.pageToMarkdown(id)
  ).parent;
}
