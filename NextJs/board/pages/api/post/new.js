import { connectDB } from "@/util/database"

export default async function handler(req,res) {
  if(req.method == 'POST') {
    if(req.body.title == '' || req.body.content == '') {
      return res.status(500).json('you post empty title or content')
    }
    try {
      let db = (await connectDB).db('board');
      let result = await db.collection('post').insertOne(req.body)
      return res.redirect(302, '/list')
    } catch(err) {
      console.error(err);
    }
  }
}