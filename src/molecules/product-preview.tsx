import { DecisionRecord, DecisionRow } from "./decision";
import { seedDecisions } from "@/constants/decisions";

export function ProductPreview() {
  const first = seedDecisions[0];
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
          {seedDecisions.slice(0, 3).map((decision) => (
            <DecisionRow key={decision.id} decision={decision} presentation />
          ))}
        </div>
        <DecisionRecord decision={first} compact />
      </div>
    </div>
  );
}
