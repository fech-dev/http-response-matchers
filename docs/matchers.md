# Matchers

[[toc]]

## Cookies

### `toHaveCookie(name: string, expected?: string)`

Check if the response contains a cookie with the specified `name`. If an `expected` value is provided, it will also verify that the cookie has the expected value.

```typescript
describe("User Profile Settings", () => {
  let response: Response;

  beforeEach(async () => {
    response = await fetch("/api/profile/settings");
  });

  test('check if "language_preference" cookie is present', () => {
    expect(response).toHaveCookie("language_preference");
  });

  test('check if "language_preference" cookie has value en-US', () => {
    expect(response).toHaveCookie("language_preference", "en-US");
  });
});
```

---

### `toHaveCookieExpired(name: string)`

Check if the cookie with the specified `name` is expired.

```typescript
test('check if "expired-cookie" cookie is expired', async () => {
  const response = await fetch("/api/examples/expired-cookie");

  expect(response).toHaveCookieExpired("expired-cookie");
});
```

## Headers

### `toHaveHeader(name: string, expected?: string)`

Check if the response has a header with the specified `name`. If an `expected` value is provided, it also verifies that the header matches the expected value.

```typescript
test('should have the "Content-Type" header', async () => {
  const response = await fetch("/api/users");
  expect(response).toHaveHeader("Content-Type");
});

test('should have the "Content-Type" header with value "application/json"', async () => {
  const response = await fetch("/api/users");
  expect(response).toHaveHeader("Content-Type", "application/json");
});
```

## Status

### `toHaveStatus(expected: number)`

Check if the response has the expected status code.

```typescript
describe("GET /users", () => {
  test("should have status code 200", async () => {
    const response = await fetch("/api/users");
    expect(response).toHaveStatus(200);
  });
});
```

### `toBeSuccessful()`

Check if the response has a successful status code (2xx).

```typescript
describe("PATCH /users/:id", () => {
  test("should be successful", async () => {
    const response = await fetch("/api/users/1", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: "updated@email.com",
      }),
    });

    expect(response).toBeSuccessful();
  });
});
```

### `toBeServerError()`

Check if the response has a server error status code (5xx).

```typescript
describe("DELETE /users/:id", () => {
  test("should be a server error status if request fails", async () => {
    const response = await fetch("/api/users/1", { method: "DELETE" });

    expect(response).toBeServerError();
  });
});
```

### `toHaveStatusOk()`

Check if the response has status code 200.

```typescript
test("should have status code 200", async () => {
  const response = await fetch("/api/users");
  expect(response).toHaveStatusOk();
});
```

### toHaveStatusCreated()

Check if the response has the status code 201 (Created).

```typescript
test("should have status code 201", async () => {
  const response = await fetch("/api/users", { method: "POST" });
  expect(response).toHaveStatusCreated();
});
```

### toHaveStatusAccepted()

Check if the response has the status code 202

```typescript
test("should have status code 202", async () => {
  const response = await fetch("/api/reports/daily");
  expect(response).toHaveStatusAccepted();
});
```

### toHaveStatusNoContent()

Check if the response has the status code 204

```typescript
describe("DELETE /users/:id", () => {
  test("should have status code 204", async () => {
    const response = await fetch("/api/users/1");
    expect(response).toHaveStatusNoContent();
  });
});
```

### toHaveStatusMovedPermanently()

Check if the response has the status code 301

```typescript
test("should have status code 301", async () => {
  const response = await fetch("/moved-url");
  expect(response).toHaveStatusMovedPermanently();
});
```

### toHaveStatusFound()

Check if the response has the status code 302

```typescript
test("should have status code 302", async () => {
  const response = await fetch("/api/profile");
  expect(response).toHaveStatusFound();
});
```

### toHaveStatusBadRequest()

Check if the response has the status code 400

```typescript
test("should have status code 400", async () => {
  const response = await fetch("/api/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: "invalid_email.com",
      password: "",
    }),
  });

  expect(response).toHaveStatusBadRequest();
});
```

