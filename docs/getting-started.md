---
outline: deep
---

# Vitest Response Matchers

This package is a collection of vitest matchers that allows you to write expressive response tests.

## Installation

::: code-group

```bash [yarn]
yarn add -D http-response-matchers
```

```bash [pnpm]
pnpm add -D http-response-matchers
```

```bash [npm]
npm install --save-dev http-response-matchers
```

:::

Create a setup file for your tests and extend vitest with the provided matchers

::: code-group

```ts [tests/setup.ts]
//import { expect } from 'vitest' //if you are not using vitest globals
import { responseMatchers } from "vitest-response-matchers";

expect.extend(responseMatchers);
```

:::

Ensure your setup file is added to your testing config

::: code-group

```ts [vitest.config.ts]
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    //...
    setupFiles: ["tests/setup.ts"],
  },
});
```

```ts [jest.config.ts]
import type { Config } from "jest";

const config: Config = {
  //...
  setupFiles: ["tests/setup.ts"],
};

export default config;
```

:::

Then use matchers!

```ts
import { describe, it, expect } from "vitest";

describe("GET /users/:id", () => {
  it("should pass if a valid user id is given", async () => {
    const response = await fetch("/api/users/1");

    // assert response to have status 200
    await expect(response).toHaveStatusOk();

    // assert response json structure with arrays
    await expect(response).toHaveJsonStructure([
      "name",
      "surname",
      "email",
      ["role", ["id", "name", ["permissions*", ["id", "name"]]]],
    ]);

    // Or with yaml sintax
    await expect(response).toHaveJsonStructure(`
            - name
            - surname
            - email
            - role:
                - id
                - name
                - permissions*:
                    - id
                    - name
        `);
  });
});
```
