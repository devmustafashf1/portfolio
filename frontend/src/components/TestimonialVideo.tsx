import { useState, useEffect, useRef, useCallback } from "react";

const VIDEO_ID = "PgpZsykienA";

const MuteIcon = () => (
  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <path d="M11 5L6 9H2v6h4l5 4V5z" />
    <line x1="23" y1="9" x2="17" y2="15" />
    <line x1="17" y1="9" x2="23" y2="15" />
  </svg>
);

const UnmuteIcon = () => (
  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
    <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
  </svg>
);

const CloseIcon = () => (
  <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

export default function TestimonialVideo() {
  const [muted, setMuted] = useState(true);
  const [mainMuted, setMainMuted] = useState(true);
  const [isFloating, setIsFloating] = useState(false);
  const [closing, setClosing] = useState(false);
  const [startTime, setStartTime] = useState(0);

  const sectionRef = useRef<HTMLDivElement>(null);
  const mainIframeRef = useRef<HTMLIFrameElement>(null);
  const floatIframeRef = useRef<HTMLIFrameElement>(null);
  // Tracks wall-clock time when the section video started playing
  const videoStartRef = useRef<number | null>(null);

  // Send mute/unmute to an iframe without reloading it
  const sendCommand = useCallback((iframe: HTMLIFrameElement | null, func: "mute" | "unMute") => {
    iframe?.contentWindow?.postMessage(
      JSON.stringify({ event: "command", func, args: [] }),
      "*"
    );
  }, []);

  const toggleMainMute = useCallback(() => {
    setMainMuted((prev) => {
      const next = !prev;
      sendCommand(mainIframeRef.current, next ? "mute" : "unMute");
      return next;
    });
  }, [sendCommand]);

  const toggleMute = useCallback(() => {
    setMuted((prev) => {
      const next = !prev;
      sendCommand(floatIframeRef.current, next ? "mute" : "unMute");
      return next;
    });
  }, [sendCommand]);

  const handleClose = useCallback(() => {
    setClosing(true);
    setTimeout(() => {
      setIsFloating(false);
      setClosing(false);
    }, 300);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Section is visible — record start time (reset on each re-entry)
          videoStartRef.current = Date.now();
          setIsFloating(false);
          setClosing(false);
          // Reset mute states so each session starts fresh
          setMuted(true);
          setMainMuted(true);
        } else if (entry.boundingClientRect.top < 0) {
          // Scrolled past the section
          const elapsed = videoStartRef.current
            ? Math.floor((Date.now() - videoStartRef.current) / 1000)
            : 0;
          setStartTime(elapsed);
          setIsFloating(true);
        }
        // If boundingClientRect.top > 0 (section not yet reached), do nothing
      },
      { threshold: 0.15 }
    );

    const el = sectionRef.current;
    if (el) observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Main section embed — no controls, mute toggled via postMessage
  const mainSrc = `https://www.youtube.com/embed/${VIDEO_ID}?autoplay=1&mute=1&loop=1&playlist=${VIDEO_ID}&controls=0&rel=0&modestbranding=1&playsinline=1&enablejsapi=1`;

  // Floating embed — starts from startTime, always muted=1 in URL; mute toggled via postMessage
  const floatSrc = `https://www.youtube.com/embed/${VIDEO_ID}?autoplay=1&mute=1&loop=1&playlist=${VIDEO_ID}&controls=0&rel=0&modestbranding=1&playsinline=1&enablejsapi=1&start=${startTime}`;

  return (
    <>
      {/* ── Main section ─────────────────────────────── */}
      <section
        ref={sectionRef}
        className="mb-20 md:mb-28 px-4 md:px-8 max-w-xl mx-auto"
      >
        <p className="text-xs text-[#3a3a3a] uppercase tracking-widest text-center mb-3">
          Client Testimonial
        </p>
        <h2 className="text-2xl md:text-3xl font-semibold text-white text-center mb-8">
          Don't take our word for it
        </h2>

        {/* Video card — 16:9, moderate size */}
        <div className="relative">
          <div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-[#a259ff]/15 to-[#4f46e5]/10 blur-xl opacity-50 pointer-events-none" />
          <div className="relative aspect-video rounded-2xl overflow-hidden border border-white/[0.08] bg-black shadow-xl">
            <iframe
              ref={mainIframeRef}
              src={mainSrc}
              allow="autoplay; encrypted-media; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
              style={{ border: "none" }}
              title="Client Testimonial"
            />
            {/* Custom mute-only control */}
            <button
              onClick={toggleMainMute}
              className="absolute bottom-3 left-3 z-20 w-8 h-8 rounded-full bg-black/60 border border-white/10 flex items-center justify-center text-white hover:bg-black/85 transition backdrop-blur-sm"
              aria-label={mainMuted ? "Unmute" : "Mute"}
            >
              {mainMuted ? <MuteIcon /> : <UnmuteIcon />}
            </button>
          </div>
        </div>
      </section>

      {/* ── Floating mini (reel format) ───────────────── */}
      {isFloating && (
        <div
          className={`fixed bottom-5 right-5 z-50 ${closing ? "float-out" : "float-in"}`}
        >
          {/* glow ring */}
          <div className="absolute -inset-3 rounded-[28px] bg-[#a259ff]/20 blur-xl pointer-events-none" />

          {/* shell — vertical 9:16 */}
          <div
            className="relative overflow-hidden rounded-[20px] border border-white/15 bg-black shadow-2xl"
            style={{ width: 160, height: 284 }}
          >
            <iframe
              ref={floatIframeRef}
              src={floatSrc}
              allow="autoplay; encrypted-media"
              className="w-full h-full"
              style={{ border: "none" }}
              title="Client Testimonial mini"
            />

            {/* top row: mute + close */}
            <div className="absolute top-2 inset-x-2 flex justify-between z-20">
              <button
                onClick={toggleMute}
                className="w-7 h-7 rounded-full bg-black/65 border border-white/10 flex items-center justify-center text-white hover:bg-black/85 transition backdrop-blur-sm"
                aria-label={muted ? "Unmute" : "Mute"}
              >
                {muted ? <MuteIcon /> : <UnmuteIcon />}
              </button>
              <button
                onClick={handleClose}
                className="w-7 h-7 rounded-full bg-black/65 border border-white/10 flex items-center justify-center text-white hover:bg-black/85 transition backdrop-blur-sm"
                aria-label="Close"
              >
                <CloseIcon />
              </button>
            </div>

            {/* bottom gradient + label */}
            <div className="absolute bottom-0 inset-x-0 h-10 bg-gradient-to-t from-black/70 to-transparent pointer-events-none z-10" />
            <p className="absolute bottom-2 inset-x-0 text-center text-[9px] uppercase tracking-widest text-white/35 z-20 pointer-events-none">
              Testimonial
            </p>
          </div>
        </div>
      )}
    </>
  );
}
