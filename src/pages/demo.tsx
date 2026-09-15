import { useEffect, useRef, useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/atoms/button";
import { Filters, type StatusFilter } from "@/atoms/filters";
import { Dialog } from "@/molecules/ui/dialog";
import { DecisionRecord, DecisionRow } from "@/molecules/decision";
import { DecisionForm, type FormValues } from "@/molecules/decision-form";
import { RecordActions } from "@/molecules/record-actions";
import { BrandMark } from "@/atoms/brand-logo";
import { people, seedDecisions } from "@/constants/decisions";
import type { Decision } from "@/common/types";

export function DemoApp() {
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => setHydrated(true), []);
  const [decisions, setDecisions] = useState(seedDecisions);
  const [filter, setFilter] = useState<StatusFilter>("all");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [form, setForm] = useState<{ replacing?: Decision } | null>(null);
  const [notice, setNotice] = useState("");
  const nextNumber = useRef(Math.max(...seedDecisions.map((decision) => decision.number)) + 1);
  const newButton = useRef<HTMLButtonElement>(null);
  const formTrigger = useRef<HTMLButtonElement | null>(null);

  const visible = decisions
    .filter((decision) => filter === "all" || decision.status === filter)
    .sort((a, b) => b.date.localeCompare(a.date) || b.number - a.number);

  const selected = visible.find((item) => item.id === selectedId) ?? visible[0] ?? null;
  const replacement = selected
    ? decisions.find((item) => item.id === selected.supersededById)
    : undefined;
  const previous = selected
    ? decisions.find((item) => item.supersededById === selected.id)
    : undefined;

  function focusRecord(id: string) {
    requestAnimationFrame(() => {
      const record = document.getElementById(id);
      record?.focus({ preventScroll: true });
      record?.scrollIntoView({ block: "nearest", behavior: "instant" });
    });
  }

  function openRelated(decision: Decision) {
    if (filter !== "all" && filter !== decision.status) setFilter("all");
    setSelectedId(decision.id);
    setMobileOpen(true);
    focusRecord(decision.id);
  }

  function save(values: FormValues) {
    const number = nextNumber.current++;
    const decision: Decision = {
      id: `decision-${number}`,
      number,
      title: values.title.trim(),
      description: values.description.trim(),
      rationale: values.rationale.trim(),
      date: values.date,
      status: "active",
      decisionMakers: people.filter((person) => values.decisionMakerIds.includes(person.id)),
      tags: Array.from(
        new Set(
          values.tags
            .split(",")
            .map((tag) => tag.trim())
            .filter(Boolean),
        ),
      ),
      category: "Project",
    };
    setDecisions((current) => [
      decision,
      ...current.map((item) =>
        item.id === form?.replacing?.id
          ? { ...item, status: "superseded" as const, supersededById: decision.id }
          : item,
      ),
    ]);
    setSelectedId(decision.id);
    setMobileOpen(true);
    focusRecord(decision.id);
    setNotice(
      form?.replacing
        ? `Decision #${number} saved. Decision #${form.replacing.number} is now superseded.`
        : `Decision #${number} saved.${filter !== "all" && filter !== decision.status ? " Hidden by the current filter." : ""}`,
    );
    setForm(null);
  }

  function deleteDecision(decision: Decision) {
    const remaining = visible.filter((item) => item.id !== decision.id);
    setDecisions((current) => current.filter((item) => item.id !== decision.id));
    setNotice(`Decision #${decision.number} deleted.`);
    const next = remaining[0];
    if (next) {
      setSelectedId(next.id);
      focusRecord(next.id);
    } else {
      setSelectedId(null);
      setMobileOpen(false);
      requestAnimationFrame(() => newButton.current?.focus());
    }
  }

  return (
    <div className="demo-shell">
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        {notice}
      </div>
      <header className="demo-header">
        <div className="demo-brand-cluster">
          <a
            href={import.meta.env.BASE_URL}
            className="final-brand wordmark"
            aria-label="Decision Log home"
          >
            <BrandMark variant="lineage" />
            <strong>
              <span className="brand-name-primary">Decision</span>{" "}
              <span className="brand-name-secondary">Log</span>
            </strong>
          </a>
          <span className="demo-badge">
            <span className="demo-badge-dot" aria-hidden="true" />
            Demo sandbox
          </span>
        </div>
        <nav className="demo-nav" aria-label="Demo navigation">
          <a href={import.meta.env.BASE_URL} className="demo-nav-link">
            ← Overview
          </a>
          <span className="demo-session-badge" title="Changes last until you refresh">
            In-memory session
          </span>
        </nav>
      </header>
      <Dialog
        open={Boolean(form)}
        onOpenChange={(open) => {
          if (!open) setForm(null);
        }}
      >
        {form ? (
          <DecisionForm
            onSave={save}
            replacing={form.replacing}
            onCloseAutoFocus={(event) => {
              event.preventDefault();
              const trigger = formTrigger.current;
              if (trigger?.isConnected) trigger.focus();
              else if (form.replacing) focusRecord(form.replacing.id);
              else newButton.current?.focus();
            }}
          />
        ) : null}
      </Dialog>
      <main id="main-content" className="demo-main">
        <section className="demo-intro">
          <p className="eyebrow">Project memory / {String(decisions.length).padStart(2, "0")}</p>
          <h1>Decisions</h1>
          <p>A record of the choices shaping this project.</p>
        </section>
        <div className="demo-controls">
          <Filters disabled={!hydrated} value={filter} onChange={setFilter} />
          <Button
            ref={newButton}
            disabled={!hydrated}
            className="button-new-decision group"
            onClick={(event) => {
              formTrigger.current = event.currentTarget;
              setForm({});
            }}
          >
            <Plus className="button-icon" aria-hidden="true" />
            <span>New decision</span>
          </Button>
        </div>
        <div className="demo-grid">
          <section className="decision-index" aria-label="Decision list">
            {visible.length ? (
              <>
                {visible.map((decision) => (
                  <DecisionRow
                    key={decision.id}
                    decision={decision}
                    selected={selected?.id === decision.id}
                    onSelect={(trigger) => {
                      formTrigger.current = trigger;
                      setSelectedId(decision.id);
                      setMobileOpen(true);
                    }}
                  />
                ))}
                <div className="decision-index-footer" role="status">
                  <span>
                    {visible.length} {visible.length === 1 ? "record" : "records"} in view
                  </span>
                  <span>End of ledger</span>
                </div>
              </>
            ) : (
              <div className="empty-state" role="status">
                {decisions.length ? (
                  <p>No {filter} decisions.</p>
                ) : (
                  <>
                    <p>No decisions recorded yet.</p>
                    <p>Add the first one.</p>
                  </>
                )}
              </div>
            )}
          </section>
          <section className="desktop-detail" aria-label="Decision detail">
            {selected ? (
              <DecisionRecord
                key={selected.id}
                decision={selected}
                {...(replacement ? { replacement } : {})}
                {...(previous ? { previous } : {})}
                onOpenRelated={openRelated}
                actions={
                  <RecordActions
                    disabled={!hydrated}
                    status={selected.status}
                    onDelete={() => deleteDecision(selected)}
                    onSupersede={(trigger) => {
                      formTrigger.current = trigger;
                      setForm({ replacing: selected });
                    }}
                  />
                }
              />
            ) : (
              <div className="empty-state" role="status">
                <p>Select a decision to view its details.</p>
              </div>
            )}
          </section>
        </div>
        {mobileOpen && selected ? (
          <div className="mobile-detail" aria-label="Decision detail">
            <Button variant="ghost" className="back-button" onClick={() => setMobileOpen(false)}>
              ← All decisions
            </Button>
            <DecisionRecord
              decision={selected}
              {...(replacement ? { replacement } : {})}
              {...(previous ? { previous } : {})}
              onOpenRelated={openRelated}
              actions={
                <RecordActions
                  disabled={!hydrated}
                  status={selected.status}
                  onDelete={() => {
                    deleteDecision(selected);
                    setMobileOpen(false);
                  }}
                  onSupersede={(trigger) => {
                    formTrigger.current = trigger;
                    setForm({ replacing: selected });
                  }}
                />
              }
            />
          </div>
        ) : null}
      </main>
      <footer className="demo-footer">
        <div className="demo-footer-inner demo-footer-minimal">
          <p className="demo-footer-note">Built for teams that change their minds carefully.</p>
        </div>
      </footer>
    </div>
  );
}
