"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypeSlug from "rehype-slug";
import { useState, useRef, type ComponentPropsWithoutRef } from "react";
import { Copy, Check } from "lucide-react";
interface MarkdownRendererProps {
  content: string;
}

function CodeBlock({ children, className }: { children: string; className?: string }) {
  const [copied, setCopied] = useState(false);
  const language = className?.replace("language-", "") || "";

  const handleCopy = () => {
    navigator.clipboard.writeText(children.trim());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="group relative my-6 rounded-lg border border-border bg-[#f8f9fa] overflow-hidden">
      {language && (
        <div className="flex items-center justify-between border-b border-border bg-muted px-4 py-1.5">
          <span className="text-xs font-mono text-muted-foreground">{language}</span>
        </div>
      )}
      <div className="relative">
        <pre className="overflow-x-auto p-4 text-sm leading-relaxed font-mono">
          <code>{children}</code>
        </pre>
        <button
          onClick={handleCopy}
          className="absolute top-2 right-2 rounded-md border border-border bg-background p-1.5 text-muted-foreground opacity-0 transition-opacity hover:text-foreground group-hover:opacity-100"
          aria-label="Copy code"
        >
          {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
        </button>
      </div>
    </div>
  );
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  // Preprocess: fix image paths, clean headings
  const processedContent = content
    .replace(/\(diagrams\//g, "(/diagrams/")
    .replace(/^## Chapter \d+: /gm, "## ")
    .replace(/^# Working With AI Agents.*$/m, "");

  // Identify blockquote positions relative to "Practical tips" heading
  // Count blockquotes before and after the practical tips section
  const practicalTipsMatch = processedContent.match(/^### Practical tips/m);
  const practicalTipsOffset = practicalTipsMatch
    ? processedContent.indexOf(practicalTipsMatch[0])
    : -1;

  // Count blockquotes before practical tips to know which index they start at
  let blockquotesBeforeTips = 0;
  if (practicalTipsOffset > 0) {
    const beforeContent = processedContent.slice(0, practicalTipsOffset);
    // Count contiguous blockquote groups (not individual > lines)
    const lines = beforeContent.split("\n");
    let inBlockquote = false;
    for (const line of lines) {
      if (line.startsWith(">")) {
        if (!inBlockquote) {
          blockquotesBeforeTips++;
          inBlockquote = true;
        }
      } else if (line.trim() === "") {
        inBlockquote = false;
      } else {
        inBlockquote = false;
      }
    }
  }

  // Track blockquote index to determine styling
  const blockquoteIndexRef = useRef(0);
  blockquoteIndexRef.current = 0;

  return (
    <div className="prose-guide">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw, rehypeSlug]}
        components={{
          h1: ({ children }) => (
            <h1 className="text-3xl font-bold text-foreground mb-6 leading-tight text-balance">
              {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2 className="text-[28px] font-bold text-foreground mt-12 mb-6 leading-tight text-balance">
              {children}
            </h2>
          ),
          h3: ({ children, id }) => (
            <h3
              id={id}
              className="text-xl font-semibold text-foreground mt-10 mb-4 leading-snug scroll-mt-20"
            >
              {children}
            </h3>
          ),
          h4: ({ children }) => (
            <h4 className="text-lg font-semibold text-foreground mt-8 mb-3 leading-snug">
              {children}
            </h4>
          ),
          p: ({ children, node }) => {
            // Check if this paragraph contains an image (don't wrap in <p>)
            const hasImage = node?.children?.some(
              (child: any) => child.tagName === "img"
            );
            if (hasImage) {
              return <>{children}</>;
            }
            return (
              <p className="text-[17px] leading-[1.75] text-foreground mb-5">
                {children}
              </p>
            );
          },
          a: ({ href, children }) => (
            <a
              href={href}
              className="text-accent underline underline-offset-2 decoration-accent/30 hover:decoration-accent transition-colors"
              target={href?.startsWith("http") ? "_blank" : undefined}
              rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
            >
              {children}
            </a>
          ),
          blockquote: ({ children }) => {
            const index = blockquoteIndexRef.current++;
            const text = getTextContent(children);
            const isTldr = text.startsWith("TL;DR:");

            // Check if we're in practical tips section
            const isPracticalTip =
              practicalTipsOffset > 0 &&
              !isTldr &&
              index >= blockquotesBeforeTips;

            if (isTldr) {
              return (
                <blockquote className="my-8 rounded-md border-l-4 border-accent bg-accent-muted px-6 py-5 text-[17px] leading-[1.75] [&>p]:mb-0 [&>p]:text-foreground">
                  {children}
                </blockquote>
              );
            }

            if (isPracticalTip) {
              return (
                <blockquote className="my-5 rounded-md border-l-4 border-green bg-green-muted px-6 py-5 text-[17px] leading-[1.7] [&>p]:mb-0 [&>p]:text-foreground">
                  {children}
                </blockquote>
              );
            }

            // Default: blue style
            return (
              <blockquote className="my-6 rounded-md border-l-4 border-accent bg-accent-muted px-6 py-5 text-[17px] leading-[1.7] [&>p]:mb-0 [&>p]:text-foreground">
                {children}
              </blockquote>
            );
          },
          ul: ({ children }) => (
            <ul className="my-4 space-y-2 pl-6 text-[17px] leading-[1.75] list-disc marker:text-muted-foreground">
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className="my-4 space-y-2 pl-6 text-[17px] leading-[1.75] list-decimal marker:text-muted-foreground">
              {children}
            </ol>
          ),
          li: ({ children }) => <li className="text-foreground">{children}</li>,
          strong: ({ children }) => (
            <strong className="font-semibold text-foreground">{children}</strong>
          ),
          em: ({ children }) => <em className="italic">{children}</em>,
          hr: () => <hr className="my-10 border-t border-border" />,
          table: ({ children }) => (
            <div className="my-6 overflow-x-auto rounded-lg border border-border">
              <table className="w-full text-sm">{children}</table>
            </div>
          ),
          thead: ({ children }) => (
            <thead className="bg-[#f9fafb] text-left">{children}</thead>
          ),
          th: ({ children }) => (
            <th className="border-b border-border px-4 py-3 font-semibold text-foreground text-sm">
              {children}
            </th>
          ),
          tbody: ({ children }) => <tbody>{children}</tbody>,
          tr: ({ children }) => (
            <tr className="border-b border-border last:border-0 even:bg-[#f9fafb] hover:bg-muted transition-colors">
              {children}
            </tr>
          ),
          td: ({ children }) => (
            <td className="px-4 py-3 text-foreground text-sm">{children}</td>
          ),
          code: ({ children, className, ...props }: ComponentPropsWithoutRef<"code"> & { className?: string }) => {
            const isBlock = className?.startsWith("language-");
            if (isBlock) {
              return (
                <CodeBlock className={className}>
                  {String(children).replace(/\n$/, "")}
                </CodeBlock>
              );
            }
            return (
              <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono text-foreground">
                {children}
              </code>
            );
          },
          pre: ({ children }) => {
            // The code component handles the wrapping
            return <>{children}</>;
          },
          img: ({ src, alt }) => {
            if (!src) return null;
            const isJpg =
              src.endsWith(".jpg") ||
              src.endsWith(".jpeg") ||
              src.endsWith(".png");

            return (
              <figure className="my-8">
                <div className="overflow-hidden rounded-md border border-border">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={src}
                    alt={alt || ""}
                    className="w-full h-auto"
                    loading="lazy"
                  />
                </div>
                {alt && isJpg && (
                  <figcaption className="mt-3 text-center text-sm text-muted-foreground italic">
                    {alt}
                  </figcaption>
                )}
              </figure>
            );
          },
        }}
      >
        {processedContent}
      </ReactMarkdown>
    </div>
  );
}

function getTextContent(children: React.ReactNode): string {
  if (typeof children === "string") return children;
  if (Array.isArray(children)) return children.map(getTextContent).join("");
  if (children && typeof children === "object" && "props" in children) {
    return getTextContent((children as any).props.children);
  }
  return "";
}
