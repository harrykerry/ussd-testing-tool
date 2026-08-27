import type { UssdConfig, UssdRequest } from "~/interfaces/ussd.interface";

export const advantaGateway = async (
  config: UssdConfig,
  request: UssdRequest,
) => {
  const params = {
    SESSIONID: request.sessionId,
    USSDCODE: request.serviceCode,
    MSISDN: request.phoneNumber,
    INPUT: request.text,
  };

  if (config.method === "GET") {
    const url = new URL(config.callbackUrl);

    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.set(key, value);
    });

    const response = await fetch(url.toString(), {
      method: "GET",
      headers: config.headers,
    });

    return {
      response,
      requestUrl: url.toString(),
      requestMethod: "GET" as const,
      requestHeaders: config.headers,
      requestBody: undefined,
    };
  }

  const headers = {
    "Content-Type": "application/json",
    ...config.headers,
  };

  const response = await fetch(config.callbackUrl, {
    method: "POST",
    headers,
    body: JSON.stringify(params),
  });

  return {
    response,
    requestUrl: config.callbackUrl,
    requestMethod: "POST" as const,
    requestHeaders: headers,
    requestBody: params,
  };
};
