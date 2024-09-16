import { faker } from "@faker-js/faker";
import { createJsonResponse } from "./utils";

const body = {
  orderId: faker.number.int(),
  user: {
    fullname: faker.person.fullName(),
    email: faker.internet.email(),
  },
  products: new Array(5)
    .fill(() => ({
      name: faker.commerce.productName(),
      desciption: faker.commerce.productDescription(),
      price: faker.commerce.price(),
    }))
    .map((factory) => factory()),
};

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

describe("toHaveJson", () => {
  it("should fail if response body is not a json", () => {
    const response = new Response("Hello", {
      headers: { "Content-Type": "text/plain" },
    });

    expect(() => expect(response).toBeJson()).rejects.toThrow(
      "Invalid JSON response received"
    );
  });

  it("should pass if response body matches", async () => {
    const response = createJsonResponse(body);

    await expect(response).toHaveJson({ ...body });
  });

  it("should fail if response body does not match", () => {
    const response = createJsonResponse(body);

    expect(() =>
      expect(response).toHaveJson({
        name: faker.person.firstName(),
        email: faker.internet.email(),
      })
    ).rejects.toThrow("Expected JSON not matches actual JSON");
  });

  it("should pass if response body matches array", () => {
    const response = createJsonResponse(body.products);

    expect(response).toHaveJson([...body.products]);
  });

  it("should fail if response body does not match the array", () => {
    const response = createJsonResponse(body.products);

    expect(() =>
      expect(response).toHaveJson([
        {
          name: faker.person.firstName(),
          email: faker.internet.email(),
        },
      ])
    ).rejects.toThrow("Expected JSON not matches actual JSON");
  });
});

describe("toBeJsonObject", () => {
  it("should pass if response body is a json object", async () => {
    const response = createJsonResponse(body);

    await expect(response).toBeJsonObject();
  });

  it("should fail if response body is not a json object", () => {
    const response = createJsonResponse("1");

    expect(() => expect(response).toBeJsonObject()).rejects.toThrow(
      "Response content is not a JSON object"
    );
  });
});

describe("toHaveJsonPath", () => {
  let response: Response;

  beforeEach(() => {
    response = createJsonResponse(body);
  });

  it("should pass if json response has the given path", async () => {
    await expect(response).toHaveJsonPath("user.fullname");
  });

  it("should pass if json response has the given path (array)", async () => {
    await expect(response).toHaveJsonPath("products.0.name");
  });

  it("should fail if json response does not have the given path", () => {
    expect(() => expect(response).toHaveJsonPath("user.age")).rejects.toThrow(
      'Expected path "user.age" not found'
    );
  });

  it("should pass if json response has the given path (array)", async () => {
    await expect(response).toHaveJsonPath("products.0.name");
  });

  it("should fail if json response does not have the given path", () => {
    expect(() => expect(response).toHaveJsonPath("user.age")).rejects.toThrow(
      'Expected path "user.age" not found'
    );
  });

  it("should fail if json response does not have the given path (array)", () => {
    expect(() =>
      expect(response).toHaveJsonPath("products.0.discount")
    ).rejects.toThrow('Expected path "products.0.discount" not found');
  });

  it("should pass if json response has the given path and matches expected value", async () => {
    await expect(response).toHaveJsonPath("user.fullname", body.user.fullname);
  });

  it("should fail if json response has the given path and does not match expected value", () => {
    expect(() =>
      expect(response).toHaveJsonPath("user.fullname", "Invalid Fullname")
    ).rejects.toThrow(
      `Expected path "user.fullname" to have value Invalid Fullname, but ${body.user.fullname} received`
    );
  });
});

describe("toBeJsonArray", () => {
  it("should pass if response body is a json array", async () => {
    const response = createJsonResponse(body.products);

    await expect(response).toBeJsonArray();
  });

  it("should fail if response body is not a json array", () => {
    const response = createJsonResponse("1");

    expect(() => expect(response).toBeJsonArray()).rejects.toThrow(
      "Response content is not a JSON array"
    );
  });
});

describe("toHaveJsonLength", () => {
  describe("root array", () => {
    let response: Response;

    beforeEach(() => {
      response = createJsonResponse(body.products);
    });

    it("should pass if json array matches length", async () => {
      await expect(response).toHaveJsonLength(5);
    });

    it("should fail if json array does not matches length", () => {
      expect(() => expect(response).toHaveJsonLength(3)).rejects.toThrow(
        'Expected json to have length "3", but "5" received'
      );
    });
  });

  describe("nested array (object response)", () => {
    let response: Response;

    beforeEach(() => {
      response = createJsonResponse({
        category: {
          name: faker.commerce.department(),
          products: body.products,
        },
      });
    });

    it("should pass if nested json array matches length", async () => {
      await expect(response).toHaveJsonLength(5, "category.products");
    });

    it("should fail if nested json array does not matches length", () => {
      expect(() =>
        expect(response).toHaveJsonLength(3, "category.products")
      ).rejects.toThrow('Expected json to have length "3", but "5" received');
    });
  });

  describe("nested array (array response)", () => {
    let response: Response;

    beforeEach(() => {
      response = createJsonResponse(
        new Array(3)
          .fill(() => ({
            name: faker.commerce.department(),
            products: body.products,
          }))
          .map((factory) => factory())
      );
    });

    it("should pass if nested json array matches length", async () => {
      await expect(response).toHaveJsonLength(5, "0.products");
    });

    it("should fail if nested json array does not matches length", () => {
      expect(() =>
        expect(response).toHaveJsonLength(3, "0.products")
      ).rejects.toThrow('Expected json to have length "3", but "5" received');
    });
  });
});

describe("toHaveJsonStructure", () => {
  it.todo("should pass if json response matches json structure");

  it.todo("should fail if json response does not match json structure");
});
