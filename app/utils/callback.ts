export const isLocalCallbackUrl = (callbackUrl: string): boolean => {
  try {
    const url = new URL(callbackUrl);

    return (
      url.hostname === "localhost" ||
      url.hostname === "127.0.0.1" ||
      url.hostname === "::1"
    );
  } catch {
    return false;
  }
};
