export type DocumentType = "text/markdown" | "text/html";

interface AcceptEntry {
  type: string;
  subtype: string;
  q: number;
  index: number;
}

const PRODUCED: DocumentType[] = ["text/markdown", "text/html"];

/** Parse an Accept header into type, subtype, and q. Parameter names are case-insensitive. */
export function parseAccept(header: string | null): AcceptEntry[] {
  if (!header?.trim()) return [];

  return header.split(",").map((part, index) => {
    const segments = part
      .split(";")
      .map((segment) => segment.trim())
      .filter(Boolean);
    const media = (segments[0] || "*/*").toLowerCase();
    const slash = media.indexOf("/");
    const type = slash === -1 ? media : media.slice(0, slash);
    const subtype = slash === -1 ? "*" : media.slice(slash + 1);
    let q = 1;

    for (const param of segments.slice(1)) {
      const eq = param.indexOf("=");
      if (eq === -1) continue;
      const key = param.slice(0, eq).trim().toLowerCase();
      const value = param
        .slice(eq + 1)
        .trim()
        .replace(/^"|"$/g, "");
      if (key !== "q") continue;
      const parsed = Number(value);
      if (!Number.isNaN(parsed)) q = Math.min(1, Math.max(0, parsed));
    }

    return { type, subtype, q, index };
  });
}

function bestMatch(produced: DocumentType, entries: AcceptEntry[]) {
  const [producedType, producedSubtype] = produced.split("/");
  let best: { q: number; specificity: number; index: number } | null = null;

  for (const entry of entries) {
    let specificity = 0;
    if (entry.type === producedType && entry.subtype === producedSubtype) specificity = 3;
    else if (
      (entry.type === producedType && entry.subtype === "*") ||
      (entry.type === "*" && entry.subtype === producedSubtype)
    ) {
      specificity = 2;
    } else if (entry.type === "*" && entry.subtype === "*") specificity = 1;
    else continue;

    if (
      !best ||
      specificity > best.specificity ||
      (specificity === best.specificity && entry.index < best.index)
    ) {
      best = { q: entry.q, specificity, index: entry.index };
    }
  }

  if (!best || best.q <= 0) return null;
  return best;
}

/**
 * Pick the document type to serve.
 * A missing Accept header, `* /*`, and any tie where Markdown is not strictly
 * preferred all stay on HTML. `q=0` rejects that type.
 */
export function preferredDocumentType(accept: string | null): DocumentType {
  const entries = parseAccept(accept);
  if (entries.length === 0) return "text/html";

  const ranked = PRODUCED.flatMap((type) => {
    const score = bestMatch(type, entries);
    return score ? [{ type, score }] : [];
  });
  if (ranked.length === 0) return "text/html";

  ranked.sort((a, b) => {
    if (b.score.q !== a.score.q) return b.score.q - a.score.q;
    if (b.score.specificity !== a.score.specificity) {
      return b.score.specificity - a.score.specificity;
    }
    if (a.score.index !== b.score.index) return a.score.index - b.score.index;
    if (a.type === "text/html") return -1;
    if (b.type === "text/html") return 1;
    return 0;
  });

  return ranked[0].type;
}

export function prefersMarkdown(accept: string | null): boolean {
  return preferredDocumentType(accept) === "text/markdown";
}
