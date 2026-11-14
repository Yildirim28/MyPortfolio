import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const portfolioPath = process.env.NEXT_PUBLIC_BASE_PATH || "/";

test("renders core portfolio content and project filters", async ({ page }) => {
  await page.goto(portfolioPath);

  await expect(page.getByRole("heading", { level: 1, name: /software engineer/i })).toBeVisible();
  await expect(page.getByRole("heading", { level: 2, name: /projects across testing/i })).toBeVisible();

  const projectFilters = page.getByRole("group", { name: "Filter projects" });
  const sqaFilter = projectFilters.getByRole("button", { name: "SQA (4)", exact: true });
  await sqaFilter.click();
  await expect(sqaFilter).toHaveAttribute("aria-pressed", "true");
  await expect(page.locator('#projects [role="button"][aria-haspopup="dialog"]')).toHaveCount(4);

  await page.getByRole("button", { name: /orangehrm playwright pom automation/i }).click();
  await expect(page.getByRole("dialog", { name: /orangehrm playwright pom automation/i })).toBeVisible();
  await page.getByRole("button", { name: "Close project details" }).click();
  await expect(page.getByRole("dialog", { name: /orangehrm playwright pom automation/i })).toBeHidden();

  await expect(page.getByRole("link", { name: /view certificate/i })).toBeVisible();
});

test("mobile navigation is keyboard accessible", async ({ page, isMobile }) => {
  test.skip(!isMobile, "Mobile navigation is only rendered at mobile widths.");
  await page.goto(portfolioPath);

  const toggle = page.getByRole("button", { name: "Open navigation" });
  await toggle.focus();
  await page.keyboard.press("Enter");

  await expect(page.getByRole("dialog", { name: "Mobile navigation" })).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(toggle).toBeFocused();
});

test("resizing an open mobile menu restores page scrolling", async ({ page, isMobile }) => {
  test.skip(!isMobile, "Resize regression starts from the mobile navigation.");
  await page.goto(portfolioPath);

  await page.getByRole("button", { name: "Open navigation" }).click();
  await expect(page.getByRole("dialog", { name: "Mobile navigation" })).toBeVisible();
  await page.setViewportSize({ width: 1200, height: 800 });

  await expect(page.getByRole("dialog", { name: "Mobile navigation" })).toBeHidden();
  await expect.poll(() => page.evaluate(() => document.body.style.overflow)).not.toBe("hidden");
});

test("reduced motion disables project layout transforms", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto(portfolioPath);

  await page.getByRole("button", { name: /web \(/i }).click();
  await expect(page.locator('#projects [role="button"][aria-haspopup="dialog"]')).toHaveCount(2);
  await expect(page.locator('#projects [role="button"][aria-haspopup="dialog"]').first()).toHaveCSS(
    "transform",
    "none"
  );
});

test("has no automatically detectable accessibility violations", async ({ page }) => {
  await page.goto(portfolioPath);
  const results = await new AxeBuilder({ page }).analyze();
  expect(results.violations).toEqual([]);
});
