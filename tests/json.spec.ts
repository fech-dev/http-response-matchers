import { faker } from "@faker-js/faker";

function createJsonResponse<T extends object | Array<unknown>>(
  body: T,
  options: ResponseInit = {}
) {
  if (!options.status) options.status = 200;
  if (!options.statusText) options.statusText = "ok";
  if (!options.headers) options.headers = {};

  options.headers = {
    ...options.headers,
    "Content-Type": "application/json",
  };

  const response = new Response(JSON.stringify(body), options);

  return response;
}

describe("JSON Objects", () => {
  const body = {
    name: faker.commerce.productName(),
    desciption: faker.commerce.productDescription(),
    price: faker.commerce.price(),
  };

  const arrayBody = new Array(5).fill(body);

  describe("toBeJson", () => {
    it("should pass if response body is a json", async () => {
      const response = createJsonResponse(body);

      await expect(response).toBeJson();
    });

    it("should fail if response body is not a json", () => {
      const response = new Response("Hello", {
        headers: { "Content-Type": "text/plain" },
      });

      expect(() => expect(response).toBeJson()).rejects.toThrow(
        "Invalid JSON response received"
      );
    });
  });

  describe("toHaveJsonBody", () => {
    it.skip("should pass if response body matches", () => {
      const response = createJsonResponse(body);

      expect(response).toHaveJsonBody({ ...body });
    });

    it.skip("should fail if response body does not match", () => {
      const response = createJsonResponse(body);

      expect(() => {
        expect(response).toHaveJsonBody({
          name: faker.person.firstName(),
          email: faker.internet.email(),
        });
      }).toThrow("TODO");
    });

    it.skip("should pass if response body matches array", () => {
      const response = createJsonResponse(arrayBody);

      expect(response).toHaveJsonBody(data);
    });

    it.skip("should fail if response body does not match the array", () => {
      const response = createJsonResponse(arrayBody);

      expect(() => {
        expect(response).toHaveJsonBody([
          {
            name: faker.person.firstName(),
            email: faker.internet.email(),
          },
        ]);
      }).toThrow("TODO");
    });
  });

  describe("toBeJsonObject", () => {
    it.todo("should pass if response body is a json object");

    it.todo("should fail if response body is not a json object");
  });

  describe("toBeJsonArray", () => {
    it.todo("should pass if response body is a json array");

    it.todo("should fail if response body is not a json array");
  });

  describe("toHaveJsonLenght", () => {
    it.skip("should pass if json array matches lenght", () => {
      const response = createJsonResponse(arrayBody);

      expect(response).toHaveJsonLength(5);
    });

    it.skip("should pass if nested json array matches lenght", () => {
      const response = createJsonResponse({
        category: {
          name: faker.commerce.department(),
          products: arrayBody,
        },
      });

      expect(response).toHaveJsonLength(5, "category.products");
    });

    it.skip("should fail if json array does not matches lenght", () => {
      const response = createJsonResponse(arrayBody);

      expect(() => {
        expect(response).toHaveJsonLength(3);
      }).toThrow("TODO");
    });

    it.skip("should fail if nested json array does not matches lenght", () => {
      const response = createJsonResponse({
        category: {
          name: faker.commerce.department(),
          products: arrayBody,
        },
      });

      expect(() => {
        expect(response).toHaveJsonLength(3, "category.products");
      }).toThrow("TODO");
    });
  });

  describe("toHaveJsonProperty", () => {
    it.todo("should pass if json response has property");

    it.todo("should pass if json response has property and matches value");

    it.todo("should fail if json response has not property");

    it.todo(
      "should fail if json response has property and does not match value"
    );
  });

  describe("toHaveJsonStructure", () => {
    it.todo("should pass if json response matches json structure");

    it.todo("should fail if json response does not match json structure");
  });
});
