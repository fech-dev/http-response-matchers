import "vitest";
import { STATUS_MAP } from "./constants";

type StatusKey = keyof typeof STATUS_MAP;
type StatusMatcherKey = `${"toHaveStatus"}${Capitalize<StatusKey>}`;

type CustomMatchers<R = unknown> = {
  toHaveCookie: (name: string, expected?: string) => R;
  toHaveCookieExpired: (name: string) => R;

  toHaveStatus: (expected: nummber) => R;
  toBeSuccessful: () => R;
  toBeServerError: () => R;
} & Record<StatusMatcherKey, () => R>;

declare module "vitest" {
  interface Assertion<T = any> extends CustomMatchers<T> {}
  interface AsymmetricMatchersContaining extends CustomMatchers {}
}
