import { createFileRoute } from "@tanstack/react-router";
import { LandingPage } from "@/pages/home";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Decision Log — Preserve the Why" },
      {
        name: "description",
        content: "A durable record of what your team decided, why, when, and with whom.",
      },
      { property: "og:title", content: "Decision Log — Preserve the Why" },
      { property: "og:description", content: "Stop reopening decisions you’ve already made." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: LandingPage,
});
