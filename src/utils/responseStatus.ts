import type { RawMatcherFn } from "@vitest/expect";

import { upperFirst } from "lodash-es";
import { STATUS_MAP } from "../constants";

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
