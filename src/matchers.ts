import type { MatchersObject } from "@vitest/expect";
import { createStatusMatchers } from "./utils";
import Cookie from "cookie";

export const responseMatchers: MatchersObject = {
  toHaveCookie(received: Response, name: string, expected?: string) {
    const cookies = Cookie.parse(received.headers.getSetCookie().join(""));

    const pass = !expected ? name in cookies : cookies[name] === expected;

    return {
      pass,
      message: () =>
        !expected
          ? `Cookie "${name}" not found`
          : `Expected cookie "${name}" to have value ${expected}, but received ${cookies[name]}`,
    };
  },

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
};
