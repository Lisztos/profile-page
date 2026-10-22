import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { preferredDocumentType } from "../src/lib/accept.ts";
import { docList, homeMarkdown, llmsTxt, notFoundMarkdown, visibleText } from "../src/lib/agent-content.ts";
import { jsonLd } from "../src/lib/jsonld.ts";
import { MARKDOWN_CONTENT_TYPE, VARY_ACCEPT, resolveRequest } from "../src/lib/negotiate.ts";
import { site } from "../src/lib/site.ts";

const CHROME_ACCEPT =
  "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7";

describe("markdown negotiation", () => {
  it("serves markdown only when it is strictly preferred", () => {
    const cases: Array<[string | null, "text/markdown" | "text/html"]> = [
      [null, "text/html"],
      ["", "text/html"],
      ["*/*", "text/html"],
      ["text/html", "text/html"],
      ["text/markdown;q=0", "text/html"],
      ["text/markdown;q=0, text/html", "text/html"],
      ["text/markdown;q=0, */*;q=1", "text/html"],
      ["text/markdown;q=0.1, text/html;q=0.9", "text/html"],
      [CHROME_ACCEPT, "text/html"],
      ["text/markdown", "text/markdown"],
      ["Text/Markdown", "text/markdown"],
      ["text/markdown, text/html;q=0.8", "text/markdown"],
      ["text/markdown, text/html", "text/markdown"],
      ["text/html, text/markdown", "text/html"],
    ];

    for (const [accept, expected] of cases) {
      assert.equal(preferredDocumentType(accept), expected, String(accept));
    }
  });

  it("returns a markdown homepage with Vary: Accept", () => {
    const result = resolveRequest({ pathname: "/", accept: "text/markdown", internal: false });
    assert.equal(result.kind, "document");
    if (result.kind !== "document") return;
    assert.equal(result.status, 200);
    assert.equal(result.contentType, MARKDOWN_CONTENT_TYPE);
    assert.equal(result.vary, VARY_ACCEPT);
    assert.match(result.contentType, /^text\/markdown/);
    assert.match(result.body, /^# Adrian Sanchez/);
    assert.ok(result.body.length > 20);
    assert.match(result.link, /rel="alternate"; type="text\/markdown"/);
    assert.match(result.link, /<\/llms.txt>; rel="describedby"/);
  });

  it("keeps HTML for browsers and for Next.js navigations", () => {
    const browser = resolveRequest({ pathname: "/", accept: CHROME_ACCEPT, internal: false });
    assert.equal(browser.kind, "passthrough");

    const missing = resolveRequest({
      pathname: "/does-not-exist",
      accept: "text/html",
      internal: false,
    });
    assert.equal(missing.kind, "passthrough");

    const rsc = resolveRequest({
      pathname: "/",
      accept: "text/markdown, text/html;q=0.8",
      internal: true,
    });
    assert.equal(rsc.kind, "passthrough");
  });

  it("returns a markdown 404 with an explanation and a link to llms.txt", () => {
    const result = resolveRequest({
      pathname: "/__ora-404-probe-gbyxuvb9",
      accept: "text/markdown",
      internal: false,
    });
    assert.equal(result.kind, "document");
    if (result.kind !== "document") return;
    assert.equal(result.status, 404);
    assert.match(result.contentType, /^text\/markdown/);
    assert.equal(result.vary, VARY_ACCEPT);
    assert.match(result.body, /No page is published at `\/__ora-404-probe-gbyxuvb9`/);
    assert.ok(result.body.replace(/^# .+\n+/, "").trim().length >= 20);
    assert.match(result.body, /https:\/\/adrianisanchez\.com\/llms\.txt/);
    assert.match(result.body, /sitemap\.xml/);
  });

  it("serves .md urls as markdown even when the client accepts HTML", () => {
    const about = resolveRequest({ pathname: "/about.md", accept: "text/html", internal: false });
    assert.equal(about.kind, "document");
    if (about.kind !== "document") return;
    assert.equal(about.status, 200);
    assert.match(about.body, /^# About/);

    const home = resolveRequest({ pathname: "/index.md", accept: "*/*", internal: false });
    assert.equal(home.kind, "document");
    if (home.kind !== "document") return;
    assert.match(home.body, /^# Adrian Sanchez/);

    const missing = resolveRequest({ pathname: "/nope.md", accept: "text/html", internal: false });
    assert.equal(missing.kind, "document");
    if (missing.kind !== "document") return;
    assert.equal(missing.status, 404);
  });

  it("does not replace machine-readable files with a markdown error", () => {
    for (const pathname of ["/llms.txt", "/robots.txt", "/sitemap.xml"]) {
      const result = resolveRequest({ pathname, accept: "text/markdown", internal: false });
      assert.equal(result.kind, "passthrough", pathname);
    }
  });
});

describe("agent instructions", () => {
  it("tells agents when to use the site and how to read it", () => {
    const text = llmsTxt();
    assert.match(text, /^# Adrian Sanchez\n/);
    assert.match(text, /^> /m);
    assert.match(text, /## When to use this/);
    assert.match(text, /When to use this:/);
    assert.match(text, /One Call/);
    assert.match(text, /The Israel Guide/);
    assert.match(text, /Accept: text\/markdown/);
    assert.match(text, /no public API/);
    assert.match(text, new RegExp(site.cal.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
    assert.ok(text.length >= 100);
    assert.ok(text.length < 30_000);

    const headings = text.split(/^## /m).slice(1);
    assert.ok(headings.length >= 2);
    for (const section of headings) {
      assert.match(section, /\[[^\]]+\]\(https?:\/\/[^)]+\)/);
    }
  });
});

describe("trust pages", () => {
  it("gives about, contact, and privacy at least 500 characters of text", () => {
    const paths = docList.map((doc) => doc.path).sort();
    assert.deepEqual(paths, ["/about", "/contact", "/privacy"]);
    for (const doc of docList) {
      const text = visibleText(doc);
      assert.ok(text.length >= 500, `${doc.path} has ${text.length} characters`);
      assert.match(text, /Adrian Sanchez|I am Adrian|my personal site|Write to|Book a 30-minute/);
    }
  });
});

describe("structured data", () => {
  it("describes the person and a complete organization", () => {
    const data = jsonLd();
    const graph = data["@graph"] as Array<Record<string, unknown>>;
    const person = graph.find((node) => node["@type"] === "Person");
    const organizations = graph.filter((node) => node["@type"] === "Organization");

    assert.ok(person);
    assert.equal(typeof person?.description, "string");
    assert.ok(String(person?.description).length > 20);
    assert.match(String(person?.description), /One Call/);
    assert.match(String(person?.description), /Basel/);
    assert.equal(person?.worksFor, "One Call");

    assert.ok(organizations.length >= 1);
    for (const org of organizations) {
      const contact = org.contactPoint as Record<string, unknown>;
      const address = org.address as Record<string, unknown>;
      assert.equal(contact["@type"], "ContactPoint");
      assert.equal(typeof contact.contactType, "string");
      assert.ok(contact.email || contact.telephone);
      assert.equal(address["@type"], "PostalAddress");
      assert.equal(address.addressLocality, "Basel");
      assert.equal(address.addressCountry, "CH");
    }
  });

  it("puts the same offering in the document title", () => {
    assert.match(site.title, /Adrian Sanchez/);
    assert.match(site.title, /Software Engineer/);
    assert.match(site.title, /One Call/);
  });
});

describe("markdown documents", () => {
  it("keeps the homepage and the 404 useful without opening an unclosed fence", () => {
    const home = homeMarkdown();
    const missing = notFoundMarkdown("/missing");
    for (const body of [home, missing, llmsTxt()]) {
      const fences = body.split("\n").filter((line) => /^(```|~~~)/.test(line));
      assert.equal(fences.length % 2, 0);
    }
    assert.match(home, /The Israel Guide/);
    assert.match(home, /Sublify/);
  });
});
