export const useClientCookie = () => {
  function getAll() {
    if (typeof document !== "undefined") {
      return document.cookie.split("; ").reduce((acc: any, cookie) => {
        const [key, value] = cookie.split("=");
        acc[key] = decodeURIComponent(value);
        return acc;
      }, {});
    }
  }

  function get(name: string) {
    if (typeof document !== "undefined") {
      const cookies = document.cookie.split("; ");

      for (const cookie of cookies) {
        const [key, value] = cookie.split("=");
        if (key === name) {
          return decodeURIComponent(value);
        }
      }
      return null;
    }
  }

  function set(name: string, value: any, days = 7, path = "/") {
    if (typeof document !== "undefined") {
      const expires = new Date();
      expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
      const expiresStr = `expires=${expires.toUTCString()}`;
      document.cookie = `${name}=${encodeURIComponent(
        value
      )}; ${expiresStr}; path=${path}`;
    }
  }

  function remove(name: string, path = "/") {
    if (typeof document !== "undefined") {
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=${path}`;
    }
  }

  function removeAll() {
    if (typeof document !== "undefined") {
      const cookies = document.cookie.split("; ");

      for (const cookie of cookies) {
        const [name] = cookie.split("=");
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
      }
    }
  }

  return { getAll, get, set, remove, removeAll };
};
