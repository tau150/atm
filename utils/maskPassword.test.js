import { maskPassword } from "./maskPassword";

describe("Utils", () => {
  it("maskPassword should return the correct value", () => {
    const result = maskPassword("testing");
    const expectedResult = "*******";

    expect(result).toBe(expectedResult);
  });
});
