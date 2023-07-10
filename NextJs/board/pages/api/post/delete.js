import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(req, res) {
    if(req.method == 'DELETE') {
        try {
            let session = await getServerSession(req, res, authOptions);
            let db = (await connectDB).db('board');
            let findData = await db.collection('post').findOne({_id : new ObjectId(req.body)});
            if(findData.author == session.user.email) {
                let result = await db.collection('post').deleteOne({_id: new ObjectId(req.body)})
                return res.redirect(302, '/list');
            }
        } catch(err) {
            console.log(err);
        }
    }
}