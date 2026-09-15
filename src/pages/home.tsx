import { useRef, useState } from "react";
import { ArrowRight, Check, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/atoms/button";
import { StatusMark } from "@/atoms/status-mark";
import { BrandMark } from "@/atoms/brand-logo";
import { ProductPreview } from "@/molecules/product-preview";
import { seedDecisions } from "@/constants/decisions";
import { formatDecisionDate } from "@/common/decisions";
import type { Decision } from "@/common/types";

const demoHref = `${import.meta.env.BASE_URL}demo/`;

export function LandingPage() {
  const examples = seedDecisions.filter((decision) => decision.status === "active").slice(0, 3);
  const oldDecision = seedDecisions.find((decision) => decision.id === "support-email");
  const newDecision = seedDecisions.find((decision) => decision.id === "support-queue");
  if (!oldDecision || !newDecision || examples.length < 3) return null;

  return (
    <main className="final-landing">
      <header className="final-nav final-width">
        <a href={import.meta.env.BASE_URL} className="final-brand" aria-label="Decision Log home">
          <BrandMark />
          <strong>
            <span className="brand-name-primary">Decision</span>{" "}
            <span className="brand-name-secondary">Log</span>
          </strong>
        </a>
        <nav aria-label="Main navigation">
          <a href="#why">Why</a>
          <a href="#system">How it works</a>
          <a href="#archive">Example</a>
        </nav>
        <a className="final-button final-button-small" href={demoHref}>
          Try demo <ArrowRight aria-hidden="true" />
        </a>
      </header>

      <section className="final-hero final-width" aria-labelledby="hero-title">
        <p className="final-kicker">A searchable memory for your project</p>
        <h1 id="hero-title">One place for every decision your team has made.</h1>
        <p>
          Find what was decided, why it changed, and who was involved—without searching through old
          meetings and message threads.
        </p>
        <div className="final-hero-actions">
          <a className="final-button" href={demoHref}>
            Open interactive demo <ArrowRight aria-hidden="true" />
          </a>
          <a className="final-hero-secondary" href="#why">
            Why it matters ↓
          </a>
        </div>
        <DecisionCarousel decisions={examples} />
      </section>

      <section className="final-intro final-width" id="why">
        <p>
          The answers to your team’s daily questions are scattered across documents, tickets, and
          messages. Decision Log keeps the final answer and its reasoning together.
        </p>
      </section>

      <section className="final-system final-width" id="system" aria-labelledby="system-title">
        <header>
          <p className="final-kicker">The system</p>
          <h2 id="system-title">
            Clarity compounds when every decision follows the same simple structure.
          </h2>
        </header>
        <div className="final-principles">
          {[
            [
              "01",
              "One current answer",
              "Know which decision applies now, without interpreting a trail of half-finished conversations.",
            ],
            [
              "02",
              "The reasoning stays",
              "Keep the context that made a choice sensible, even after the project moves in a new direction.",
            ],
            [
              "03",
              "Change without erasing",
              "Link every superseded record to its replacement so the history remains useful and honest.",
            ],
          ].map(([number, title, copy]) => (
            <article key={number}>
              <span>{number}</span>
              <Check aria-hidden="true" />
              <h3>{title}</h3>
              <p>{copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="final-change" aria-labelledby="change-title">
        <div className="final-width final-change-grid">
          <div className="final-change-copy">
            <p className="final-kicker">A decision can change</p>
            <h2 id="change-title">Keep the old answer. Make the current one unmistakable.</h2>
            <p>
              Superseding preserves yesterday’s reasoning while pointing everyone to the decision
              that applies today.
            </p>
          </div>
          <div className="final-trail" aria-label="A superseded decision linked to its replacement">
            <article className="final-trail-old">
              <header>
                <span>Decision #{oldDecision.number}</span>
                <StatusMark status="superseded" />
              </header>
              <h3>{oldDecision.title}</h3>
              <p>{oldDecision.rationale}</p>
              <footer>
                <span>{oldDecision.category}</span>
                <span>{formatDecisionDate(oldDecision.date)}</span>
                <span>
                  {oldDecision.decisionMakers.map((person) => person.initials).join(" · ")}
                </span>
              </footer>
            </article>
            <div className="final-trail-link" aria-hidden="true">
              <span>Superseded by #{newDecision.number}</span>
              <ArrowRight />
            </div>
            <article className="final-trail-current">
              <header>
                <span>Decision #{newDecision.number}</span>
                <StatusMark status="active" />
              </header>
              <h3>{newDecision.title}</h3>
              <p>{newDecision.rationale}</p>
              <footer>
                <span>{newDecision.category}</span>
                <span>{formatDecisionDate(newDecision.date)}</span>
                <span>
                  {newDecision.decisionMakers.map((person) => person.initials).join(" · ")}
                </span>
              </footer>
            </article>
          </div>
        </div>
      </section>

      <section className="final-product final-width" id="archive" aria-labelledby="archive-title">
        <header>
          <div>
            <p className="final-kicker">The working archive</p>
            <h2 id="archive-title">A complete history, ready when the question returns.</h2>
          </div>
          <p>
            Create, filter, open, and supersede decisions. The full demo works without a signup.
          </p>
        </header>
        <div className="final-demo-frame">
          <ProductPreview />
        </div>
      </section>

      <section className="final-closing">
        <div className="final-width">
          <p>Keep the answer close.</p>
          <h2>Stop reopening decisions you’ve already made.</h2>
          <a className="final-button final-button-light" href={demoHref}>
            Try Decision Log <ArrowRight aria-hidden="true" />
          </a>
        </div>
      </section>

      <footer className="final-footer">
        <div className="final-footer-inner final-width">
          <div className="final-footer-brand">
            <a href={import.meta.env.BASE_URL} className="final-brand">
              <BrandMark size={18} />
              <strong>
                <span className="brand-name-primary">Decision</span>{" "}
                <span className="brand-name-secondary">Log</span>
              </strong>
            </a>
            <span className="final-footer-sep" aria-hidden="true">
              ·
            </span>
            <span>Public preview</span>
          </div>
          <p className="final-footer-note">Built for teams that change their minds carefully.</p>
          <div className="final-footer-meta">
            <a href={demoHref} className="final-footer-link">
              Interactive demo →
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}

function DecisionCarousel({ decisions }: { decisions: Decision[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const dragStartX = useRef<number | null>(null);

  function goTo(index: number) {
    setActiveIndex((index + decisions.length) % decisions.length);
  }

  function offsetFor(index: number) {
    const count = decisions.length;
    let offset = (index - activeIndex) % count;
    if (offset > count / 2) offset -= count;
    if (offset < -count / 2) offset += count;
    return offset;
  }

  function handleDragEnd(clientX: number) {
    if (dragStartX.current === null) return;
    const delta = clientX - dragStartX.current;
    dragStartX.current = null;
    if (Math.abs(delta) < 32) return;
    goTo(activeIndex + (delta < 0 ? 1 : -1));
  }

  return (
    <div className="final-carousel" aria-roledescription="carousel" aria-label="Example decisions">
      <div
        className="final-fan"
        onPointerDown={(event) => {
          dragStartX.current = event.clientX;
        }}
        onPointerUp={(event) => handleDragEnd(event.clientX)}
        onPointerCancel={() => {
          dragStartX.current = null;
        }}
      >
        {decisions.map((decision, index) => {
          const offset = offsetFor(index);
          const position = offset === 0 ? "is-center" : offset < 0 ? "is-left" : "is-right";
          const card = (
            <>
              <span className="final-fan-status">
                <StatusMark status={decision.status} />
              </span>
              <span className="final-fan-title">{decision.title}</span>
              <span className="final-fan-copy">{decision.description}</span>
              <span className="final-fan-meta">
                <span>{decision.category}</span>
                <span>{formatDecisionDate(decision.date)}</span>
                <span>{decision.decisionMakers.map((person) => person.initials).join(" · ")}</span>
              </span>
              {offset === 0 && (
                <a className="final-fan-open" href={demoHref} aria-label="Open the demo">
                  <ArrowRight aria-hidden="true" />
                </a>
              )}
            </>
          );
          return offset === 0 ? (
            <article
              key={decision.id}
              className={`final-fan-card ${position}`}
              aria-label={`Decision ${index + 1} of ${decisions.length}: ${decision.title}`}
            >
              {card}
            </article>
          ) : (
            <button
              key={decision.id}
              type="button"
              className={`final-fan-card ${position}`}
              onClick={() => goTo(index)}
              aria-label={`Show decision: ${decision.title}`}
            >
              {card}
            </button>
          );
        })}
      </div>
      <div className="final-carousel-controls" aria-label="Carousel navigation">
        <div className="final-carousel-dock">
          <Button
            variant="ghost"
            size="icon"
            className="final-carousel-arrow"
            onClick={() => goTo(activeIndex - 1)}
            aria-label="Previous decision"
          >
            <ChevronLeft size={15} strokeWidth={2.2} />
          </Button>
          <span className="final-carousel-counter" aria-live="polite">
            {String(activeIndex + 1).padStart(2, "0")} / {String(decisions.length).padStart(2, "0")}
          </span>
          <div className="final-carousel-segments" role="tablist" aria-label="Choose a decision">
            {decisions.map((decision, index) => (
              <button
                key={decision.id}
                type="button"
                className={`final-carousel-segment ${activeIndex === index ? "is-active" : ""}`}
                aria-label={`Slide ${index + 1}: ${decision.title}`}
                aria-pressed={activeIndex === index}
                onClick={() => goTo(index)}
              >
                <span className="sr-only">{`Decision ${index + 1}`}</span>
              </button>
            ))}
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="final-carousel-arrow"
            onClick={() => goTo(activeIndex + 1)}
            aria-label="Next decision"
          >
            <ChevronRight size={15} strokeWidth={2.2} />
          </Button>
        </div>
      </div>
    </div>
  );
}
