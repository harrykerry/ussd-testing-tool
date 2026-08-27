import type {
  UssdConfig,
  UssdRequest,
} from "~/interfaces/ussd.interface";

export const africasTalkingGateway = async (
  config: UssdConfig,
  request: UssdRequest,
) => {
  const body = new URLSearchParams();

  body.set("sessionId", request.sessionId);
  body.set("phoneNumber", request.phoneNumber);
  body.set("networkCode", config.networkCode ?? "");
  body.set("serviceCode", request.serviceCode);
  body.set("text", request.text);

  const headers = {
    "Content-Type": "application/x-www-form-urlencoded",
    ...config.headers,
  };

  const response = await fetch(config.callbackUrl, {
    method: "POST",
    headers,
    body: body.toString(),
  });


  return {
    response,
    requestUrl: config.callbackUrl,
    requestMethod: "POST" as const,
    requestHeaders: headers,
    requestBody: body.toString(),
  };
};