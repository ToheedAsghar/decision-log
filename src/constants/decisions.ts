import type { Decision, Person } from "@/common/types";

export const people: Person[] = [
  { id: "maya", name: "Maya Chen", initials: "MC" },
  { id: "jordan", name: "Jordan Lee", initials: "JL" },
  { id: "alex", name: "Alex Rivera", initials: "AR" },
  { id: "sam", name: "Sam Kim", initials: "SK" },
];

const byId = (id: string): Person => {
  const person = people.find((candidate) => candidate.id === id);
  if (!person) throw new Error(`Unknown person: ${id}`);
  return person;
};

export const seedDecisions: Decision[] = [
  {
    id: "release-tuesday",
    number: 5,
    title: "Move releases from Friday to Tuesday",
    description:
      "Production releases will happen on Tuesday mornings instead of Friday afternoons, starting with the next release cycle.",
    rationale:
      "Friday releases repeatedly left the team with too little time to investigate production issues before the weekend. Tuesday gives us several working days to respond.",
    decisionMakers: [byId("maya"), byId("jordan")],
    tags: ["release", "operations"],
    category: "Operations",
    status: "active",
    date: "2026-09-08",
  },
  {
    id: "guided-import",
    number: 4,
    title: "Replace blank onboarding with a guided import",
    description:
      "New workspaces now begin with a guided import rather than an empty project screen.",
    rationale:
      "Customers understood the product faster when they could bring in one existing decision during setup. The imported record also gives the archive useful context from the first session.",
    decisionMakers: [byId("maya"), byId("sam")],
    tags: ["onboarding", "product"],
    category: "Product",
    status: "active",
    date: "2026-09-04",
  },
  {
    id: "design-tokens",
    number: 3,
    title: "Use semantic tokens for interface colour",
    description: "Interface colours are defined by purpose instead of component-specific values.",
    rationale:
      "Shared semantic names keep states consistent across the product and make future contrast or theme changes possible without rewriting individual screens.",
    decisionMakers: [byId("sam"), byId("jordan")],
    tags: ["design system", "accessibility"],
    category: "Design",
    status: "active",
    date: "2026-08-28",
  },
  {
    id: "support-email",
    number: 1,
    title: "Route support requests through shared email",
    description: "Customer questions were originally handled through a shared support inbox.",
    rationale:
      "A shared inbox was the fastest way to give the whole team visibility while request volume was still low. As volume grew, ownership and response history became difficult to follow.",
    decisionMakers: [byId("jordan"), byId("maya")],
    tags: ["support", "email"],
    category: "Customer support",
    status: "superseded",
    supersededById: "support-queue",
    date: "2026-07-14",
  },
  {
    id: "support-queue",
    number: 2,
    title: "Track support requests in a shared queue",
    description: "Every customer request now receives an owner and visible resolution state.",
    rationale:
      "The shared inbox no longer made responsibility clear. A lightweight queue preserves the speed of email while making ownership, handoffs, and response history visible.",
    decisionMakers: [byId("jordan"), byId("alex")],
    tags: ["support", "workflow"],
    category: "Customer support",
    status: "active",
    date: "2026-08-19",
  },
];
