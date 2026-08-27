import type { UssdConfig, UssdRequest } from "~/interfaces/ussd.interface";

import { ENVIRONMENTS } from "~/constants/environments";
import { isLocalCallbackUrl } from "~/utils/callback";

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

  const local = isLocalCallbackUrl(config.callbackUrl);

  if (config.method === "GET") {
    const url = new URL(config.callbackUrl);

    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.set(key, value);
    });

    const response = local
      ? await fetch(url.toString(), {
          method: "GET",
          headers: config.headers,
        })
      : await fetch(ENVIRONMENTS.proxyUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            url: url.toString(),
            method: "GET",
            headers: config.headers,
          }),
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

  const response = local
    ? await fetch(config.callbackUrl, {
        method: "POST",
        headers,
        body: JSON.stringify(params),
      })
    : await fetch(ENVIRONMENTS.proxyUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          url: config.callbackUrl,
          method: "POST",
          headers,
          body: params,
        }),
      });

  return {
    response,
    requestUrl: config.callbackUrl,
    requestMethod: "POST" as const,
    requestHeaders: headers,
    requestBody: params,
  };
};
