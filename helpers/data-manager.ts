import fetch from "node-fetch";

import { User } from "types";

const fs = require("fs");

interface ApiResponse {
  record: User[];
  metadata?: Object;
}

function writeRegistersJson(newUsers: User[]) {
  return new Promise<string | Error>((resolve, reject) => {
    fs.writeFile("data/db.json", JSON.stringify(newUsers, null, 4), (err: Error) => {
      if (err) {
        reject(err);
      }
      resolve("ok");
    });
  });
}

function getRegistersJson() {
  return new Promise<ApiResponse | Error>((resolve, reject) => {
    fs.readFile("data/db.json", (err: Error, data: User[]) => {
      if (err) {
        reject(err);

        return;
      }
      resolve({ record: JSON.parse(data.toString()) });
    });
  });
}

const commonHeaders = {
  "Content-Type": "application/json",
  ...(process.env.X_MASTER_KEY && { "X-Master-Key": process.env.X_MASTER_KEY }),
  ...(process.env.X_MASTER_KEY && { "X-Access-Key": process.env.X_ACCESS_KEY }),
};

function writeRegistersDb(users: User[]): Promise<ApiResponse> {
  const body = [...users];

  return fetch("https://api.jsonbin.io/v3/b/630688905c146d63ca7deea3", {
    method: "PUT",
    headers: commonHeaders,
    body: JSON.stringify(body),
  })
    .then((res: any) => {
      if (!res.ok) {
        throw new Error();
      }

      return res.json();
    })
    .then((result: any) => {
      return result;
    })
    .catch((e: Error) => {
      throw e;
    });
}

function getRegistersDb(): Promise<ApiResponse> {
  return fetch("https://api.jsonbin.io/v3/b/630688905c146d63ca7deea3", {
    headers: commonHeaders,
  })
    .then((res: any) => {
      if (!res.ok) {
        throw new Error();
      }

      return res.json();
    })
    .then((result: any) => {
      return result;
    })
    .catch((e: Error) => {
      throw e;
    });
}

export const getRegisters =
  process.env.NODE_ENV === "production" ? getRegistersDb : getRegistersJson;

export const writeRegisters =
  process.env.NODE_ENV === "production" ? writeRegistersDb : writeRegistersJson;
