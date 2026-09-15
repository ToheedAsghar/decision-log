import { DecisionRecord, DecisionRow } from "./decision";
import { seedDecisions } from "@/constants/decisions";
import type { Decision } from "@/common/types";

const fallbackPreviewDecisions: Decision[] = [
  {
    id: "preview-1",
    number: 1,
    title: "Route support requests through shared email",
    description:
      "A shared inbox was the fastest way to give the whole team visibility while request volume was still low.",
    rationale:
      "Initial setup needed to be simple. Email kept everyone in the loop while volume was manageable.",
    decisionMakers: [{ id: "jordan", name: "Jordan Lee", initials: "JL" }],
    tags: ["support"],
    category: "Support",
    status: "active",
    date: "2026-07-14",
  },
];

export function ProductPreview() {
  const list = seedDecisions.length > 0 ? seedDecisions : fallbackPreviewDecisions;
  const first = list[0];
  if (!first) return null;
  return (
    <div className="product-preview" aria-label="Decision Log application preview">
      <div className="preview-toolbar">
        <strong>Decision Log</strong>
        <span>+ New decision</span>
      </div>
      <div className="preview-controls">
        <span>All · Active · Superseded</span>
      </div>
      <div className="preview-grid">
        <div>
          {list.slice(0, 3).map((decision) => (
            <DecisionRow key={decision.id} decision={decision} presentation />
          ))}
        </div>
        <DecisionRecord decision={first} compact />
      </div>
    </div>
  );
}
