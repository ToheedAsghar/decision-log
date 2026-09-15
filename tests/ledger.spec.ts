import { test, expect } from "@playwright/test";

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
  await page.getByRole("link", { name: /Try demo/i }).click();
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
    .getByRole("textbox", { name: "Why we decided this", exact: true })
    .fill("The Tuesday review catches release issues before customers see them.");
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
