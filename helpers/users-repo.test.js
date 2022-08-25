import { getByDocument, update, getBalance } from "./users-repo";
import { writeRegisters, getRegisters } from "./data-manager";
const NEW_BALANCE = 13000;

jest.mock("./data-manager.ts", () => ({
  ...jest.requireActual("./data-manager.ts"),
  writeRegisters: jest.fn(),
  getRegisters: jest
    .fn()
    .mockImplementation(() =>
      Promise.resolve({ record: [{ id: 1233, balance: NEW_BALANCE, document: 111111 }] }),
    ),
}));

describe("Users repo utils", () => {
  it("getByDocument should return the expected result", async () => {
    const result = await getByDocument(111111);

    expect(result).toEqual({ id: 1233, balance: NEW_BALANCE, document: 111111 });
  });

  it("update should update the data properly the expected result", async () => {
    update(111111, NEW_BALANCE);
    await expect(getRegisters).toHaveBeenCalled();
    expect(writeRegisters).toHaveBeenCalled();
  });

  it("get balance should return the correct value", async () => {
    const result = await getBalance(111111);

    expect(result).toBe(NEW_BALANCE);
  });
});
