import { ImageResponse } from "next/og";

export const alt = "vonLaim - Webdesign für Handwerker in Bayern";
export const size = {
  width: 1200,
  height: 630
};
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#121416",
          color: "#f7f8f4",
          padding: 64,
          fontFamily: "Arial, sans-serif"
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              width: 64,
              height: 64,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 8,
              background: "#c8f25c",
              color: "#121416",
              fontSize: 28,
              fontWeight: 900
            }}
          >
            vL
          </div>
          <div style={{ fontSize: 34, fontWeight: 800 }}>vonLaim</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              color: "#c8f25c",
              fontSize: 22,
              fontWeight: 800,
              textTransform: "uppercase"
            }}
          >
            Webdesign für Handwerker in Bayern
          </div>
          <h1
            style={{
              margin: "18px 0 0",
              maxWidth: 920,
              fontSize: 82,
              lineHeight: 0.98,
              letterSpacing: 0
            }}
          >
            Ihre Arbeit überzeugt vor Ort. Ihre Website sollte das schon vorher tun.
          </h1>
        </div>
        <div
          style={{
            display: "flex",
            gap: 16,
            color: "#121416",
            fontSize: 24,
            fontWeight: 800
          }}
        >
          {["Sichtbar", "Vertrauenswürdig", "Anfragebereit"].map((item) => (
            <span
              key={item}
              style={{
                borderRadius: 999,
                background: "#c8f25c",
                padding: "12px 18px"
              }}
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    ),
    size
  );
}
