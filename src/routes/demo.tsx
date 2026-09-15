import { createFileRoute } from "@tanstack/react-router";
import { DemoApp } from "@/pages/demo";

export const Route = createFileRoute("/demo")({
  head: () => ({
    meta: [
      { title: "Decision Log Demo — Browse the Record" },
      {
        name: "description",
        content: "Try the interactive Decision Log record browser with no signup required.",
      },
      { property: "og:title", content: "Decision Log Demo" },
      {
        property: "og:description",
        content: "Filter, create, and review durable project decisions.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: DemoApp,
});
