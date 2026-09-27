import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const alt = site.title;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

async function loadFont(file: string) {
  const res = await fetch(
    `https://github.com/google/fonts/raw/main/ofl/instrumentserif/${file}`
  );
  if (!res.ok) return null;
  return res.arrayBuffer();
}

export default async function Image() {
  const [regular, italic] = await Promise.all([
    loadFont("InstrumentSerif-Regular.ttf"),
    loadFont("InstrumentSerif-Italic.ttf"),
  ]);

  const fonts = [];
  if (regular) {
    fonts.push({ name: "Instrument Serif", data: regular, style: "normal" as const });
  }
  if (italic) {
    fonts.push({ name: "Instrument Serif", data: italic, style: "italic" as const });
  }

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#f5f1e8",
          color: "#211f1a",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          fontFamily: fonts.length ? "Instrument Serif" : "Georgia",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 22,
            letterSpacing: "0.14em",
            color: "#8c887a",
            fontFamily: "Georgia",
          }}
        >
          <span>{site.location}</span>
          <span>EST. 5+ YRS IN PROD</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 92, lineHeight: 0.95, letterSpacing: "-0.02em" }}>
            Adrian
          </div>
          <div
            style={{
              fontSize: 92,
              lineHeight: 0.95,
              letterSpacing: "-0.02em",
              color: "#b4432c",
              fontStyle: "italic",
            }}
          >
            Sanchez
          </div>
        </div>
        <div
          style={{
            display: "flex",
            borderTop: "2.5px solid #211f1a",
            paddingTop: 24,
            fontSize: 22,
            letterSpacing: "0.1em",
            color: "#57534a",
            fontFamily: "Georgia",
          }}
        >
          {site.role.toUpperCase()}
        </div>
      </div>
    ),
    { ...size, fonts }
  );
}
