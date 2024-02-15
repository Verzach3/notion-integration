export default function getIdFromSlug(slug: string, posts: any[]) {
  return posts.find((postSlug: any) => postSlug.slug === slug)?.id ?? "";
}
