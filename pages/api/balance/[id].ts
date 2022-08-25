import type { NextApiRequest, NextApiResponse } from "next";
import type { AuthUser } from "types";

import { ResultStatus } from "types";
import { getBalance } from "helpers/users-repo";

export default async function balanceHandler(req: NextApiRequest, res: NextApiResponse) {
  const { query } = req;
  const { id } = query;

  try {
    const result = await getBalance(Number(id));

    return res.status(200).json({
      status: ResultStatus.OK,
      data: {
        balance: result,
      },
    });
  } catch (e) {
    return res.status(500).end();
  }
}
