import { useState, useCallback } from "react";
import { motion, AnimatePresence, MotionConfig } from "motion/react";
import SSTag from "./SSTag";
import SocialTag from "./contact/SocialTag";
import BanksyFigure from "./contact/BanksyFigure";
import Envelope from "./contact/Envelope";
import DeliveredStamp from "./contact/DeliveredStamp";
import { TOP_BAR_H } from "../lib/constants";

type ContactState =
  | "idle"
  | "opening"
  | "composing"
  | "sending"
  | "walking"
  | "delivered"
  | "reset";

const NAV_ITEMS = [
  { label: "About", href: "/about" },
  { label: "Archive", href: "/archive" },
  { label: "Contact", href: "/contact" },
];

export default function ContactPage() {
  const [state, setState] = useState<ContactState>("idle");
  const [error, setError] = useState<string | null>(null);

  // idle → opening on envelope click
  const handleEnvelopeClick = useCallback(() => {
    if (state !== "idle") return;
    setState("opening");
    // opening → composing after letter unfolds
    setTimeout(() => setState("composing"), 500);
  }, [state]);

  // composing → sending → walking → delivered
  const handleSend = useCallback(
    async (data: { name: string; handle: string; message: string; company?: string }) => {
      setError(null);
      setState("sending");

      try {
        const res = await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
        if (!res.ok) {
          setError("the dead drop is closed. try again in a minute.");
          setState("composing");
          return;
        }
      } catch {
        setError("the dead drop is closed. try again in a minute.");
        setState("composing");
        return;
      }

      // Letter folds back into envelope (600ms), then walking
      setTimeout(() => {
        setState("walking");
        // Figure walks off (2.4s), then delivered
        setTimeout(() => setState("delivered"), 2400);
      }, 600);
    },
    []
  );

  // delivered → reset → idle (figure walks back on)
  const handleSendAnother = useCallback(() => {
    setState("reset");
    setTimeout(() => setState("idle"), 1600);
  }, []);

  const showEnvelopeOnFigure = state === "idle";
  const envelopeOpen = state === "opening" || state === "composing";
  const showLetter = state === "composing" || state === "opening";
  const showFigure =
    state === "idle" ||
    state === "opening" ||
    state === "composing" ||
    state === "sending" ||
    state === "walking" ||
    state === "reset";
  const figureHolding =
    state === "idle" || state === "sending" || state === "walking";
  const figureWalking = state === "walking";
  const figureReturning = state === "reset";
  const showStamp = state === "delivered";
  const showHint = state === "idle";
  const showTags =
    state === "idle" || state === "opening" || state === "composing";
  const isSending = state === "sending";

  // Figure X position
  const figureX = state === "walking" ? -800 : 0;
  const figureInitialX = state === "reset" ? -800 : 0;

  return (
    <MotionConfig reducedMotion="user">
    <div
      style={{
        width: "100vw",
        height: "100dvh",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        background: "var(--wall)",
      }}
    >
      <h1 className="sr-only">Contact</h1>
      {/* Top bar */}
      <header
        style={{
          height: TOP_BAR_H,
          flexShrink: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 16px",
          borderBottom: "1px solid var(--ink)",
        }}
      >
        <a
          href="/"
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 10,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: "var(--ink)",
            textDecoration: "none",
          }}
        >
          Sahil Shaikh
        </a>
        <nav aria-label="Primary" style={{ display: "flex", gap: 16 }}>
          {NAV_ITEMS.map((item) => (
            <a
              key={item.label}
              href={item.href}
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 9,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color:
                  item.label === "Contact" ? "var(--red)" : "var(--muted)",
                textDecoration: "none",
              }}
            >
              {item.label}
            </a>
          ))}
        </nav>
      </header>

      {/* Stage */}
      <main
        style={{
          flex: 1,
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Figure — centered at ~55% vertical */}
        {showFigure && (
          <motion.div
            key={state === "reset" ? "returning" : "figure"}
            initial={{ x: figureInitialX }}
            animate={{
              x: figureX,
              y:
                figureWalking || figureReturning
                  ? [0, -3, 0, -3, 0, -3, 0, -3, 0, -3, 0]
                  : 0,
            }}
            transition={{
              x: {
                duration: figureWalking ? 2.4 : figureReturning ? 1.6 : 0.3,
                ease: figureWalking ? "easeIn" : "easeOut",
              },
              y: {
                duration: 0.4,
                repeat: figureWalking ? 6 : figureReturning ? 4 : 0,
                ease: "easeInOut",
              },
            }}
            style={{
              position: "absolute",
              left: "50%",
              top: "55%",
              marginLeft: -70,
              marginTop: -140,
            }}
          >
            {/* FUTURE: Replace with MJ-generated art via imageUrl prop */}
            <BanksyFigure
              holdingEnvelope={figureHolding}
              walking={figureWalking || figureReturning}
            />

            {/* Interactive envelope — at figure's hand, idle only */}
            {showEnvelopeOnFigure && (
              <div
                style={{
                  position: "absolute",
                  top: 118,
                  left: 68,
                  zIndex: 5,
                  cursor: "pointer",
                }}
                onClick={handleEnvelopeClick}
              >
                <Envelope size={48} open={false} />
              </div>
            )}
          </motion.div>
        )}

        {/* Opened envelope — centered above figure when composing */}
        <AnimatePresence>
          {envelopeOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              style={{
                position: "absolute",
                top: "55%",
                left: "50%",
                marginLeft: -60,
                marginTop: -200,
                zIndex: 10,
              }}
            >
              <Envelope size={120} open={true} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Letter / form — positioned above the envelope, centered */}
        <AnimatePresence>
          {showLetter && (
            <motion.div
              initial={{ opacity: 0, scale: 0.6, y: 40 }}
              animate={
                state === "composing"
                  ? { opacity: 1, scale: 1, y: 0 }
                  : { opacity: 0, scale: 0.6, y: 40 }
              }
              exit={{ opacity: 0, scale: 0.6, y: 40 }}
              transition={{
                duration: 0.5,
                ease: [0.16, 1, 0.3, 1],
              }}
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                marginLeft: -210,
                marginTop: -260,
                width: 420,
                minHeight: 480,
                background: "#fff",
                border: "1px solid var(--ink)",
                boxShadow:
                  "inset 0 1px 3px rgba(0,0,0,0.06), 0 4px 24px rgba(0,0,0,0.08)",
                padding: "36px 32px 28px",
                zIndex: 20,
              }}
            >
              <LetterContent
                onSend={handleSend}
                error={error}
                sending={isSending}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Delivered stamp — appears where figure was */}
        <AnimatePresence>
          {showStamp && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              style={{
                position: "absolute",
                top: "55%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 24,
              }}
            >
              <DeliveredStamp visible={true} />

              {/* Send another link — delayed appearance */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.3 }}
              >
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    handleSendAnother();
                  }}
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 10,
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: "var(--ink)",
                    textDecoration: "none",
                    borderBottom: "1px solid var(--ink)",
                    paddingBottom: 3,
                    display: "inline-block",
                    transition: "color 0.15s ease, border-color 0.15s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "var(--red)";
                    e.currentTarget.style.borderBottomColor = "var(--red)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "var(--ink)";
                    e.currentTarget.style.borderBottomColor = "var(--ink)";
                  }}
                >
                  SEND ANOTHER →
                </a>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Idle hint — below figure */}
        <AnimatePresence>
          {showHint && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              style={{
                position: "absolute",
                left: "50%",
                top: "calc(55% + 160px)",
                transform: "translateX(-50%)",
                textAlign: "center",
              }}
            >
              <motion.span
                animate={{ y: [0, -2, 0] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 8,
                  letterSpacing: "0.25em",
                  textTransform: "uppercase",
                  color: "var(--muted)",
                  display: "inline-block",
                }}
              >
                ↑ tap the envelope
              </motion.span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Graffiti social tags — visible during idle / opening / composing */}
        <AnimatePresence>
          {showTags && (
            <>
              {/* LinkedIn — upper-left wall */}
              <motion.div
                key="tag-in"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                style={{
                  position: "absolute",
                  top: 88,
                  left: 84,
                  transform: "rotate(-8deg)",
                  zIndex: 2,
                }}
              >
                <SocialTag
                  kind="in"
                  href="https://linkedin.com/in/sahil-shaikh-cs"
                  ariaLabel="LinkedIn"
                />
              </motion.div>

              {/* GitHub — upper-right wall */}
              <motion.div
                key="tag-gh"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25, delay: 0.05 }}
                style={{
                  position: "absolute",
                  top: 108,
                  right: 92,
                  transform: "rotate(5deg)",
                  zIndex: 2,
                }}
              >
                <SocialTag
                  kind="gh"
                  href="https://github.com/YOUR_GITHUB_HANDLE"
                  ariaLabel="GitHub"
                />
              </motion.div>

              {/* X — lower-left wall */}
              <motion.div
                key="tag-x"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25, delay: 0.1 }}
                style={{
                  position: "absolute",
                  bottom: 96,
                  left: 104,
                  transform: "rotate(-3deg)",
                  zIndex: 2,
                }}
              >
                <SocialTag
                  kind="x"
                  href="https://x.com/YOUR_X_HANDLE"
                  ariaLabel="X (Twitter)"
                />
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* SS Tag — always visible */}
        <div
          style={{
            position: "absolute",
            bottom: 32,
            right: 60,
            transform: "rotate(-6deg)",
            zIndex: 2,
          }}
        >
          <SSTag size={42} />
        </div>
      </main>
    </div>
    </MotionConfig>
  );
}

