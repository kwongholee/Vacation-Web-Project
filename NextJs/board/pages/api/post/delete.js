import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
    if(req.method == 'DELETE') {
        try {
            let db = (await connectDB).db('board');
            let result = await db.collection('post').deleteOne({_id: new ObjectId(req.body)})
            return res.redirect(302, '/list');
        } catch(err) {
            console.log(err);
        }
    }
}