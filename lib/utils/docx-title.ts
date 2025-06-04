export function extractTitleFromDoc(content: object): string | null {
  try {
    if (
      content &&
      typeof content === "object" &&
      (content as any).type === "doc" &&
      Array.isArray((content as any).content)
    ) {
      const parsed = content as any;

      const heading = parsed.content.find(
        (item: any) => item.type === "heading" && item.attrs?.level === 1
      );

      if (
        heading &&
        Array.isArray(heading.content) &&
        heading.content[0]?.type === "text"
      ) {
        return heading.content[0].text;
      }
    }
  } catch (err) {
    console.error("Failed to extract title from doc content", err);
  }
  return null;
}
