const LINK = /\[([^\]]+)\]\((https?:\/\/[^)\s]+|mailto:[^)\s]+|\/[^)\s]+)\)/g;

export function RichText({ text }: { text: string }) {
  const nodes: React.ReactNode[] = [];
  let last = 0;
  let key = 0;

  for (const match of text.matchAll(LINK)) {
    const index = match.index ?? 0;
    if (index > last) nodes.push(text.slice(last, index));
    const href = match[2];
    const external = href.startsWith("http");
    nodes.push(
      <a
        key={key}
        className="sweep"
        href={href}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {match[1]}
      </a>,
    );
    key += 1;
    last = index + match[0].length;
  }

  if (last < text.length) nodes.push(text.slice(last));
  return <>{nodes}</>;
}
