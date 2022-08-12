import { getByDocument, update, getBalance } from "./users-repo";

const fs = require("fs");

const NEW_BALANCE = 13000;

jest.mock("fs");
jest.mock("../data/db.json", () => [
  { id: 89, balance: 10000, document: 111111 },
  { id: 1233, balance: 20000, document: 2222222 },
]);

describe("Users repo utils", () => {
  it("getById should return the expected result", () => {
    const result = getByDocument(111111);

    expect(result).toEqual({ id: 89, balance: 10000, document: 111111 });
  });

  it("update should update the data properly the expected result", () => {
    update(111111, NEW_BALANCE);
    expect(fs.writeFileSync).toHaveBeenCalled();
  });

  it("get balance should return the correct value", () => {
    const result = getBalance(111111);

    expect(result).toBe(NEW_BALANCE);
  });
});
