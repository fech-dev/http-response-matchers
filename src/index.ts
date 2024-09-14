import type { MatchersObject } from "@vitest/expect";
import { differenceInMilliseconds } from "date-fns";
import { createStatusMatchers, getCookiesFromResponse } from "./utils";

export const responseMatchers: MatchersObject = {
  // Cookies
  toHaveCookie(received: Response, name: string, expected?: string) {
    const cookies = getCookiesFromResponse(received);

    let pass: boolean = true;
    let message: () => string = () => "";

    if (!(name in cookies)) {
      pass = false;
      message = () => `Cookie "${name}" not found`;
    }

    if (expected && cookies[name]?.value !== expected) {
      pass = false;
      message = () =>
        `Expected cookie "${name}" to have value ${expected}, but received ${cookies[name].value}`;
    }

    return {
      pass,
      message,
    };
  },

  toHaveCookieExpired(received: Response, name: string) {
    const cookies = getCookiesFromResponse(received);

    let pass: boolean = true;
    let message: () => string = () => "";

    if (!(name in cookies)) {
      pass = false;
      message = () => `Cookie "${name}" not found`;
    }

    const cookie = cookies[name];
    const hasExpires = "Expires" in cookie;

    if (hasExpires) {
      const now = new Date();
      const expireDate = new Date(cookie.Expires!);

      // if result < 0 is expired else valid
      pass = differenceInMilliseconds(expireDate, now) < 0;
      message = () => `Cookie "${name}" is not expired`;
    }

    return { pass, message };
  },

  // Headers
  toHaveHeader(received: Response, name: string, expected?: string) {
    let pass: boolean = true;
    let message: () => string = () => "";

    if (!received.headers.has(name)) {
      pass = false;
      message = () => `Header "${name}" not found`;
    }

    const value = received.headers.get(name);
    if (expected && value !== expected) {
      pass = false;
      message = () =>
        `Expected header "${name}" to have value ${expected}, but received ${value}`;
    }

    return {
      pass,
      message,
    };
  },

  // Status
  toHaveStatus(received: Response, expected: number) {
    return {
      pass: received.status === expected,
      message: () =>
        `Expected status code to be ${expected}, but received ${received.status}.`,
    };
  },

  toBeSuccessful(received: Response) {
    return {
      pass: received.status >= 200 && received.status < 300,
      message: () =>
        `Expected a successful status code (2xx), but received ${received.status}.`,
    };
  },

  toBeServerError(received: Response) {
    return {
      pass: received.status >= 500 && received.status < 600,
      message: () =>
        `Expected a server error status code (5xx), but received ${received.status}.`,
    };
  },

  ...createStatusMatchers(),

  // Json Response
  async toBeJson(received: Response) {
    let pass = true;
    let message = "";

    await received.json().catch(() => {
      pass = false;
      message = `Invalid JSON response received`;
    });

    return {
      pass,
      message: () => message,
    };
  },
};
