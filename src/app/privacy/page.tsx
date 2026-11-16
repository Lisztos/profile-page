import type { Metadata } from "next";
import { DocPage, DocSections } from "../components/DocPage";
import { ScrambleDocTitle } from "../components/ScrambleDocTitle";
import { docs } from "@/lib/agent-content";
import { site } from "@/lib/site";

const doc = docs.privacy;

export const metadata: Metadata = {
  title: `${doc.title} | ${site.name}`,
  description: doc.description,
  alternates: { canonical: doc.path },
};

export default function PrivacyPage() {
  return (
    <DocPage title={<ScrambleDocTitle text={doc.title} />} lede={doc.lede}>
      <DocSections doc={doc} />
    </DocPage>
  );
}
