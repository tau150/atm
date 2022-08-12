// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

import { ResultStatus } from "types";
import { getBalance, update } from "helpers/users-repo";

export default function operationHandler(req: NextApiRequest, res: NextApiResponse) {
  const { body } = req;
  const { document, amount } = body;

  const result = getBalance(Number(document));

  if (result >= Number(amount)) {
    update(Number(document), result - Number(amount));

    return res.status(200).json({
      status: ResultStatus.OK,
      data: {
        rest: result - Number(amount),
      },
    });
  } else {
    return res.status(200).json({
      status: ResultStatus.NOT_ENOUGH_BALANCE,
      data: {
        rest: result - Number(amount),
      },
    });
  }
}
