import { expect, test } from "@playwright/test";

test("homepage loads, switches language, stores cookie consent, and submits contact form", async ({
  page,
}) => {
  await page.route("**/api/contact", async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({ ok: true }),
    });
  });

  await page.goto("/");

  await expect(page).toHaveURL(/\/sv$/);
  await expect(
    page.getByRole("heading", {
      name: "Automatisera kärnprocesser med AI utan att exportera data utanför EU.",
    }),
  ).toBeVisible();

  await expect(page.getByLabel("Cookiebanner")).toBeVisible();
  await page.getByRole("button", { name: "Acceptera alla" }).click();
  await expect(page.getByLabel("Cookiebanner")).toBeHidden();

  await page.getByRole("link", { name: "EN" }).click();
  await expect(page).toHaveURL(/\/en$/);
  await expect(
    page.getByRole("heading", {
      name: "Automate core processes with AI without exporting data outside the EU.",
    }),
  ).toBeVisible();

  await page.getByLabel("Name").fill("Alex Example");
  await page.getByLabel("Company").fill("Hiristic");
  await page.getByLabel("Email").fill("alex@example.com");
  await page
    .getByLabel("What would you like to automate?")
    .fill("We want to automate invoice processing and internal support workflows.");
  await page.getByRole("button", { name: "Send request" }).click();

  await expect(page.getByText("Thank you! We will get back to you shortly.")).toBeVisible();
});
