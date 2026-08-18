import { contactValidationMessages, validateContactForm } from "@/lib/contact";

describe("contact form validation", () => {
  it("accepts a valid payload", () => {
    const result = validateContactForm({
      company: "Hiristic",
      email: "hello@example.com",
      message: "We want to automate inbound support triage with AI.",
      name: "Alex Example",
      website: "",
    });

    expect(result.success).toBe(true);
  });

  it("rejects invalid payloads", () => {
    const result = validateContactForm({
      company: "Hiristic",
      email: "invalid-email",
      message: "Too short",
      name: "A",
      website: "bot-field",
    });

    expect(result.success).toBe(false);

    if (!result.success) {
      expect(result.errors.name).toBeTruthy();
      expect(result.errors.email).toBeTruthy();
      expect(result.errors.message).toBeTruthy();
      expect(result.errors.website).toBeTruthy();
    }
  });

  it("returns localized validation messages", () => {
    const result = validateContactForm(
      {
        company: "Hiristic",
        email: "invalid-email",
        message: "Kort",
        name: "A",
        website: "",
      },
      contactValidationMessages.sv,
    );

    expect(result.success).toBe(false);

    if (!result.success) {
      expect(result.errors.name).toBe("Ange ditt namn.");
      expect(result.errors.email).toBe("Ange en giltig e-postadress.");
      expect(result.errors.message).toBe("Beskriv ert behov med minst 20 tecken.");
    }
  });
});
