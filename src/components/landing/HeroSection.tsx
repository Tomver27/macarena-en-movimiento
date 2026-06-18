"use client";

import { useEffect, useRef, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const BASE_STREAMS = [
  { url: "https://www.youtube.com/embed/om4VRC4TU_o?autoplay=1&mute=0", label: "Finger Tracking — TouchDesigner" },
  { url: "https://www.youtube.com/embed/AKcmOnFu1SQ?list=RDAKcmOnFu1SQ&autoplay=1&mute=0", label: "Candelabro — Lollapalooza 2026" },
  { url: "https://www.youtube.com/embed/Fo89b8zAIE4?list=RDFo89b8zAIE4&autoplay=1&mute=0", label: "Rusowsky: Tiny Desk" },
];

function StreamCarousel() {
  const searchParams = useSearchParams();
  const streamDomain = searchParams.get("stream");

  const streams = streamDomain
    ? [{ url: streamDomain, label: "Stream en vivo" }, ...BASE_STREAMS]
    : BASE_STREAMS;

  const [activeIndex, setActiveIndex] = useState(0);

  const rootRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const dragStartX = useRef<number | null>(null);
  const scaleValue = useRef(1);
  const tooltipTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isAnimating = useRef(false);

  // Wheel → scale (passive:false so we can preventDefault + stopPropagation vs Lenis)
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      e.stopPropagation();
      scaleValue.current = e.deltaY > 0
        ? Math.min(1.4, scaleValue.current + 0.08)
        : Math.max(1.0, scaleValue.current - 0.08);
      gsap.to(el, { scale: scaleValue.current, duration: 0.6, ease: "power2.out", overwrite: "auto" });
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, []);

  useEffect(() => () => { if (tooltipTimer.current) clearTimeout(tooltipTimer.current); }, []);

  const goToStream = (nextIdx: number) => {
    if (isAnimating.current || nextIdx === activeIndex || !innerRef.current) return;
    isAnimating.current = true;
    const isNext = nextIdx > activeIndex;
    gsap.to(innerRef.current, {
      xPercent: isNext ? -100 : 100,
      opacity: 0,
      duration: 0.4,
      ease: "power2.inOut",
      onComplete: () => {
        setActiveIndex(nextIdx);
        gsap.fromTo(
          innerRef.current,
          { xPercent: isNext ? 100 : -100, opacity: 0 },
          {
            xPercent: 0,
            opacity: 1,
            duration: 0.4,
            ease: "power2.inOut",
            onComplete: () => { isAnimating.current = false; },
          }
        );
      },
    });
  };

  const onMouseDown = (e: React.MouseEvent) => { dragStartX.current = e.clientX; };

  const onMouseUp = (e: React.MouseEvent) => {
    if (dragStartX.current === null) return;
    const delta = e.clientX - dragStartX.current;
    dragStartX.current = null;
    if (delta < -60) goToStream((activeIndex + 1) % streams.length);
    else if (delta > 60) goToStream((activeIndex - 1 + streams.length) % streams.length);
  };

  const onMouseEnter = () => {
    if (!tooltipRef.current) return;
    if (tooltipTimer.current) clearTimeout(tooltipTimer.current);
    gsap.to(tooltipRef.current, { opacity: 1, duration: 0.3, overwrite: "auto" });
    tooltipTimer.current = setTimeout(() => {
      if (tooltipRef.current) gsap.to(tooltipRef.current, { opacity: 0, duration: 0.3 });
    }, 1800);
  };

  const onMouseLeave = () => {
    dragStartX.current = null;
    scaleValue.current = 1;
    if (rootRef.current) gsap.to(rootRef.current, { scale: 1, duration: 0.6, ease: "power2.out", overwrite: "auto" });
    if (tooltipTimer.current) clearTimeout(tooltipTimer.current);
    if (tooltipRef.current) gsap.to(tooltipRef.current, { opacity: 0, duration: 0.3, overwrite: "auto" });
  };

  return (
    <div
      ref={rootRef}
      style={{
        width: "100%",
        height: "100%",
        position: "relative",
        transformOrigin: "center center",
        userSelect: "none",
        cursor: "none",
      }}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onDragStart={(e) => e.preventDefault()}
    >
      {/* Tooltip — aparece brevemente al hacer hover */}
      <div
        ref={tooltipRef}
        style={{
          position: "absolute",
          bottom: "calc(100% + 8px)",
          left: "50%",
          transform: "translateX(-50%)",
          opacity: 0,
          pointerEvents: "none",
          whiteSpace: "nowrap",
          background: "rgba(10,10,10,0.85)",
          color: "var(--crema)",
          fontSize: "0.7rem",
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          padding: "0.4rem 1rem",
          borderRadius: "2px",
          zIndex: 10,
        }}
      >
        arrastra para cambiar el video
      </div>

      {/* Slide container — overflow:hidden recorta la animación de slide */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          overflow: "hidden",
          borderRadius: "4px",
          border: "1px solid rgba(134,188,189,0.2)",
        }}
      >
        <div ref={innerRef} style={{ position: "absolute", inset: 0 }}>
          {/* pointer-events:none en el iframe para que los eventos de mouse
              pasen al wrapper y funcionen el drag, scroll y hover */}
          <iframe
            src={streams[activeIndex].url}
            style={{ width: "100%", height: "100%", border: "none", display: "block", pointerEvents: "none" }}
            allowFullScreen
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            title={`Programación visual en vivo — ${streams[activeIndex].label}`}
          />
        </div>
      </div>

      {/* Dots indicadores de stream */}
      <div
        style={{
          position: "absolute",
          bottom: "-1.75rem",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          gap: "0.5rem",
          alignItems: "center",
          zIndex: 5,
        }}
      >
        {streams.map((_, i) => (
          <button
            key={i}
            onClick={() => goToStream(i)}
            style={{
              width: "6px",
              height: "6px",
              borderRadius: "50%",
              background: i === activeIndex ? "var(--coral)" : "rgba(250,248,244,0.25)",
              border: "none",
              padding: 0,
              cursor: "none",
              transition: "background 0.3s",
              flexShrink: 0,
            }}
            aria-label={`Stream ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const streamRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);
  const bajaRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 2.4 });

      tl.from(titleRef.current, {
        y: 80,
        opacity: 0,
        duration: 1.2,
        ease: "power4.out",
      })
        .from(
          subtitleRef.current,
          { y: 30, opacity: 0, duration: 0.8, ease: "power3.out" },
          "-=0.6"
        )
        .from(
          streamRef.current,
          { scale: 0.95, opacity: 0, duration: 1, ease: "power3.out" },
          "-=0.5"
        )
        .from(
          ctaRef.current,
          { y: 20, opacity: 0, duration: 0.6, ease: "power3.out" },
          "-=0.4"
        );

      gsap.to(titleRef.current, {
        yPercent: -20,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      // "Baja" indicator: desliza a la derecha y desaparece al hacer scroll
      gsap.to(bajaRef.current, {
        x: 90,
        opacity: 0,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "50% top",
          end: "80% top",
          scrub: 0.6,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const scrollToNext = () => {
    document.getElementById("exposicion")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={sectionRef}
      data-hero=""
      style={{
        height: "100svh",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gridTemplateAreas: '"text carousel" "btn carousel"',
        gridTemplateRows: "1fr auto",
        padding: "clamp(5rem, 10vh, 7rem) clamp(1.5rem, 5vw, 5rem) clamp(7rem, 12vh, 9rem)",
        columnGap: "3rem",
        rowGap: "2rem",
        background: "var(--oscuro)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Decorative background circles */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          width: "600px",
          height: "600px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(186,90,90,0.08) 0%, transparent 70%)",
          top: "-10%",
          left: "-5%",
          pointerEvents: "none",
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          width: "400px",
          height: "400px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(134,188,189,0.06) 0%, transparent 70%)",
          bottom: "10%",
          right: "45%",
          pointerEvents: "none",
        }}
      />

      {/* Grid area: text */}
      <div
        style={{
          gridArea: "text",
          alignSelf: "center",
          display: "flex",
          flexDirection: "column",
          gap: "1.5rem",
        }}
      >
        <div>
          <p
            style={{
              fontSize: "0.8rem",
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              color: "var(--coral)",
              marginBottom: "1rem",
            }}
          >
            Centro Cultural Comunitario
          </p>
          <h1
            ref={titleRef}
            style={{
              fontFamily: "var(--font-playfair), serif",
              fontSize: "var(--text-xl)",
              lineHeight: 1.0,
              color: "var(--crema)",
              fontStyle: "italic",
            }}
          >
            Macarena
            <br />
            <span style={{ color: "var(--coral)" }}>en Movimiento</span>
          </h1>
          <p
            ref={subtitleRef}
            style={{
              marginTop: "1.5rem",
              fontSize: "var(--text-md)",
              color: "rgba(250,248,244,0.55)",
              maxWidth: "440px",
              lineHeight: 1.6,
            }}
          >
            La Macarena, Bogotá · Un espacio de encuentro, arte y cultura
            para transformar el territorio.
          </p>
        </div>
      </div>

      {/* Grid area: carousel */}
      <div
        ref={streamRef}
        data-stream-carousel=""
        style={{
          gridArea: "carousel",
          minHeight: "clamp(300px, 45vw, 560px)",
          position: "relative",
          paddingBottom: "2rem",
        }}
      >
        <Suspense
          fallback={
            <div
              style={{
                width: "100%",
                height: "100%",
                background: "rgba(134,188,189,0.06)",
                border: "1px solid rgba(134,188,189,0.2)",
                borderRadius: "4px",
              }}
            />
          }
        >
          <StreamCarousel />
        </Suspense>

        {/* Corner accents */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            top: "-1px",
            left: "-1px",
            width: "24px",
            height: "24px",
            borderTop: "2px solid var(--coral)",
            borderLeft: "2px solid var(--coral)",
            pointerEvents: "none",
          }}
        />
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            bottom: "2rem",
            right: "-1px",
            width: "24px",
            height: "24px",
            borderBottom: "2px solid var(--coral)",
            borderRight: "2px solid var(--coral)",
            pointerEvents: "none",
          }}
        />
      </div>

      {/* Grid area: btn — separado del div de texto para poder reordenarlo en móvil */}
      <button
        ref={ctaRef}
        data-cta=""
        onClick={scrollToNext}
        style={{
          gridArea: "btn",
          alignSelf: "start",
          justifySelf: "start",
          padding: "1rem 2.5rem",
          background: "transparent",
          border: "1px solid var(--coral)",
          color: "var(--crema)",
          fontSize: "0.85rem",
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          cursor: "none",
          transition: "background 0.3s, color 0.3s",
        }}
        onMouseEnter={(e) => {
          (e.target as HTMLElement).style.background = "var(--coral)";
          (e.target as HTMLElement).style.color = "var(--crema)";
        }}
        onMouseLeave={(e) => {
          (e.target as HTMLElement).style.background = "transparent";
          (e.target as HTMLElement).style.color = "var(--crema)";
        }}
      >
        Descubre el CDC
      </button>

      {/* Scroll indicator — botón funcional */}
      <button
        ref={bajaRef}
        data-baja=""
        onClick={scrollToNext}
        style={{
          position: "absolute",
          bottom: "2.5rem",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0.5rem",
          opacity: 0.4,
          background: "none",
          border: "none",
          cursor: "none",
          padding: 0,
          transition: "opacity 0.25s",
        }}
        onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.opacity = "0.85"; }}
        onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.opacity = "0.4"; }}
        aria-label="Ir a la siguiente sección"
      >
        <span style={{ fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--crema)" }}>
          Baja
        </span>
        <div
          style={{
            width: "1px",
            height: "40px",
            background: "linear-gradient(to bottom, var(--crema), transparent)",
          }}
        />
      </button>

      {/* Responsive styles */}
      <style>{`
        @media (max-width: 768px) {
          section[data-hero] {
            height: auto !important;
            min-height: 100svh !important;
            grid-template-columns: 1fr !important;
            grid-template-areas: "text" "carousel" "btn" !important;
            grid-template-rows: auto !important;
            padding-top: 6rem !important;
            row-gap: 2.5rem !important;
          }
          section[data-hero] [data-stream-carousel] {
            min-height: clamp(220px, 75vw, 420px) !important;
          }
          section[data-hero] [data-cta] {
            justify-self: center !important;
            cursor: pointer !important;
          }
          section[data-hero] [data-baja] {
            display: none !important;
          }
        }
      `}</style>
    </section>
  );
}
