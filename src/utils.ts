import type { RawMatcherFn } from "@vitest/expect";
import { camelCase, upperFirst } from "lodash-es";
import { STATUS_MAP } from "./constants";
import Cookie, { CookieSerializeOptions } from "cookie";

export function getStatusMatcherName(name: string) {
  return ["toHaveStatus", upperFirst(name)].join("");
}

export function createStatusMatchers() {
  const matchers: [string, RawMatcherFn][] = Object.entries(STATUS_MAP).map(
    ([statusName, expected]) => {
      const name = getStatusMatcherName(statusName);

      const matcher = function (received: Response) {
        return {
          pass: received.status === expected,
          message: () =>
            `Expected status code to be ${expected}, but received ${received.status}.`,
        };
      };

      return [name, matcher];
    }
  );

  return Object.fromEntries(matchers);
}

interface Cookie {
  value: string;
  Domain?: string;
  HttpOnly?: true;
  "Max-Age"?: string;
  Partitioned?: true;
  Path?: string;
  Secure?: true;
  SameSite?: "Strict" | "Lax" | "None";
  Expires?: string;
}

export function getCookiesFromResponse(response: Response) {
  return response.headers.getSetCookie().reduce(
    (cookies, cookieStr) => {
      const [cookie, ...attrs] = cookieStr.split(";");
      const [name, value] = cookie.split("=");

      cookies[name] = {
        value,
        ...attrs.reduce(
          (o, str) => {
            const [key, value = true] = str.trim().split("=");
            o[key] = value;
            return o;
          },
          {} as Record<string, string | boolean>
        ),
      };

      return cookies;
    },
    {} as Record<string, Cookie>
  );
}

type CookieToSerialize = CookieSerializeOptions & { value: string };

export function addCookiesToResponse(
  response: Response,
  cookies: Record<string, CookieToSerialize>
): Response {
  Object.entries(cookies).forEach(([name, cookie]) => {
    const { value } = cookie;

    const options: CookieSerializeOptions = Object.fromEntries(
      Object.entries(cookie).map(([key, value]) => {
        const parsedKey = camelCase(key);
        return [parsedKey, value];
      })
    );

    response.headers.append(
      "Set-Cookie",
      Cookie.serialize(name, value, options)
    );
  });

  return response;
}

// JSON Utils
let jsonResponseCache: unknown = undefined;

export async function getJsonResponse(response: Response) {
  if (jsonResponseCache === undefined) {
    jsonResponseCache = await response.json();
  }

  return jsonResponseCache;
}

export function clearCurrentJsonResponse() {
  jsonResponseCache = undefined;
}
