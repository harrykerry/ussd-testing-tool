import type {
  UssdHttpMethod,
  UssdResponseType,
  UssdSessionStatus,
} from "~/types/ussd.type";

export interface UssdConfig {
  gateway: string;

  callbackUrl: string;

  serviceCode: string;

  phoneNumber: string;

  method: UssdHttpMethod;

  headers: Record<string, string>;

  networkCode?: string;
}

export interface UssdSession {
  sessionId: string;

  serviceCode: string;

  phoneNumber: string;

  inputHistory: string[];

  response: string;

  status: UssdSessionStatus;

  startedAt: string;
}

export interface UssdRequest {
  sessionId: string;

  serviceCode: string;

  phoneNumber: string;

  text: string;
}

export interface UssdResponse {
  type: UssdResponseType;

  text: string;

  raw: string;
}

export interface UssdLog {
  id: string;

  timestamp: string;

  duration?: number;

  request: {
    url: string;

    method: UssdHttpMethod;

    headers: Record<string, string>;

    body?: unknown;
  };

  response?: {
    status: number;

    headers: Record<string, string>;

    body: string;
  };

  error?: string;
}
