import type { UssdResponse } from "~/interfaces/ussd.interface";

const GSM_03_38_CHARACTERS =
  "@£$¥èéùìòÇØøÅå∆_ΦΓΛΩΠΨΣΘΞÆæßÉ !\"#¤%&'()*+,-./0123456789:;<=>?" +
  "¡ABCDEFGHIJKLMNOPQRSTUVWXYZÄÖÑÜ§¿" +
  "abcdefghijklmnopqrstuvwxyzäöñüà" +
  "^{}\\[~]|€";

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

export function validateUssdResponse(
  text: string,
  maxLength = 160,
): string | null {
  if (!text.trim()) {
    return "USSD response cannot be empty.";
  }

  if (text.length > maxLength) {
    return `USSD response exceeds the maximum length of ${maxLength} characters.`;
  }

  for (const character of text) {
    const codePoint = character.codePointAt(0);

    if (
      character !== "\n" &&
      character !== "\r" &&
      !GSM_03_38_CHARACTERS.includes(character)
    ) {
      return `USSD response contains an unsupported character: ${JSON.stringify(
        character,
      )} (U+${codePoint?.toString(16).toUpperCase().padStart(4, "0")}).`;
    }
  }
  return null;
}

export function validateUssdResponseHeaders(headers: Headers): string | null {
  const contentType = headers.get("content-type");

  if (!contentType) {
    return "USSD response is missing the Content-Type header.";
  }

  if (!contentType.toLowerCase().startsWith("text/plain")) {
    return "Invalid USSD response Content-Type. Expected text/plain.";
  }

  return null;
}
