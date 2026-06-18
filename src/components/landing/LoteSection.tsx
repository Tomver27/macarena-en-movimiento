"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const datosLote = [
  { label: "Área total", value: "1.033,46 m²" },
  { label: "Forma", value: "Irregular" },
  { label: "Uso", value: "Mixto" },
  { label: "Estrato", value: "3" },
];

const contexto = [
  "Universidad Jorge Tadeo Lozano",
  "Biblioteca Nacional de Colombia",
  "Planetario de Bogotá",
  "Parque de la Independencia",
];

export default function LoteSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const h2Ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(h2Ref.current, {
        y: 60,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play reverse play reverse",
        },
      });

      gsap.from(".lote-dato", {
        y: 30,
        opacity: 0,
        stagger: 0.1,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          once: true,
        },
      });
      gsap.from(".lote-map", {
        opacity: 0,
        scale: 0.97,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 65%",
          once: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="lote"
      ref={sectionRef}
      style={{
        background: "var(--oscuro)",
        color: "var(--crema)",
        padding: "8rem clamp(1.5rem, 6vw, 6rem)",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <p
          style={{
            fontSize: "0.8rem",
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            color: "var(--amarillo)",
            marginBottom: "1rem",
          }}
        >
          Localización
        </p>
        <h2
          ref={h2Ref}
          style={{
            fontFamily: "var(--font-playfair), serif",
            fontSize: "var(--text-lg)",
            lineHeight: 1.1,
            fontStyle: "italic",
            marginBottom: "3.5rem",
          }}
        >
          <a
            href="https://maps.app.goo.gl/V2tuZhkSpg7AwbLW8"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "inherit", textDecoration: "none", borderBottom: "1px solid rgba(247,228,155,0.4)", paddingBottom: "2px" }}
          >
            Calle 26 Bis #4-88
          </a>
          <br />
          <span style={{ color: "var(--amarillo)", fontSize: "0.65em" }}>
            La Macarena, Bogotá
          </span>
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 2fr",
            gap: "3rem",
            alignItems: "start",
          }}
        >
          {/* Data + context */}
          <div style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "0px" }}>
              {datosLote.map((d) => (
                <div
                  key={d.label}
                  className="lote-dato"
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "baseline",
                    padding: "1rem 0",
                    borderBottom: "1px solid rgba(250,248,244,0.08)",
                    gap: "1rem",
                  }}
                >
                  <span style={{ fontSize: "0.8rem", color: "rgba(250,248,244,0.4)", letterSpacing: "0.05em" }}>
                    {d.label}
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-playfair), serif",
                      fontSize: "1.1rem",
                      color: "var(--crema)",
                    }}
                  >
                    {d.value}
                  </span>
                </div>
              ))}
            </div>

            <div>
              <p
                style={{
                  fontSize: "0.75rem",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: "var(--azul)",
                  marginBottom: "1rem",
                }}
              >
                Equipamientos próximos
              </p>
              {contexto.map((c) => (
                <div
                  key={c}
                  className="lote-dato"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.75rem",
                    padding: "0.6rem 0",
                  }}
                >
                  <div
                    style={{
                      width: "6px",
                      height: "6px",
                      borderRadius: "50%",
                      background: "var(--azul)",
                      flexShrink: 0,
                    }}
                  />
                  <span style={{ fontSize: "0.88rem", color: "rgba(250,248,244,0.7)" }}>
                    {c}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Map */}
          <div
            className="lote-map"
            style={{ position: "relative", borderRadius: "2px", overflow: "hidden" }}
          >
            <div
              aria-hidden="true"
              style={{
                position: "absolute",
                inset: 0,
                border: "1px solid rgba(247,228,155,0.2)",
                zIndex: 1,
                pointerEvents: "none",
              }}
            />
            <iframe
              title="Mapa barrio La Macarena, Bogotá"
              src="https://www.openstreetmap.org/export/embed.html?bbox=-74.0734%2C4.6053%2C-74.0614%2C4.6143&layer=mapnik&marker=4.6098%2C-74.0674"
              style={{
                width: "100%",
                height: "420px",
                border: "none",
                display: "block",
                filter: "grayscale(0.3) contrast(1.05)",
              }}
              loading="lazy"
            />
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          #lote > div > div:last-child { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
