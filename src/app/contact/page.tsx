import type { Metadata } from "next";
import { DocPage } from "../components/DocPage";
import { docs } from "@/lib/agent-content";
import { calBookingPath, site } from "@/lib/site";

const doc = docs.contact;

export const metadata: Metadata = {
  title: `${doc.title} | ${site.name}`,
  description: doc.description,
  alternates: { canonical: doc.path },
};

export default function ContactPage() {
  return (
    <DocPage title={doc.title} lede={doc.lede}>
      <a className="doc-mail" href={`mailto:${site.email}`}>
        {site.email}
      </a>
      <div className="doc-actions">
        <a className="pill" href={site.cal} data-cal-link={calBookingPath} aria-haspopup="dialog">
          Book 30 minutes
        </a>
      </div>
    </DocPage>
  );
}
