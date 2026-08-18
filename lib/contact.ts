export type ContactFormData = {
  company: string;
  email: string;
  message: string;
  name: string;
  website: string;
};

export type ContactFormErrors = Partial<Record<keyof ContactFormData, string>>;

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type ValidationMessages = {
  companyTooLong: string;
  emailInvalid: string;
  messageTooShort: string;
  nameRequired: string;
  websiteFilled: string;
};

export const contactValidationMessages = {
  en: {
    companyTooLong: "Company name is too long.",
    emailInvalid: "Please enter a valid email address.",
    messageTooShort: "Please describe your needs in at least 20 characters.",
    nameRequired: "Please enter your name.",
    websiteFilled: "Spam protection triggered.",
  },
  sv: {
    companyTooLong: "Företagsnamnet är för långt.",
    emailInvalid: "Ange en giltig e-postadress.",
    messageTooShort: "Beskriv ert behov med minst 20 tecken.",
    nameRequired: "Ange ditt namn.",
    websiteFilled: "Spam-skyddet utlöstes.",
  },
} satisfies Record<string, ValidationMessages>;

export function validateContactForm(
  input: unknown,
  messages: ValidationMessages = contactValidationMessages.en,
):
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
    errors.name = messages.nameRequired;
  }

  if (!emailPattern.test(data.email)) {
    errors.email = messages.emailInvalid;
  }

  if (data.message.length < 20) {
    errors.message = messages.messageTooShort;
  }

  if (data.company.length > 120) {
    errors.company = messages.companyTooLong;
  }

  if (data.website.length > 0) {
    errors.website = messages.websiteFilled;
  }

  if (Object.keys(errors).length > 0) {
    return { success: false, errors };
  }

  return { success: true, data };
}
