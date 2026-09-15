import type { Decision } from "./types";

export function formatDecisionDate(date: string, short = false) {
  return new Intl.DateTimeFormat("en-US", {
    month: short ? "short" : "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${date}T00:00:00Z`));
}

export function matchesDecision(decision: Decision, query: string) {
  const search = query.trim().toLocaleLowerCase();
  if (!search) return true;
  return [
    decision.title,
    decision.description,
    decision.rationale,
    decision.category ?? "",
    ...decision.decisionMakers.map((person) => person.name),
  ].some((value) => value.toLocaleLowerCase().includes(search));
}
