import { ImageResponse } from "next/og";

export const alt = "David Chong — Portfolio";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function PortfolioOpengraphImage() {
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
          Portfolio · Building in public
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginTop: "28px",
            fontSize: "104px",
            fontWeight: 800,
            lineHeight: 1.0,
          }}
        >
          <span>Everything I&apos;m</span>
          <span>building.</span>
        </div>

        <div
          style={{
            marginTop: "36px",
            fontSize: "34px",
            color: "#9ca3af",
          }}
        >
          davidcjw.com/portfolio
        </div>
      </div>
    ),
    { ...size },
  );
}
