/**
 * Shared Contact Pre-fill Utility
 *
 * Allows Lab CTA and Estimator Summary to pass structured project scope
 * and budget selections directly into the Contact form upon explicit user action.
 * Does not persist stale data on page refresh to ensure the form remains fresh.
 */

export interface ContactPrefillData {
  scopeText: string;
  budgetBand?: string;
  source: "lab" | "estimator";
}

const EVENT_NAME = "aethrix:contact_prefill";

export function prefillContactForm(data: ContactPrefillData) {
  if (typeof window === "undefined") return;

  // Clear any legacy storage key from earlier sessions
  try {
    sessionStorage.removeItem("aethrix_contact_prefill_data");
    sessionStorage.removeItem("aethrix_consultation_prefill");
  } catch {
    // Ignore
  }

  // Dispatch custom event for immediate live update in Contact component
  window.dispatchEvent(new CustomEvent(EVENT_NAME, { detail: data }));

  // Smooth scroll to contact anchor
  const contactEl = document.getElementById("contact");
  if (contactEl) {
    contactEl.scrollIntoView({ behavior: "smooth" });
  } else {
    window.location.hash = "contact";
  }
}

export function subscribeContactPrefill(callback: (data: ContactPrefillData) => void): () => void {
  if (typeof window === "undefined") return () => {};

  const handler = (e: Event) => {
    const customEvent = e as CustomEvent<ContactPrefillData>;
    if (customEvent.detail) {
      callback(customEvent.detail);
    }
  };

  window.addEventListener(EVENT_NAME, handler);
  return () => window.removeEventListener(EVENT_NAME, handler);
}
