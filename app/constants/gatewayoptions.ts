export const USSD_GATEWAYS = [
  {
    value: "default",
    label: "Default",
    description: "Standard HTTP USSD callback configuration.",
    method: null,
    requiresNetworkCode: false,
  },

  {
    value: "africas-talking",
    label: "Africa's Talking",
    description:
      "Uses Africa's Talking's USSD callback format with form-encoded POST requests.",
    method: "POST",
    requiresNetworkCode: true,
  },

  {
    value: "advanta",
    label: "Advanta Africa",
    description:
      "Uses Advanta's USSD callback format with GET or JSON POST requests.",
    method: null,
    requiresNetworkCode: false,
  },
] as const;