# Matchers

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

Comming soon...

## JSON

Comming soon...
