export type ContactFormData = {
  company: string;
  email: string;
  message: string;
  name: string;
  website: string;
};

export type ContactFormErrors = Partial<Record<keyof ContactFormData, string>>;

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateContactForm(input: unknown):
  | { success: true; data: ContactFormData }
  | { success: false; errors: ContactFormErrors } {
  const candidate = (input ?? {}) as Partial<Record<keyof ContactFormData, unknown>>;

  const data: ContactFormData = {
    company: typeof candidate.company === "string" ? candidate.company.trim() : "",
    email: typeof candidate.email === "string" ? candidate.email.trim() : "",
    message: typeof candidate.message === "string" ? candidate.message.trim() : "",
    name: typeof candidate.name === "string" ? candidate.name.trim() : "",
    website: typeof candidate.website === "string" ? candidate.website.trim() : "",
  };

  const errors: ContactFormErrors = {};

  if (data.name.length < 2) {
    errors.name = "Please enter your name.";
  }

  if (!emailPattern.test(data.email)) {
    errors.email = "Please enter a valid email address.";
  }

  if (data.message.length < 20) {
    errors.message = "Please describe your needs in at least 20 characters.";
  }

  if (data.company.length > 120) {
    errors.company = "Company name is too long.";
  }

  if (data.website.length > 0) {
    errors.website = "Spam protection triggered.";
  }

  if (Object.keys(errors).length > 0) {
    return { success: false, errors };
  }

  return { success: true, data };
}
