import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  if(req.method == 'POST') {
    try {
      let session = await getServerSession(req, res, authOptions);
      req.body = JSON.parse(req.body)
      let data = {
        comment: req.body.comment,
        parent: new ObjectId(req.body.parent),
        author: session.user.email
      }

      let db = (await connectDB).db('board');
      let result = await db.collection('comment').insertOne(data);
      res.status(200).json('success');
    } catch(error) {
      console.log(error);
    }
  }
}