### toHaveStatusUnauthorized()

Check if the response has the status code 401

```typescript
test("should have status code 401", async () => {
  const response = await fetch("/api/reports/daily");
  expect(response).toHaveStatusUnauthorized();
});
```

### toHaveStatusPaymentRequired()

Check if the response has the status code 402

```typescript
test("should have status code 402", async () => {
  const response = await fetch("/api/orders/:id/payment", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      //...invalid cart data
    }),
  });

  expect(response).toHaveStatusPaymentRequired();
});
```

### toHaveStatusForbidden()

Check if the response has the status code 403

```typescript
const response = await fetch("/api/admin/users");
expect(response).toHaveStatusForbidden();
```

### toHaveStatusNotFound()

Check if the response has the status code 404

```typescript
test("should have status code 404", async () => {
  const response = await fetch("/api/users/213");
  expect(response).toHaveStatusNotFound();
});
```

### toHaveStatusMethodNotAllowed()

Check if the response has the status code 405

```typescript
test("should have status code 405", async () => {
  const response = await fetch("/api/user/2", { method: "DELETE" });
  expect(response).toHaveStatusMethodNotAllowed();
});
```

### toHaveStatusRequestTimeout()

Check if the response has the status code 408

```typescript
test("should have status code 408", async () => {
  const response = await fetch("/api/reports/yearly");
  expect(response).toHaveStatusRequestTimeout();
});
```

### toHaveStatusConflict()

Check if the response has the status code 409

```typescript
test("should have status code 409", async () => {
  const response = await fetch("/api/tasks", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      taskId: 1,
      data: {...}
    }),
  });

  expect(response).toHaveStatusConflict();
});
```

### toHaveStatusGone()

Check if the response has the status code 410

```typescript
test("should have status code 410", async () => {
  const response = await fetch("/api/reports/yearly?year=1996");
  expect(response).toHaveStatusGone();
});
```

### toHaveStatusUnsupportedMediaType()

Check if the response has the status code 415

```typescript
test("should have status code 415", async () => {
  const response = await fetch("/api/posts/1/comments", {
    method: "POST",
    // missing Content-Type header
    // @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/415#examples
    body: JSON.stringify({
      comment: "...",
    }),
  });

  expect(response).toHaveStatusUnsupportedMediaType();
});
```

### toHaveStatusUnprocessable()

Check if the response has the status code 422

```typescript
test("should have status code 422", async () => {
  const response = await fetch("/api/users", {
    method: "POST",
    headers: {
      "Content-Type": 'application/json"
    },
    body: JSON.stringify({
      email: "invalid_email",
      password: "invalid_pass"
    })
  });

  expect(response).toHaveStatusUnprocessable();
});
```

### toHaveStatusTooManyRequests()

Check if the response has the status code 429

```typescript
test("should have status code 429", async () => {
  let response: Response;

  for (let i = 0; i < 100; i++) {
    response = await fetch("/api/some-endpoint");
  }

  expect(response).toHaveStatusTooManyRequests();
});
```

### toHaveStatusInternalServerError()

Check if the response has the status code 500

```typescript
test("should have status code 500", async () => {
  const response = await fetch("/api/reports/daily");
  expect(response).toHaveStatusInternalServerError();
});
```

### toHaveStatusServiceUnavailable()

Check if the response has the status code 503

```typescript
test("should have status code 503", async () => {
  const response = await fetch("/api/reports/monthly");
  expect(response).toHaveStatusServiceUnavailable();
});
```

## JSON

### `toBeJson()`

Check if the response is valid JSON.

```typescript
test("check if response is valid JSON", async () => {
  const response = await fetch("/api/reports/daily");
  await expect(response).toBeJson();
});
```

### `toHaveJson(expected: object | Array<any>)`

Check if the response JSON matches the expected object or array.

