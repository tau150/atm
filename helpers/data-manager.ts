import fetch from "node-fetch";

import { User } from "types";

interface ApiResponse {
  record: User[];
  metadata: Object;
}

const commonHeaders = {
  "Content-Type": "application/json",
  ...(process.env.X_MASTER_KEY && { "X-Master-Key": process.env.X_MASTER_KEY }),
  ...(process.env.X_MASTER_KEY && { "X-Access-Key": process.env.X_ACCESS_KEY }),
};

export function writeRegisters(users: User[]): Promise<ApiResponse> {
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

      return res.json().map((user: User) => {
        delete user.password;

        return user;
      });
    })
    .then((result: any) => {
      return result;
    })
    .catch((e: Error) => {
      throw e;
    });
}

export function getRegisters(): Promise<ApiResponse> {
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
