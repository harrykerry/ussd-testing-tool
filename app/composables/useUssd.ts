import type {
  UssdConfig,
  UssdLog,
  UssdRequest,
  UssdResponse,
  UssdSession,
} from "~/interfaces/ussd.interface";

import {
  buildUssdText,
  generateSessionId,
  parseUssdResponse,
} from "~/utils/ussd";

export const useUssd = () => {
  const { save, load, clear } = useUssdStorage();

  const config = useState<UssdConfig>("ussd-config", () => ({
    callbackUrl: "",
    serviceCode: "*123#",
    phoneNumber: "254700000000",
    method: "POST",
    headers: {},
  }));

  const session = useState<UssdSession | null>("ussd-session", () => null);

  const logs = useState<UssdLog[]>("ussd-logs", () => []);

  const loading = useState<boolean>("ussd-loading", () => false);

  const error = useState<string | null>("ussd-error", () => null);

  const persist = () => {
    save(session.value, logs.value);
  };

  const startSession = async () => {
    clear();

    session.value = {
      sessionId: generateSessionId(),
      serviceCode: config.value.serviceCode,
      phoneNumber: config.value.phoneNumber,
      inputHistory: [],
      response: "",
      status: "active",
      startedAt: new Date().toISOString(),
    };

    logs.value = [];

    error.value = null;

    persist();

    await sendRequest("");
  };

  const sendInput = async (input: string) => {
    if (!session.value || session.value.status !== "active") {
      return;
    }

    const value = input.trim();

    if (!value) {
      return;
    }

    session.value.inputHistory.push(value);

    const text = buildUssdText(session.value.inputHistory);

    persist();

    await sendRequest(text);
  };

  const sendRequest = async (text: string) => {
    if (!session.value) {
      return;
    }

    if (!config.value.callbackUrl) {
      error.value = "Callback URL is required.";
      return;
    }

    const request: UssdRequest = {
      sessionId: session.value.sessionId,
      serviceCode: session.value.serviceCode,
      phoneNumber: session.value.phoneNumber,
      text,
    };

    const log: UssdLog = {
      id: crypto.randomUUID(),
      timestamp: new Date().toISOString(),
      request: {
        url: config.value.callbackUrl,
        method: config.value.method,
        headers: config.value.headers,
        body: request,
      },
    };

    const startedAt = performance.now();

    loading.value = true;
    error.value = null;

    try {
      let response: Response;

      if (config.value.method === "GET") {
        const url = new URL(config.value.callbackUrl);

        url.searchParams.set("sessionId", request.sessionId);

        url.searchParams.set("serviceCode", request.serviceCode);

        url.searchParams.set("phoneNumber", request.phoneNumber);

        url.searchParams.set("text", request.text);

        response = await fetch(url.toString(), {
          method: "GET",
          headers: config.value.headers,
        });

        log.request.url = url.toString();
      } else {
        response = await fetch(config.value.callbackUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...config.value.headers,
          },
          body: JSON.stringify(request),
        });
      }

      const responseBody = await response.text();

      log.duration = Math.round(performance.now() - startedAt);

      log.response = {
        status: response.status,
        headers: Object.fromEntries(response.headers.entries()),
        body: responseBody,
      };

      logs.value.push(log);

      if (!response.ok) {
        throw new Error(`Callback returned HTTP ${response.status}`);
      }

      const ussdResponse: UssdResponse = parseUssdResponse(responseBody);

      session.value.response = ussdResponse.text;

      session.value.status = ussdResponse.type === "END" ? "ended" : "active";

      persist();
    } catch (err) {
      log.duration = Math.round(performance.now() - startedAt);

      if (!logs.value.some((item) => item.id === log.id)) {
        logs.value.push(log);
      }

      const message =
        err instanceof Error ? err.message : "An unexpected error occurred.";

      log.error = message;

      error.value = message;

      if (session.value) {
        session.value.status = "error";
      }

      persist();
    } finally {
      loading.value = false;
    }
  };

  const restoreSession = () => {
    const stored = load();

    if (!stored) {
      return;
    }

    session.value = stored.session;
    logs.value = stored.logs;
  };

  const resetSession = () => {
    clear();

    session.value = null;
    logs.value = [];
    error.value = null;
    loading.value = false;
  };

  onMounted(() => {
    restoreSession();
  });

  return {
    config,
    session,
    logs,
    loading,
    error,

    startSession,
    sendInput,
    resetSession,
  };
};
