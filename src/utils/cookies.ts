import type { CookieSerializeOptions } from "cookie";

import { camelCase } from "lodash-es";
import Cookie from "cookie";

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
