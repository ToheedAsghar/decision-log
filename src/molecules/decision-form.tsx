import { useRef, useState } from "react";
import { Button } from "@/atoms/button";
import { DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog";
import type { Decision, DecisionStatus } from "@/common/types";

export type FormValues = { title: string; rationale: string; date: string; status: DecisionStatus };

function initialForm(): FormValues {
  const now = new Date();
  const date = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
  return { title: "", rationale: "", date, status: "active" };
}

export function DecisionForm({
  onSave,
  replacing,
  onCloseAutoFocus,
}: {
  onSave: (values: FormValues) => void;
  replacing?: Decision | undefined;
  onCloseAutoFocus: (event: Event) => void;
}) {
  const [values, setValues] = useState(initialForm);
  const [errors, setErrors] = useState<Partial<Record<keyof FormValues, string>>>({});
  const formRef = useRef<HTMLFormElement>(null);

  function submit(event: React.FormEvent) {
    event.preventDefault();
    const next: typeof errors = {};
    if (!values.title.trim()) next.title = "Enter a decision title.";
    if (!values.rationale.trim()) next.rationale = "Explain why this decision was made.";
    if (
      !/^\d{4}-\d{2}-\d{2}$/.test(values.date) ||
      !Number.isFinite(Date.parse(values.date)) ||
      new Date(values.date).toISOString().slice(0, 10) !== values.date
    ) {
      next.date = "Choose a valid date.";
    }
    setErrors(next);
    if (Object.keys(next).length) {
      requestAnimationFrame(() =>
        formRef.current?.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus(),
      );
      return;
    }
    onSave(values);
  }

  return (
    <DialogContent className="decision-form-shell" onCloseAutoFocus={onCloseAutoFocus}>
      <DialogHeader>
        <p className="eyebrow">{replacing ? "Replacement record" : "New record"}</p>
        <DialogTitle>{replacing ? "Supersede decision" : "Record a decision"}</DialogTitle>
        <DialogDescription>
          {replacing
            ? `Record the replacement for #${replacing.number}: ${replacing.title}. Its original reasoning will remain in the log.`
            : "Capture the choice while its context is still clear."}
        </DialogDescription>
      </DialogHeader>
      <form ref={formRef} className="decision-form" onSubmit={submit} noValidate>
        <label>
          Title
          <input
            value={values.title}
            onChange={(event) => setValues({ ...values, title: event.target.value })}
            required
            aria-invalid={Boolean(errors.title)}
            aria-describedby={errors.title ? "title-error" : undefined}
          />
        </label>
        {errors.title ? (
          <p id="title-error" className="form-error" role="alert">
            {errors.title}
          </p>
        ) : null}
        <label>
          Why we decided this
          <textarea
            value={values.rationale}
            onChange={(event) => setValues({ ...values, rationale: event.target.value })}
            required
            rows={4}
            aria-invalid={Boolean(errors.rationale)}
            aria-describedby={errors.rationale ? "rationale-error" : undefined}
          />
        </label>
        {errors.rationale ? (
          <p id="rationale-error" className="form-error" role="alert">
            {errors.rationale}
          </p>
        ) : null}
        <label>
          Date
          <input
            type="date"
            value={values.date}
            onChange={(event) => setValues({ ...values, date: event.target.value })}
            required
            min="0001-01-01"
            max="9999-12-31"
            aria-invalid={Boolean(errors.date)}
            aria-describedby={errors.date ? "date-error" : undefined}
          />
        </label>
        {errors.date ? (
          <p id="date-error" className="form-error" role="alert">
            {errors.date}
          </p>
        ) : null}
        <label>
          Status
          <select
            className="form-select"
            value={replacing ? "active" : values.status}
            disabled={Boolean(replacing)}
            onChange={(event) =>
              setValues({
                ...values,
                status: event.target.value === "superseded" ? "superseded" : "active",
              })
            }
          >
            <option value="active">Active</option>
            <option value="superseded">Superseded</option>
          </select>
        </label>
        <div className="form-actions">
          <Button type="submit" className="button-primary">
            {replacing ? "Save replacement →" : "Save decision →"}
          </Button>
        </div>
      </form>
    </DialogContent>
  );
}
