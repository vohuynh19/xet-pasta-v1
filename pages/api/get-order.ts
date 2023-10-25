import { connectMongoDb } from "core/mongo";
import Order from "core/mongo/models/order";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await connectMongoDb();
  if (req.method === "POST") {
    const response = await Order.find({
      ...req.body,
    });
    res.status(200).json(response);
  }
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "5mb",
    },
  },
  maxDuration: 5,
};
