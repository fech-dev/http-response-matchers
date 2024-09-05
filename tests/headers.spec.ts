let headers: Headers;
let response: object;

beforeEach(() => {
  headers = new Headers({
    "Content-Type": "application/json",
    Connection: "close",
  });
  response = { headers };
});

describe("toHaveHeader", () => {
  it("should pass when header is found (no value given)", () => {
    expect(response).toHaveHeader("Content-Type");
  });

  it("should fail when header is not found (no value given)", () => {
    expect(() => {
      expect(response).toHaveHeader("Accept");
    }).toThrow('Header "Accept" not found');
  });

  it("should pass when header is found and equals expected value", () => {
    expect(response).toHaveHeader("Content-Type", "application/json");
  });

  it("should fail when header is found but different value", () => {
    expect(() => {
      expect(response).toHaveHeader("Connection", "keep-alive");
    }).toThrow(
      'Expected header "Connection" to have value keep-alive, but received close'
    );
  });
});
