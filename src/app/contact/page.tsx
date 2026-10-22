import type { Metadata } from "next";
import { DocPage } from "../components/DocPage";
import { docs } from "@/lib/agent-content";
import { site } from "@/lib/site";

const doc = docs.contact;

export const metadata: Metadata = {
  title: `${doc.title} | ${site.name}`,
  description: doc.description,
  alternates: { canonical: doc.path },
};

export default function ContactPage() {
  return <DocPage doc={doc} />;
}
