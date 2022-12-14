import type { NextApiRequest, NextApiResponse } from "next";

import { ResultStatus } from "types";
import { getByDocument } from "helpers/users-repo";

export default async function authHandler(req: NextApiRequest, res: NextApiResponse) {
  const { body } = req;
  const { document, password } = body;

  try {
    const result = await getByDocument(Number(document));

    if (result?.document === Number(document) && result?.password === Number(password)) {
      return res.status(200).json({
        status: ResultStatus.OK,
        data: {
          name: result.name,
          id: result.id,
          balance: result.balance,
          accountNumber: result.accountNumber,
          document: result.document,
        },
      });
    } else {
      return res.status(401).json({
        status: ResultStatus.WRONG_CREDENTIALS,
        data: { message: "Your document is password are incorrect" },
      });
    }
  } catch (e) {
    return res.status(500).end();
  }
}
