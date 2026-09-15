export type DecisionStatus = "active" | "superseded";

export type Person = {
  id: string;
  name: string;
  initials: string;
};

export type Decision = {
  id: string;
  number: number;
  title: string;
  description: string;
  rationale: string;
  decisionMakers: Person[];
  date: string;
  status: DecisionStatus;
  category?: string;
  supersededById?: string | undefined;
};
