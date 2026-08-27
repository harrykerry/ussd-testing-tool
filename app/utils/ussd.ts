import type { UssdResponse } from "~/interfaces/ussd.interface";

export function generateSessionId(): string {
  const timestamp = Date.now().toString();
  const random = Math.floor(1000 + Math.random() * 9000).toString();

  return `${timestamp}${random}`;
}

export function buildUssdText(inputHistory: string[]): string {
  return inputHistory.join("*");
}

export function parseUssdResponse(raw: string): UssdResponse {
  const response = raw.trim();

  if (response.startsWith("CON ")) {
    return {
      type: "CON",
      text: response.substring(4),
      raw: response,
    };
  }

  if (response.startsWith("END ")) {
    return {
      type: "END",
      text: response.substring(4),
      raw: response,
    };
  }

  throw new Error(
    "Invalid USSD response. Expected response to start with CON or END.",
  );
}
