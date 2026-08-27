import type {
  UssdConfig,
  UssdLog,
  UssdRequest,
} from "~/interfaces/ussd.interface";

export interface UssdGateway {
  id: string;
  name: string;
  description: string;

  sendRequest(
    config: UssdConfig,
    request: UssdRequest,
  ): Promise<{
    response: Response;
    requestUrl: string;
  }>;
}