import { faker } from "@faker-js/faker";
import { addCookiesToResponse } from "../src/utils";

describe("Cookie matchers", () => {
  let response: object;

  beforeEach(() => {
    response = { headers: new Headers() };

    addCookiesToResponse(response as Response, {
      testing: { value: "true" },
      username: { value: "mario.rossi.91", maxAge: 2 },
      "expired-cookie": { value: "expired", expires: faker.date.recent() },
      "access-token": { value: "abcdef", expires: faker.date.soon() },
    });
  });

  describe("toHaveCookie()", () => {
    it("should pass when cookie is found (no value given)", () => {
      expect(response).toHaveCookie("username");
    });

    it("should fail when cookie is not found (no value given)", () => {
      expect(() => {
        expect(response).toHaveCookie("email");
      }).toThrow('Cookie "email" not found');
    });

    it("should pass when cookie is found and equals expected value", () => {
      expect(response).toHaveCookie("testing", "true");
    });

    it("should fail when cookie is found but different value", () => {
      expect(() => {
        expect(response).toHaveCookie("testing", "false");
      }).toThrow(
        'Expected cookie "testing" to have value false, but received true'
      );
    });
  });

  describe("toHaveCookieExpired()", () => {
    it("should pass if cookie is expired", () => {
      expect(response).toHaveCookieExpired("expired-cookie");
    });

    it("should fail if cookie is not expired", () => {
      expect(() => {
        expect(response).toHaveCookieExpired("access-token");
      }).toThrow('Cookie "access-token" is not expired');
    });
  });
});
