"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AnimatedTitle from "@/components/ui/AnimatedTitle";

gsap.registerPlugin(ScrollTrigger);

const hallazgos = [
  {
    titulo: "Efecto barrera",
    descripcion:
      "La Av. Calle 26 y los cambios de nivel topográfico fragmentan el tejido peatonal, separando el Planetario y la Biblioteca Nacional del interior del barrio.",
    acento: "#BA5A5A",
    stat: "—",
  },
  {
    titulo: "Baja permanencia",
    descripcion:
      "Más del 72% de los peatones en el eje Cra. 5.ª/Tadeo son flujos de tránsito puro. No generan pausas urbanas ni estancias en el espacio público.",
    acento: "#b07d0e",
    stat: "72%",
  },
  {
    titulo: "Activación isla",
    descripcion:
      "Comercio atomizado y especializado con horarios restringidos. La oferta no se integra con la masa estudiantil ni con los residentes de menores ingresos.",
    acento: "#86BCBD",
    stat: "—",
  },
];

export default function ProblematicaSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".prob-heading", {
        y: 60,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 70%", once: true },
      });

      gsap.from(".prob-col", {
        y: 50,
        opacity: 0,
        stagger: 0.15,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 60%", once: true },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        background: "var(--crema)",
        color: "var(--negro)",
        padding: "8rem clamp(1.5rem, 6vw, 6rem)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "10%",
          right: "-5%",
          width: "500px",
          height: "500px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(186,90,90,0.07) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <p
          className="prob-heading"
          style={{
            fontSize: "0.8rem",
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            color: "var(--coral)",
            marginBottom: "1rem",
          }}
        >
          Problemática
        </p>
        <AnimatedTitle
          style={{
            fontFamily: "var(--font-playfair), serif",
            fontSize: "var(--text-lg)",
            lineHeight: 1.15,
            fontStyle: "italic",
            marginBottom: "1.5rem",
            maxWidth: "700px",
          }}
        >
          ¿Por qué La Macarena necesita este espacio?
        </AnimatedTitle>
        <p
          className="prob-heading"
          style={{
            fontSize: "1rem",
            lineHeight: 1.7,
            color: "rgba(17,17,17,0.6)",
            maxWidth: "680px",
            marginBottom: "5rem",
          }}
        >
          La fragmentación socioespacial generada por la ausencia de espacios que promuevan
          permanencia, interacción y apropiación urbana en un sector con alta concentración
          de flujos culturales, educativos y turísticos.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "0px",
            border: "1px solid rgba(17,17,17,0.1)",
          }}
        >
          {hallazgos.map((h) => (
            <div
              key={h.titulo}
              className="prob-col"
              style={{
                padding: "3rem 2.5rem",
                borderRight: "1px solid rgba(17,17,17,0.1)",
                display: "flex",
                flexDirection: "column",
                gap: "1.2rem",
              }}
            >
              {h.stat !== "—" && (
                <span
                  style={{
                    fontFamily: "var(--font-playfair), serif",
                    fontSize: "clamp(3rem, 6vw, 5rem)",
                    color: h.acento,
                    lineHeight: 1,
                    fontStyle: "italic",
                    opacity: 0.9,
                  }}
                >
                  {h.stat}
                </span>
              )}
              {h.stat === "—" && (
                <div
                  style={{ width: "40px", height: "1px", background: h.acento, opacity: 0.8 }}
                />
              )}
              <h3
                style={{
                  fontFamily: "var(--font-playfair), serif",
                  fontSize: "1.25rem",
                  color: h.acento,
                }}
              >
                {h.titulo}
              </h3>
              <p
                style={{
                  fontSize: "0.88rem",
                  lineHeight: 1.7,
                  color: "rgba(17,17,17,0.6)",
                }}
              >
                {h.descripcion}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
