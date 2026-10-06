import { ImageResponse } from "next/og"

export const alt =
  "Data Systems — Data Scientist and Data Engineer portfolio"

export const size = {
  width: 1200,
  height: 630,
}

export const contentType = "image/png"

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          background: "linear-gradient(135deg, #000000 0%, #120a04 55%, #1c0d02 100%)",
          color: "#f4f3ef",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <span style={{ color: "#ff6b00", fontSize: 34, fontWeight: 700 }}>
              D/
            </span>
            <span
              style={{
                color: "#e4e3df",
                fontSize: 20,
                letterSpacing: 4,
              }}
            >
              DATA SYSTEMS
            </span>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              color: "#9b9b98",
              fontSize: 18,
              letterSpacing: 3,
            }}
          >
            <span
              style={{
                width: 10,
                height: 10,
                borderRadius: 10,
                background: "#ff6b00",
              }}
            />
            AVAILABLE FOR SELECT PROJECTS
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <span
            style={{
              color: "#ff6b00",
              fontSize: 20,
              letterSpacing: 6,
            }}
          >
            DATA SCIENTIST · DATA ENGINEER
          </span>
          <span
            style={{
              marginTop: 26,
              fontSize: 74,
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: -2,
            }}
          >
            Transforming the Unknown
          </span>
          <span
            style={{
              fontSize: 74,
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: -2,
              color: "#a5a4a0",
            }}
          >
            into Strategic Insights.
          </span>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "1px solid #2f2f2f",
            paddingTop: 24,
            color: "#777773",
            fontSize: 18,
            letterSpacing: 3,
          }}
        >
          <span>STEALTHY PIPELINES · CLEAR PREDICTIVE MODELS</span>
          <span style={{ color: "#ff6b00" }}>MODELING THE UNSEEN</span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
