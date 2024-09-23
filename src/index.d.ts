/* eslint-disable @typescript-eslint/no-empty-object-type */
import "vitest";
import { STATUS_MAP } from "./constants";
import { ExpectedJson } from ".";
import { JsonStructureSchema } from "./utils/jsonStructure";

type StatusKey = keyof typeof STATUS_MAP;
type StatusMatcherKey = `${"toHaveStatus"}${Capitalize<StatusKey>}`;

export type CustomMatchers<R = unknown> = {
  toHaveCookie: (name: string, expected?: string) => R;
  toHaveCookieExpired: (name: string) => R;

  toHaveHeader: (name: string, expected?: string) => R;

  toHaveStatus: (expected: number) => R;
  toBeSuccessful: () => R;
  toBeServerError: () => R;

  toBeJson: () => Promise<R>;
  toHaveJson: (expected: ExpectedJson) => Promise<R>;
  toBeJsonObject: () => Promise<R>;
  toHaveJsonPath: (path: string, expected?: unknown) => Promise<R>;
  toBeJsonArray: () => Promise<R>;
  toHaveJsonLength: (expected: number, path?: string) => Promise<R>;
  toHaveJsonStructure: (structure: JsonStructureSchema) => Promise<R>;
} & Record<StatusMatcherKey, () => R>;

declare module "vitest" {
  interface Assertion<T = unknown> extends CustomMatchers<T> {}
  interface AsymmetricMatchersContaining extends CustomMatchers {}
}
