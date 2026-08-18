import {
  acceptAllConsent,
  deserializeConsent,
  rejectOptionalConsent,
  shouldShowCookieBanner,
} from "@/lib/consent";

describe("cookie consent logic", () => {
  it("shows the banner when consent is missing", () => {
    expect(shouldShowCookieBanner(null)).toBe(true);
  });

  it("hides the banner for stored consent", () => {
    expect(shouldShowCookieBanner(acceptAllConsent())).toBe(false);
    expect(shouldShowCookieBanner(rejectOptionalConsent())).toBe(false);
  });

  it("rejects malformed consent values", () => {
    expect(deserializeConsent("invalid-json")).toBeNull();
    expect(deserializeConsent(JSON.stringify({ foo: "bar" }))).toBeNull();
  });
});
