import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

// Test the public behavior, including the historical records, without reaching into React state.
test.beforeEach(async ({ page }) => {
  await page.goto("demo/");
});

test("opens with five readable records and both sides of the history", async ({ page }) => {
  await expect(page.getByRole("button", { name: "All", exact: true })).toHaveAttribute(
    "aria-pressed",
    "true",
  );
  const records = page.locator(".decision-index .decision-row");
  await expect(records).toHaveCount(5);
  await expect(page.locator(".desktop-detail .record-rationale")).toBeVisible();
  const dates = await records
    .locator("time")
    .evaluateAll((nodes) => nodes.map((node) => node.getAttribute("datetime")));
  expect(dates).toEqual([...dates].sort().reverse());
  await page.getByRole("button", { name: "Active", exact: true }).click();
  await expect(records).toHaveCount(4);
  await page.getByRole("button", { name: "Superseded", exact: true }).click();
  await expect(records).toHaveCount(1);
  await expect(page.getByRole("link", { name: /Superseded by #/ })).toBeVisible();
  await page.getByRole("link", { name: /Superseded by #/ }).click();
  await expect(page.locator("article:focus")).toContainText("Supersedes #");
});

test("landing CTA reaches the demo route", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("link", { name: "Try demo", exact: true }).first().click();
  await expect(page).toHaveURL(/\/demo\/?$/);
  await expect(page.getByRole("heading", { name: "Decisions" })).toBeVisible();
});

test("starts a fresh form with today's local date and understandable validation", async ({
  page,
}) => {
  await page.clock.setFixedTime(new Date("2026-09-14T20:30:00Z"));
  await page.getByRole("button", { name: "New decision" }).click();
  const today = await page.evaluate(() => {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
  });
  await expect(page.getByLabel("Date", { exact: true })).toHaveValue(today);
  await page.getByRole("button", { name: "Save decision" }).click();
  await expect(page.getByRole("alert").first()).toBeVisible();
  await expect(page.getByLabel("Title", { exact: true })).toBeFocused();
  await page.getByLabel("Title", { exact: true }).fill("An abandoned draft");
  await page.keyboard.press("Escape");
  await expect(page.getByRole("button", { name: "New decision" })).toBeFocused();
  await page.getByRole("button", { name: "New decision" }).click();
  await expect(page.getByLabel("Title", { exact: true })).toHaveValue("");
});

test("superseding preserves reasoning and links the replacement in both directions", async ({
  page,
}) => {
  const detail = page.locator(".desktop-detail article");
  const oldText = await detail.locator(".record-rationale p").innerText();
  await page.getByRole("button", { name: "Supersede decision", exact: true }).click();
  await page.getByLabel("Title", { exact: true }).fill("Release on Wednesday after the review");
  await page
    .getByLabel("Description", { exact: true })
    .fill("Move the release window after the review is complete.");
  await page
    .getByRole("textbox", { name: "Why we decided this", exact: true })
    .fill("The Tuesday review catches release issues before customers see them.");
  await page.getByLabel("Tags", { exact: true }).fill("release, review");
  await page.getByRole("checkbox", { name: "Maya Chen", exact: true }).check();
  await page.getByRole("button", { name: "Save replacement" }).click();
  const records = page.locator(".decision-index .decision-row");
  await expect(records).toHaveCount(6);
  await expect(page.getByRole("link", { name: "Supersedes #5", exact: true })).toBeVisible();
  await page.getByRole("link", { name: "Supersedes #5", exact: true }).click();
  await expect(page.locator("article:focus")).toContainText(oldText);
  await expect(
    page.locator("article:focus").getByRole("link", { name: "Superseded by #6" }),
  ).toBeVisible();
});

test("new decisions start active and can only be superseded through the replacement workflow", async ({
  page,
}) => {
  await page.getByRole("button", { name: "New decision" }).click();
  await expect(page.getByLabel("Status", { exact: true })).toHaveCount(0);
  await page.getByLabel("Title", { exact: true }).fill("Document the deployment window");
  await page
    .getByLabel("Description", { exact: true })
    .fill("Make the planned deployment window clear to the team.");
  await page
    .getByRole("textbox", { name: "Why we decided this", exact: true })
    .fill("This lets the team plan support coverage.");
  await page.getByLabel("Tags", { exact: true }).fill("deployment, operations");
  await page.getByRole("checkbox", { name: "Jordan Lee", exact: true }).check();
  await page.getByRole("button", { name: "Save decision" }).click();
  await expect(
    page.getByText("Document the deployment window", { exact: true }).first(),
  ).toBeVisible();
  await expect(page.locator(".desktop-detail .people-list")).toContainText("Jordan Lee");
  await expect(page.locator(".desktop-detail .record-tags")).toContainText("deployment");
  await expect(page.getByRole("button", { name: "Active", exact: true })).toHaveAttribute(
    "aria-pressed",
    "false",
  );
});

test("supports the narrow mobile flow, long text, and archive confirmation", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 760 });
  await page.getByRole("button", { name: "New decision" }).click();
  await page
    .getByLabel("Title", { exact: true })
    .fill("A decision with a deliberately long title for a narrow screen");
  await page
    .getByLabel("Description", { exact: true })
    .fill("A description that remains clear even with a narrow presentation.");
  await page
    .getByRole("textbox", { name: "Why we decided this", exact: true })
    .fill(
      "A long rationale confirms that lengthy content remains usable in the creation dialog and detail view on a narrow screen.",
    );
  await page.getByLabel("Tags", { exact: true }).fill("mobile, testing");
  await page.getByRole("checkbox", { name: "Sam Kim", exact: true }).check();
  await page.getByRole("button", { name: "Save decision" }).click();
  await expect(page.getByRole("button", { name: "All decisions" })).toBeVisible();
  await expect(
    page
      .getByRole("article", { name: /A decision with a deliberately long title/i })
      .getByRole("heading", { name: /A decision with a deliberately long title/i }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Archive decision" }).click();
  await expect(page.getByRole("heading", { name: "Archive this decision?" })).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("button", { name: "Archive decision" })).toBeFocused();
});

test("carousel controls are reachable and work with the keyboard", async ({ page }) => {
  await page.goto("/");
  const carousel = page.getByRole("group", { name: "Choose a decision" });
  const firstControl = carousel.getByRole("button").first();
  await firstControl.focus();
  await expect(firstControl).toBeFocused();
  await page.keyboard.press("Space");
  await expect(firstControl).toHaveAttribute("aria-pressed", "true");
});

test("shows a plain message when all decisions are archived (empty state)", async ({ page }) => {
  while ((await page.locator(".decision-index .decision-row").count()) > 0) {
    await page.getByRole("button", { name: "Archive decision", exact: true }).click();
    await page
      .getByRole("alertdialog")
      .getByRole("button", { name: "Archive decision", exact: true })
      .click();
  }
  await expect(page.getByRole("heading", { name: "No decisions in the log yet" })).toBeVisible();
  await expect(
    page.getByText(
      'Start by recording your team’s first decision using the "New decision" button above.',
    ),
  ).toBeVisible();
  await page.getByRole("button", { name: "New decision" }).click();
  await page.getByLabel("Title", { exact: true }).fill("First decision after empty state");
  await page
    .getByLabel("Description", { exact: true })
    .fill("Record the first decision after an empty archive.");
  await page
    .getByRole("textbox", { name: "Why we decided this", exact: true })
    .fill("Ensuring the system functions cleanly from scratch.");
  await page.getByLabel("Tags", { exact: true }).fill("setup");
  await page.getByRole("checkbox", { name: "Alex Rivera", exact: true }).check();
  await page.getByRole("button", { name: "Save decision" }).click();
  await expect(page.getByText("First decision after empty state").first()).toBeVisible();
});

test("has no automatically detectable accessibility violations on public routes", async ({
  page,
}) => {
  for (const path of ["/", "/demo/"]) {
    await page.goto(path);
    const results = await new AxeBuilder({ page }).analyze();
    expect(results.violations).toEqual([]);
  }
});