```typescript
test("check if response JSON matches expected object", async () => {
  const response = await fetch("/api/users/1");

  await expect(response).toHaveJson({
    id: 1,
    name: "Jon",
    surname: "Doe",
    email: "jon.doe@email.com",
  });
});
```

### `toBeJsonObject()`

Check if the response JSON is an object.

```typescript
test("check if response JSON is an object", async () => {
  const response = await fetch("/api/users/1");
  await expect(response).toBeJsonObject();
});
```

### `toHaveJsonPath(path: string, expected?: any)`

Check if the JSON response contains the specified path, and optionally check if it matches the expected value.

```typescript
test('check if response JSON contains path "id"', async () => {
  const response = await fetch("/api/users/2");
  await expect(response).toHaveJsonPath("id");
});

test('check if response JSON path "id" has value 1', async () => {
  const response = await fetch("/api/users/2");
  await expect(response).toHaveJsonPath("id", 1);
});

test('check if response JSON path "role.name" has value Admin', async () => {
  const response = await fetch("/api/users/2");
  await expect(response).toHaveJsonPath("role.name", "Admin");
});
```

### `toBeJsonArray()`

Check if the response JSON is an array.

```typescript
test("check if response JSON is an array", async () => {
  const response = await fetch("/api/users");
  await expect(response).toBeJsonArray();
});
```

### `toHaveJsonLength(expected: number, path?: string)`

Check if the JSON response (or a specific array at a given path) has the expected length.

```typescript
test("check if response JSON array has length 3", async () => {
  const response = await fetch("/api/users");
  expect(response).toHaveJsonLength(10);
});

test('check if JSON path "role.permissions" has length 20', async () => {
  const response = await fetch("/api/users/1");
  expect(response).toHaveJsonLength(20, "role.permissions");
});
```

### `toHaveJsonStructure(structure: JsonStructureSchema)`

Check if the JSON response has the given structure

#### Structure

The `structure` param can be defined as a yaml string or an array.

#### One level structure

::: code-group

```typescript [Array syntax]
await expect(response).toHaveJsonStructure(["id", "name", "surname", "email"]);
```

```typescript [Yaml syntax]
await expect(response).toHaveJsonStructure(`
  - id
  - name
  - surname
  - email
`);
```

:::

These examples expect that the JSON response object has: id, name, surname and email properties.

```json
{
  "id": 1
  "name": "Jon"
  "surname": "Doe"
  "email": "jon.doe@email.com"
}
```

If any of those properties are missing, the test will fail.

:::tip
For simple object structures is advised to use the array syntax since the yaml parsing will be skipped and tests will run more faster.
:::

#### Defining deep structures

Given this JSON object:

```json
{
  "id": 1
  "name": "Jon"
  "surname": "Doe"
  "email": "jon.doe@email.com",
  "role": {
    "id": 1,
    "name": "Admin",
    "permissions": [
      { "id": 1, "name": "list.users"},
      { "id": 2, "name": "create.users"},
      { "id": 3, "name": "delete.users"}
    ]
  }
}
```

We can define the structure like this:

::: code-group

```typescript [Array syntax]
await expect(response).toHaveJsonStructure([
  "id",
  "name",
  "surname",
  "email",
  ["role", [
    "id", 
    "name", 
    ["permissions*", [
        "id", 
        "name"
      ]]
  ]],
]);
```

```typescript [Yaml syntax]
await expect(response).toHaveJsonStructure(`
  - id
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
```

:::

In the Array Syntax, we define an array where the first element is the name of the nested object and the second element is another array that describes its structure.

Since `Array syntax` can be less readable, especially when using very complex object structures, you can use `Yaml syntax`.

Each nested object is define by a yaml object with a property (the name of the nested object) and as value an array representing the nested object structure.


#### Arrays structures

As shown in the previous section, the json path `role.permissions` is an array of objects. 
To describe this structure, you have to add the symbol `*` as suffix in the array key. 

This ensures that each object in the array matches the given structure.