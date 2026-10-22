import { prefersMarkdown } from "@/lib/accept";
import {
  markdownAlternate,
  notFoundMarkdown,
  pageMarkdown,
  pathFromMarkdown,
} from "@/lib/agent-content";

export const MARKDOWN_CONTENT_TYPE = "text/markdown; charset=utf-8";
export const VARY_ACCEPT = "Accept";

const MACHINE_PATHS = new Set(["/robots.txt", "/sitemap.xml", "/llms.txt", "/opengraph-image"]);

const ASSET_EXTENSION = /\.(?:png|jpe?g|gif|webp|svg|ico|pdf|woff2?|webmanifest|map)$/i;

export type Negotiation =
  | { kind: "passthrough"; link: string }
  | {
      kind: "document";
      status: 200 | 404;
      body: string;
      contentType: string;
      vary: string;
      link: string;
    };

export function resolveRequest(input: {
  pathname: string;
  accept: string | null;
  internal: boolean;
}): Negotiation {
  const pathname = normalizePath(input.pathname);
  const link = linkHeader(pathname);

  if (input.internal || isMachinePath(pathname) || isAssetPath(pathname)) {
    return { kind: "passthrough", link };
  }

  const explicitPage = pathFromMarkdown(pathname);
  if (pathname.endsWith(".md")) {
    if (!explicitPage) return markdownResponse(404, notFoundMarkdown(pathname), linkHeader("/"));
    const body = pageMarkdown(explicitPage);
    if (!body) return markdownResponse(404, notFoundMarkdown(pathname), linkHeader("/"));
    return markdownResponse(200, body, linkHeader(explicitPage));
  }

  if (!prefersMarkdown(input.accept)) return { kind: "passthrough", link };

  const body = pageMarkdown(pathname);
  if (!body) return markdownResponse(404, notFoundMarkdown(pathname), linkHeader("/"));
  return markdownResponse(200, body, link);
}

function markdownResponse(status: 200 | 404, body: string, link: string): Negotiation {
  return {
    kind: "document",
    status,
    body,
    contentType: MARKDOWN_CONTENT_TYPE,
    vary: VARY_ACCEPT,
    link,
  };
}

function normalizePath(pathname: string): string {
  let path = pathname || "/";
  try {
    path = decodeURIComponent(path);
  } catch {
    path = pathname || "/";
  }
  if (!path.startsWith("/")) path = `/${path}`;
  if (path.length > 1 && path.endsWith("/")) path = path.slice(0, -1);
  return path;
}

function isMachinePath(pathname: string): boolean {
  return MACHINE_PATHS.has(pathname) || pathname.startsWith("/opengraph-image");
}

function isAssetPath(pathname: string): boolean {
  if (pathname.endsWith(".md")) return false;
  return ASSET_EXTENSION.test(pathname) || pathname.startsWith("/_next/") || pathname.startsWith("/images/");
}

export function linkHeader(pathname: string): string {
  const alternate = markdownAlternate(pathname);
  const parts = [
    `</llms.txt>; rel="describedby"`,
    `</sitemap.xml>; rel="sitemap"`,
  ];
  if (alternate) parts.unshift(`<${alternate}>; rel="alternate"; type="text/markdown"`);
  return parts.join(", ");
}
