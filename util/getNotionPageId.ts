export default function getNotionPageId(link: string): string {
  return link.split("-").slice(-1)[0];
}