/** Inline letter content — the form fields inside the paper */
function LetterContent({
  onSend,
  error,
  sending,
}: {
  onSend: (data: { name: string; handle: string; message: string; company?: string }) => void;
  error: string | null;
  sending: boolean;
}) {
  const [name, setName] = useState("");
  const [handle, setHandle] = useState("");
  const [message, setMessage] = useState("");
  const [company, setCompany] = useState(""); // honeypot — must stay empty

  const isValid =
    name.trim() !== "" && handle.trim() !== "" && message.trim().length >= 10;
  const messageTooShort =
    message.trim().length > 0 && message.trim().length < 10;

  const handleSubmit = () => {
    if (!isValid || sending) return;
    onSend({
      name: name.trim(),
      handle: handle.trim(),
      message: message.trim(),
      company,
    });
  };

  const inputBase: React.CSSProperties = {
    width: "100%",
    border: "none",
    borderBottom: "1px solid var(--ink)",
    background: "transparent",
    fontFamily: "var(--font-body)",
    fontSize: 14,
    fontWeight: 400,
    fontVariationSettings: "'opsz' 16",
    color: "var(--ink)",
    paddingBottom: 6,
    paddingTop: 4,
    transition: "border-color 0.15s ease",
  };

  const labelStyle: React.CSSProperties = {
    fontFamily: "var(--font-mono)",
    fontSize: 8,
    letterSpacing: "0.18em",
    textTransform: "uppercase",
    color: "var(--red)",
    marginBottom: 4,
    display: "block",
  };

  const handleFocus = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    e.currentTarget.style.borderBottomColor = "var(--red)";
  };
  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    e.currentTarget.style.borderBottomColor = "var(--ink)";
  };

  return (
    <>
      {/* Header */}
      <div
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 9,
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          color: "var(--ink)",
          marginBottom: 24,
          paddingBottom: 14,
          borderBottom: "1px solid var(--divider)",
        }}
      >
        TO: SAHIL SHAIKH
      </div>

      {/* Honeypot — hidden from humans; bots that fill it are silently dropped */}
      <input
        type="text"
        name="company"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        value={company}
        onChange={(e) => setCompany(e.target.value)}
        style={{
          position: "absolute",
          left: "-9999px",
          width: 1,
          height: 1,
          opacity: 0,
          pointerEvents: "none",
        }}
      />

      {/* Name */}
      <div style={{ marginBottom: 22 }}>
        <label htmlFor="contact-name" style={labelStyle}>NAME</label>
        <input
          id="contact-name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="your name"
          onFocus={handleFocus}
          onBlur={handleBlur}
          style={inputBase}
        />
      </div>

      {/* Handle / email */}
      <div style={{ marginBottom: 22 }}>
        <label htmlFor="contact-handle" style={labelStyle}>HANDLE OR EMAIL</label>
        <input
          id="contact-handle"
          type="text"
          value={handle}
          onChange={(e) => setHandle(e.target.value)}
          placeholder="where to write back"
          onFocus={handleFocus}
          onBlur={handleBlur}
          style={inputBase}
        />
      </div>

      {/* Message */}
      <div style={{ marginBottom: 28 }}>
        <label htmlFor="contact-message" style={labelStyle}>MESSAGE</label>
        <textarea
          id="contact-message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="what's on your mind"
          rows={4}
          onFocus={handleFocus}
          onBlur={handleBlur}
          style={{
            ...inputBase,
            resize: "none",
            lineHeight: 1.65,
          }}
        />
      </div>

      {/* Bottom row */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div>
          {messageTooShort && (
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 8,
                color: "var(--muted)",
                letterSpacing: "0.1em",
              }}
            >
              a bit more, please
            </span>
          )}
          {error && (
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 8,
                color: "var(--red)",
                letterSpacing: "0.1em",
              }}
            >
              {error}
            </span>
          )}
        </div>

        <button
          onClick={handleSubmit}
          disabled={!isValid || sending}
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 10,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            background: "var(--red)",
            color: "#fff",
            border: "none",
            padding: "8px 14px",
            cursor: isValid && !sending ? "pointer" : "not-allowed",
            opacity: isValid && !sending ? 1 : 0.4,
            transition: "opacity 0.15s ease",
          }}
        >
          {sending ? "SENDING..." : "SEND →"}
        </button>
      </div>
    </>
  );
}
