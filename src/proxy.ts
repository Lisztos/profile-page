import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { resolveRequest } from "@/lib/negotiate";

function isInternalNavigation(request: NextRequest): boolean {
  const accept = request.headers.get("accept") ?? "";
  return (
    request.headers.has("rsc") ||
    request.headers.has("next-router-prefetch") ||
    request.headers.has("next-router-segment-prefetch") ||
    accept.toLowerCase().includes("text/x-component")
  );
}

export function proxy(request: NextRequest) {
  if (request.method !== "GET" && request.method !== "HEAD") return NextResponse.next();

  const decision = resolveRequest({
    pathname: request.nextUrl.pathname,
    accept: request.headers.get("accept"),
    internal: isInternalNavigation(request),
  });

  if (decision.kind === "passthrough") {
    const response = NextResponse.next();
    response.headers.append("Vary", "Accept");
    response.headers.append("Link", decision.link);
    return response;
  }

  return new NextResponse(request.method === "HEAD" ? null : decision.body, {
    status: decision.status,
    headers: {
      "Content-Type": decision.contentType,
      Vary: decision.vary,
      Link: decision.link,
      "Cache-Control": "public, max-age=300",
      "X-Content-Type-Options": "nosniff",
    },
  });
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|images/).*)"],
};
