import { User } from "types";

const fs = require("fs");

const data = require("public/data/db.json");

function saveData(user: User): void {
  const restOfUsers = data.filter((dbUser: User) => dbUser.document !== user.document);
  const newUsers = [...restOfUsers, user];

  fs.writeFileSync("public/data/db.json", JSON.stringify(newUsers, null, 4));
}

export function getByDocument(document: number): User {
  return data.find((x: User) => x.document === document);
}

export function update(document: number, newBalance: number) {
  const user = data.find((x: User): boolean => x.document === document);

  user.dateUpdated = new Date().toISOString();
  user.balance = newBalance;
  saveData(user);
}

export function getBalance(document: number): number {
  const user = getByDocument(document);

  return user.balance;
}
