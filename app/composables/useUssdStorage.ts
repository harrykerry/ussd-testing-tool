import type {
  UssdConfig,
  UssdLog,
  UssdSession,
} from "~/interfaces/ussd.interface";

const STORAGE_KEY = "ussd-emulator-session";

interface UssdStorage {
  config: UssdConfig;
  session: UssdSession | null;
  logs: UssdLog[];
}

export const useUssdStorage = () => {
  const save = (
    config: UssdConfig,
    session: UssdSession | null,
    logs: UssdLog[],
  ) => {
    if (!import.meta.client) {
      return;
    }

    const data: UssdStorage = {
      config,
      session,
      logs,
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  };

  const load = (): UssdStorage | null => {
    if (!import.meta.client) {
      return null;
    }

    const stored = localStorage.getItem(STORAGE_KEY);

    if (!stored) {
      return null;
    }

    try {
      return JSON.parse(stored) as UssdStorage;
    } catch {
      localStorage.removeItem(STORAGE_KEY);

      return null;
    }
  };

  const clear = () => {
    if (!import.meta.client) {
      return;
    }

    localStorage.removeItem(STORAGE_KEY);
  };

  return {
    save,
    load,
    clear,
  };
};
