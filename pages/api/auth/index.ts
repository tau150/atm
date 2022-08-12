import type { NextApiRequest, NextApiResponse } from "next";

import { ResultStatus } from "types";
import { getByDocument } from "helpers/users-repo";

export default function authHandler(req: NextApiRequest, res: NextApiResponse) {
  const { body } = req;
  const { document, password } = body;

  const result = getByDocument(Number(document));

  if (result?.document === Number(document) && result?.password === Number(password)) {
    res.status(200).json({
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
      data: { message: "Your document or password are incorrect" },
    });
  }
}
