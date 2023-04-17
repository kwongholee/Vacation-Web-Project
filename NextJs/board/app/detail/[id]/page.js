import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";

export default async function Deatil(props) {
  const db = (await connectDB).db('board');
  let result = await db.collection('post').findOne({_id: new ObjectId(props.params.id)});

  return (
    <div>
      <h3>detail</h3>
      <h4>{result.title}</h4>
      <p>{result.content}</p>
    </div>
  )
}