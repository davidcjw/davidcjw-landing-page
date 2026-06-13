import { ImageResponse } from "next/og";

export const alt = "David Chong — Software Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background:
            "radial-gradient(circle at 80% 0%, #1e1b4b 0%, #111827 55%)",
          color: "#f9fafb",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            color: "#a5b4fc",
            fontSize: "26px",
            fontWeight: 600,
            letterSpacing: "4px",
            textTransform: "uppercase",
          }}
        >
          <div
            style={{
              width: "12px",
              height: "12px",
              borderRadius: "9999px",
              background: "#6366f1",
            }}
          />
          Building in public
        </div>

        <div
          style={{
            marginTop: "28px",
            fontSize: "96px",
            fontWeight: 800,
            lineHeight: 1.05,
          }}
        >
          David Chong
        </div>

        <div
          style={{
            marginTop: "20px",
            fontSize: "40px",
            color: "#9ca3af",
            maxWidth: "820px",
          }}
        >
          Software engineer shipping small, useful things — web apps, open-source
          tools, and experiments.
        </div>

        <div
          style={{
            marginTop: "48px",
            fontSize: "30px",
            color: "#6366f1",
            fontWeight: 600,
          }}
        >
          davidcjw.com
        </div>
      </div>
    ),
    { ...size },
  );
}
