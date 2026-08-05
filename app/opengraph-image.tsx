import { ImageResponse } from "next/og";

export const alt =
  "Ajo Family by Ematony - Your people. Your savings. One clear circle.";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

const weave = Array.from({ length: 7 }, (_, index) => index);

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          position: "relative",
          display: "flex",
          width: "100%",
          height: "100%",
          overflow: "hidden",
          background: "#063627",
          color: "#fffcf6",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            display: "flex",
            width: 420,
            height: 630,
            opacity: 0.16,
          }}
        >
          {weave.map((line) => (
            <div
              key={line}
              style={{
                position: "absolute",
                top: -150,
                left: line * 72,
                width: 24,
                height: 900,
                background: line % 2 ? "#e88c24" : "#e8f5ec",
                transform: "rotate(36deg)",
              }}
            />
          ))}
        </div>

        <div
          style={{
            position: "absolute",
            top: 97,
            right: 104,
            display: "flex",
            width: 390,
            height: 390,
            alignItems: "center",
            justifyContent: "center",
            border: "2px solid rgba(255, 252, 246, 0.32)",
            borderRadius: 999,
          }}
        >
          <div
            style={{
              display: "flex",
              width: 270,
              height: 270,
              alignItems: "center",
              justifyContent: "center",
              border: "24px solid #e88c24",
              borderRadius: 999,
              background: "#e8f5ec",
            }}
          >
            <div
              style={{
                display: "flex",
                width: 112,
                height: 112,
                borderRadius: 999,
                background: "#146456",
              }}
            />
          </div>
        </div>

        <div
          style={{
            position: "relative",
            display: "flex",
            width: 720,
            flexDirection: "column",
            justifyContent: "center",
            padding: "70px 0 70px 76px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: 42,
              fontSize: 27,
              fontWeight: 700,
              letterSpacing: "0.02em",
            }}
          >
            <span style={{ color: "#f2aa4c" }}>Ajo Family</span>
            <span style={{ marginLeft: 10, color: "#d8efe5" }}>
              by Ematony
            </span>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontSize: 72,
              fontWeight: 800,
              lineHeight: 1.02,
              letterSpacing: "-0.045em",
            }}
          >
            <span>Your people.</span>
            <span>Your savings.</span>
            <span style={{ color: "#f2aa4c" }}>One clear circle.</span>
          </div>

          <div
            style={{
              display: "flex",
              marginTop: 36,
              fontSize: 23,
              lineHeight: 1.4,
              color: "#d8efe5",
            }}
          >
            Save together with family, friends, and trusted communities.
          </div>
        </div>
      </div>
    ),
    size,
  );
}
