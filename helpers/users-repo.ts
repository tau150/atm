import { User } from "types";

import { writeRegisters, getRegisters } from "./data-manager";

async function saveData(user: User, registers: User[]) {
  const restOfUsers = registers.filter((dbUser: User) => dbUser.document !== user.document);
  const newUsers = [...restOfUsers, user];

  writeRegisters(newUsers);
}

export async function getByDocument(document: number): Promise<User | undefined> {
  const result = await getRegisters();

  if (result instanceof Error) {
    throw result;
  }

  return result.record.find((x: User) => x.document === document);
}

export async function update(document: number, newBalance: number) {
  const result = await getRegisters();

  if (result instanceof Error) {
    throw result;
  }

  const user = result?.record.find((x: User): boolean => x.document === document);

  if (user) {
    user.dateUpdated = new Date().toISOString();
    user.balance = newBalance;
    saveData(user, result.record);
  }
}

export async function getBalance(document: number): Promise<number | undefined> {
  const user = await getByDocument(document);

  return user?.balance;
}
