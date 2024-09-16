import type { MatchersObject } from "@vitest/expect";
import { differenceInMilliseconds } from "date-fns";
import { get, has, isArray, isObject } from "lodash-es";
import {
  clearCurrentJsonResponse,
  createStatusMatchers,
  getCookiesFromResponse,
  getJsonResponse,
} from "./utils";

export type ExpectedJson = object | Array<ExpectedJson>;

afterEach(clearCurrentJsonResponse);

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
    let pass: boolean;

    try {
      await getJsonResponse(received);
      pass = true;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      pass = false;
    }

    return {
      pass,
      message: () => `Invalid JSON response received`,
    };
  },

  async toHaveJson(received: Response, expected: ExpectedJson) {
    const toBeJsonMatch = await responseMatchers.toBeJson.bind(this)(
      received,
      undefined
    );

    if (!toBeJsonMatch.pass) {
      return toBeJsonMatch;
    }

    const actual = await getJsonResponse(received);

    return {
      pass: this.equals(actual, expected),
      message: () => "Expected JSON not matches actual JSON",
      actual,
      expected,
    };
  },

  async toBeJsonObject(received: Response) {
    const toBeJsonMatch = await responseMatchers.toBeJson.bind(this)(
      received,
      undefined
    );

    if (!toBeJsonMatch.pass) {
      return toBeJsonMatch;
    }

    const content = JSON.stringify(await getJsonResponse(received));

    return {
      pass: !!content && content.startsWith("{") && content.endsWith("}"),
      message: () => "Response content is not a JSON object",
    };
  },

  async toHaveJsonPath(received: Response, path: string, expected?: unknown) {
    const data = await getJsonResponse(received);
    const hasPath = has(data, path);

    if (!hasPath || expected === undefined) {
      return {
        pass: hasPath,
        message: () => `Expected path "${path}" not found`,
      };
    }

    const value = get(data, path);

    return {
      pass: value === expected,
      message: () =>
        `Expected path "${path}" to have value ${expected}, but ${value} received`,
      actual: value,
      expected,
    };
  },

  async toBeJsonArray(received: Response) {
    const toBeJsonMatch = await responseMatchers.toBeJson.bind(this)(
      received,
      undefined
    );

    if (!toBeJsonMatch.pass) {
      return toBeJsonMatch;
    }

    const content = JSON.stringify(await getJsonResponse(received));

    return {
      pass: !!content && content.startsWith("[") && content.endsWith("]"),
      message: () => "Response content is not a JSON array",
    };
  },

  async toHaveJsonLength(received: Response, expected: number, path?: string) {
    const data = await getJsonResponse(received);
    const isDataObject = isObject(data);
    const isDataArray = isArray(data);

    if (!isDataObject && !isDataArray) {
      return {
        pass: false,
        message: () => `Invalid JSON object or array`,
      };
    }

    let target = data;
    let actual = isDataArray ? data.length : 0;

    if (path) {
      const haveJsonPathMatch = await responseMatchers.toHaveJsonPath.bind(
        this
      )(received, path);

      if (!haveJsonPathMatch.pass) {
        return haveJsonPathMatch;
      }

      target = get(data, path);

      if (!isArray(target)) {
        return {
          pass: false,
          message: () => `Target value is not an Array`,
        };
      }

      actual = target.length;
    }

    return {
      pass: actual === expected,
      message: () =>
        `Expected json to have length "${expected}", but "${actual}" received`,
      actual,
      expected,
    };
  },
};
