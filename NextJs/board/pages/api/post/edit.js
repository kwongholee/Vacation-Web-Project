import { connectDB } from "@/util/database"
import { ObjectId } from "mongodb";

export default async function handler(req,res) {
  if(req.method == 'POST') {
    if(req.body.title == '' || req.body.content == '') {
      return res.status(500).json('you post empty title or content')
    }
    try {
      let db = (await connectDB).db('board');
      let changeData = {title: req.body.title, content: req.body.content}
      let result = await db.collection('post').updateOne({_id: new ObjectId(req.body._id)}, {$set: changeData})
      return res.redirect(302, '/list')
    } catch(err) {
      console.error(err);
    }
  }
}