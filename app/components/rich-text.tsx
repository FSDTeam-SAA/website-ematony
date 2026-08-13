import sanitizeHtml from "sanitize-html";

const options: sanitizeHtml.IOptions = {
  allowedTags: ["p", "br", "strong", "b", "em", "i", "u", "h1", "h2", "h3", "h4", "h5", "h6", "ul", "ol", "li", "blockquote", "a"],
  allowedAttributes: { a: ["href", "target", "rel"] },
  allowedSchemes: ["http", "https", "mailto", "tel"],
  transformTags: {
    div: "p",
    a: (_tagName, attribs) => ({
      tagName: "a",
      attribs: { ...attribs, target: "_blank", rel: "noopener noreferrer" },
    }),
  },
};

const escapeHtml = (value: string) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

const normalize = (value: string) =>
  /<\/?[a-z][\s\S]*>/i.test(value) ? value : `<p>${escapeHtml(value)}</p>`;

export function RichText({ content, className = "" }: { content: string | string[]; className?: string }) {
  const values = Array.isArray(content) ? content : [content];
  const html = sanitizeHtml(values.filter(Boolean).map(normalize).join(""), options)
    .replace(/<(p|h[1-6])>(?:\s|&nbsp;|<br\s*\/?>)*<\/\1>/gi, "");

  return (
    <div
      className={`rich-text ${className} [&_a]:font-semibold [&_a]:text-[#0f684f] [&_a]:underline [&_a]:underline-offset-2 [&_blockquote]:my-4 [&_blockquote]:border-l-4 [&_blockquote]:border-[#e99a32] [&_blockquote]:pl-4 [&_h1]:my-5 [&_h1]:text-[2em] [&_h1]:font-bold [&_h1]:leading-tight [&_h1]:text-[#063627] [&_h2]:my-4 [&_h2]:text-[1.5em] [&_h2]:font-bold [&_h2]:leading-tight [&_h2]:text-[#063627] [&_h3]:my-3 [&_h3]:text-[1.25em] [&_h3]:font-bold [&_h3]:leading-snug [&_h3]:text-[#063627] [&_h4]:my-3 [&_h4]:text-[1.125em] [&_h4]:font-semibold [&_h4]:leading-snug [&_h4]:text-[#063627] [&_h5]:my-2.5 [&_h5]:text-[1em] [&_h5]:font-semibold [&_h5]:text-[#063627] [&_h6]:my-2.5 [&_h6]:text-[0.875em] [&_h6]:font-semibold [&_h6]:uppercase [&_h6]:tracking-wide [&_h6]:text-[#063627] [&_li]:ml-6 [&_ol]:my-4 [&_ol]:list-decimal [&_p:not(:first-child)]:mt-4 [&_ul]:my-4 [&_ul]:list-disc`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
