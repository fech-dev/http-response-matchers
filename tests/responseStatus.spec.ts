import { STATUS_MAP } from "../src/constants";
import { getStatusMatcherName } from "../src/utils";
import { getRandomElement } from "./utils";

const statusCodes = Object.values(STATUS_MAP);

describe("toHaveStatus", () => {
  it("should pass when status code matches", () => {
    const mockResponse = { status: 200 };
    expect(mockResponse).toHaveStatus(200);
  });

  it("should fail when status code does not match", () => {
    const mockResponse = { status: 404 };
    expect(() => {
      expect(mockResponse).toHaveStatus(200);
    }).toThrow("Expected status code to be 200, but received 404.");
  });
});

describe("toBeSuccessful", () => {
  it("should pass when status code is in the 2xx range", () => {
    const mockResponse = { status: 201 };
    expect(mockResponse).toBeSuccessful();
  });

  it("should fail when status code is not in the 2xx range", () => {
    const mockResponse = { status: 404 };
    expect(() => {
      expect(mockResponse).toBeSuccessful();
    }).toThrow("Expected a successful status code (2xx), but received 404.");
  });
});

describe("toBeServerError", () => {
  it("should pass when status code is in the 5xx range", () => {
    const mockResponse = { status: 500 };
    expect(mockResponse).toBeServerError();
  });

  it("should fail when status code is not in the 5xx range", () => {
    const mockResponse = { status: 404 };
    expect(() => {
      expect(mockResponse).toBeServerError();
    }).toThrow("Expected a server error status code (5xx), but received 404.");
  });
});

Object.entries(STATUS_MAP).forEach(([statusName, status]) => {
  const matcherKey = getStatusMatcherName(statusName);

  describe(matcherKey, () => {
    it(`should pass when status code is ${status}`, () => {
      const mockResponse = { status };
      //@ts-ignore
      expect(mockResponse)[matcherKey]();
    });

    it(`should fail when status code is not ${status}`, () => {
      const wrongStatus = getRandomElement(
        statusCodes.filter((s) => s !== status)
      );
      const mockResponse = { status: wrongStatus };

      expect(() => {
        //@ts-ignore
        expect(mockResponse)[matcherKey]();
      }).toThrow(
        `Expected status code to be ${status}, but received ${wrongStatus}.`
      );
    });
  });
});
