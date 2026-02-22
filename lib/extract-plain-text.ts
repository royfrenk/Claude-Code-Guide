/**
 * Strips markdown syntax from a raw markdown string,
 * returning plain text suitable for text-to-speech.
 */
export function extractPlainText(markdown: string): string {
  return (
    markdown
      // Apply same preprocessor transforms as MarkdownRenderer
      .replace(/^## Chapter \d+: /gm, "## ")
      .replace(/^# Working With AI Agents.*$/m, "")
      // Strip images entirely (alt text reads oddly mid-paragraph)
      .replace(/!\[.*?\]\(.*?\)/g, "")
      // Strip links but keep link text
      .replace(/\[(.+?)\]\(.*?\)/g, "$1")
      // Strip code blocks entirely (not useful to read aloud)
      .replace(/```[\s\S]*?```/g, "")
      // Strip inline code backticks
      .replace(/`(.+?)`/g, "$1")
      // Strip heading markers
      .replace(/^#{1,6}\s+/gm, "")
      // Strip bold/italic markers
      .replace(/\*\*(.+?)\*\*/g, "$1")
      .replace(/\*(.+?)\*/g, "$1")
      .replace(/__(.+?)__/g, "$1")
      .replace(/_(.+?)_/g, "$1")
      // Strip blockquote markers
      .replace(/^>\s*/gm, "")
      // Strip horizontal rules
      .replace(/^---+$/gm, "")
      // Strip HTML tags (rehype-raw content)
      .replace(/<[^>]+>/g, "")
      // Strip table formatting
      .replace(/\|/g, "")
      .replace(/^[-:]+$/gm, "")
      // Collapse multiple blank lines
      .replace(/\n{3,}/g, "\n\n")
      .trim()
  );
}
