import { BlogPost } from "../types/BlogPost.ts";

export function notionBlogToCaprover(blog: any, content: string): BlogPost {
  return {
    notion_id: blog["ID"].unique_id.number,
    title: blog["Blog Name"].title[0].plain_text,
    slug: blog["Slug"].rich_text[0].plain_text,
    coverImage: blog["Cover Image"],
    tags: blog["Tags"].multi_select.map((tag: { name: string }) => tag.name),
    content: content,
    in_carousel: blog["In Carousel"].checkbox,
    published: blog["Published"].checkbox,
  };
}