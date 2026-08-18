import { render, screen } from "@testing-library/react";
import { LanguageSwitcher } from "@/components/language-switcher";
import { switchLocalePathname } from "@/lib/i18n";

describe("language switching", () => {
  it("rewrites localized paths", () => {
    expect(switchLocalePathname("/sv/privacy", "en")).toBe("/en/privacy");
    expect(switchLocalePathname("/en", "sv")).toBe("/sv");
  });

  it("renders links for both locales", () => {
    render(<LanguageSwitcher currentLocale="sv" currentPath="/sv/privacy" />);

    expect(screen.getByRole("link", { name: "SV" })).toHaveAttribute("href", "/sv/privacy");
    expect(screen.getByRole("link", { name: "EN" })).toHaveAttribute("href", "/en/privacy");
  });
});
