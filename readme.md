# HTTP Response Matchers

A vitest matchers library for validating HTTP responses using a simple and intuitive syntax.

## Installation

```bash
npm install --save-dev vitest-response-matchers
```

```bash
yarn add -D vitest-response-matchers
```

```bash
pnpm add -D vitest-response-matchers
```

Then create a setup.ts (or setup.js if using Javascript) file and extend the matchers.

```ts
import { expect } from "vitest";
import { responseMatchers } from "vitest-response-matchers";

expect.extend(responseMatchers);
```

### Example

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

```ts
import { describe, it, expect } from "vitest";

describe("POST /auth/login", () => {
  it("should fail if credentials are not provided", async () => {
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: {},
    });

    // assert response to not have status 200
    await expect(response).not.toHaveStatusOk();

    // assert response to have status 401
    await expect(response).toHaveStatusUnauthorized();
});
```

Read the [docs]() for the full list of matchers.
