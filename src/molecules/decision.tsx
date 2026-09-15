import { StatusMark } from "@/atoms/status-mark";
import { Button } from "@/atoms/button";
import { cn } from "@/common/utils";
import type { Decision, DecisionStatus, Person } from "@/common/types";
import { formatDecisionDate } from "@/common/decisions";

export function PeopleMetadata({ people: makers }: { people: Person[] }) {
  return (
    <ul className="people-list" aria-label="Decision makers">
      {makers.map((person) => (
        <li key={person.id}>
          <span className="person-initials" aria-hidden="true">
            {person.initials}
          </span>
          <span>{person.name}</span>
        </li>
      ))}
    </ul>
  );
}

export function DecisionRecord({
  decision,
  animatedStatus = false,
  actions,
  compact = false,
  replacement,
  previous,
  onOpenRelated,
}: {
  decision: Decision;
  animatedStatus?: boolean;
  actions?: React.ReactNode;
  compact?: boolean;
  replacement?: Decision;
  previous?: Decision;
  onOpenRelated?: (decision: Decision) => void;
}) {
  return (
    <article
      id={compact ? undefined : decision.id}
      tabIndex={compact ? undefined : -1}
      aria-labelledby={`title-${decision.id}`}
      className={cn("decision-record", compact && "decision-record-compact")}
    >
      <header className="record-kicker">
        <span>
          #{decision.number} / {decision.category ?? "Project"}
        </span>
        <StatusMark status={decision.status} animate={animatedStatus} />
      </header>
      <div className="record-lede">
        <h2 id={`title-${decision.id}`}>{decision.title}</h2>
        {decision.description && decision.description !== decision.title ? (
          <p>{decision.description}</p>
        ) : null}
      </div>
      <section className="record-rationale" aria-labelledby={`why-${decision.id}`}>
        <h3 id={`why-${decision.id}`}>Why we decided this</h3>
        <p>{decision.rationale}</p>
      </section>
      {replacement || previous ? (
        <div className="replacement-link">
          {[
            [replacement, "Superseded by"],
            [previous, "Supersedes"],
          ].map(([record, label]) => {
            const related = record as Decision | undefined;
            return related ? (
              <a
                key={related.id}
                href={`#${related.id}`}
                onClick={(event) => {
                  if (onOpenRelated) {
                    event.preventDefault();
                    onOpenRelated(related);
                  }
                }}
              >
                {label as string} #{related.number}
              </a>
            ) : null;
          })}
        </div>
      ) : decision.supersededById ? (
        <p className="replacement-link">Replacement deleted from this session.</p>
      ) : null}
      <footer className="record-footer">
        {decision.decisionMakers.length > 0 ? (
          <div>
            <h3>Decided by</h3>
            <PeopleMetadata people={decision.decisionMakers} />
          </div>
        ) : null}
        <div>
          <h3>Decided</h3>
          <time dateTime={decision.date}>{formatDecisionDate(decision.date)}</time>
        </div>
      </footer>
      {actions ? <div className="record-actions">{actions}</div> : null}
    </article>
  );
}

export function DecisionRow({
  decision,
  selected = false,
  onSelect,
  presentation = false,
}: {
  decision: Decision;
  selected?: boolean;
  onSelect?: (trigger: HTMLButtonElement) => void;
  presentation?: boolean;
}) {
  const content = (
    <>
      <div className="row-status">
        <StatusMark status={decision.status} />
      </div>
      <div className="row-copy">
        <h3>{decision.title}</h3>
        <p>{decision.description || decision.rationale}</p>
      </div>
      <div className="row-meta">
        <span>{decision.category ?? "—"}</span>
        <time dateTime={decision.date}>{formatDecisionDate(decision.date, true)}</time>
        <span>{decision.decisionMakers.map((person) => person.initials).join(" · ")}</span>
      </div>
      <span className="row-arrow" aria-hidden="true">
        →
      </span>
    </>
  );

  if (presentation) return <div className="decision-row is-selected">{content}</div>;
  return (
    <button
      type="button"
      id={`row-${decision.id}`}
      className={cn("decision-row", selected && "is-selected")}
      onClick={(event) => onSelect?.(event.currentTarget)}
      aria-pressed={selected}
      aria-label={`Open decision: ${decision.title}`}
    >
      {content}
    </button>
  );
}
