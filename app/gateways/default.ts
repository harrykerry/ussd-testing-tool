import type { UssdConfig, UssdRequest } from "~/interfaces/ussd.interface";

export const defaultGateway = async (
  config: UssdConfig,
  request: UssdRequest,
) => {
  let response: Response;
  let requestUrl = config.callbackUrl;

  let requestMethod = config.method;
  let requestHeaders: Record<string, string> = config.headers;
  let requestBody: string | undefined;

  if (config.method === "GET") {
    const url = new URL(config.callbackUrl);

    url.searchParams.set("sessionId", request.sessionId);
    url.searchParams.set("serviceCode", request.serviceCode);
    url.searchParams.set("phoneNumber", request.phoneNumber);
    url.searchParams.set("text", request.text);

    requestUrl = url.toString();

    response = await fetch(requestUrl, {
      method: "GET",
      headers: config.headers,
    });
  } else {
    requestHeaders = {
      "Content-Type": "application/json",
      ...config.headers,
    };

    requestBody = JSON.stringify(request);

    response = await fetch(config.callbackUrl, {
      method: "POST",
      headers: requestHeaders,
      body: requestBody,
    });
  }

  return {
    response,
    requestUrl,
    requestMethod,
    requestHeaders,
    requestBody,
  };
};