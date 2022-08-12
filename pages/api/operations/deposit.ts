// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

import { ResultStatus } from "types";
import { getBalance, update } from "helpers/users-repo";

export default function operationHandler(req: NextApiRequest, res: NextApiResponse) {
  const { body } = req;
  const { document, amount } = body;

  const balance = getBalance(Number(document));
  const newBalance = balance + amount;

  update(Number(document), newBalance);

  return res.status(200).json({
    status: ResultStatus.OK,
    data: {
      balance: newBalance,
    },
  });
}
