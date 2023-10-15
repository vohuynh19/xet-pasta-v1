import { connectMongoDb } from "core/mongo";
import Order from "core/mongo/models/order";
import type { NextApiRequest, NextApiResponse } from "next";
import { firebaseAdmin } from "src/infra/firebase/firebaseAdmin";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await connectMongoDb();
  if (req.method === "GET") {
    const data = (
      await firebaseAdmin.firestore().collection("orders").get()
    ).docs.map((val) => {
      const doc = val.data();
      return {
        ...doc,
        id: val.id,
        firebaseCreatedAt: doc.createdAt,
        firebaseUpdatedAt: doc.updatedAt,
      };
    });
    await Order.insertMany(data);
    res.status(200).json({
      message: "Insert Order Success",
    });
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
