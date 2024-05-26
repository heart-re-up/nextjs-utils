export default function extractTextFromHTML(html: string): string {
  return html
    .replaceAll(/<[^>]*>?/g, "")
    .trim()
    .replace(/&nbsp/g, "")
    .replace(/\s+/g, "");
}
