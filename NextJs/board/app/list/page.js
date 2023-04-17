import { connectDB } from "@/util/database.js"
import Link from "next/link";
import DetailLink from "./DetailLink";

export default async function List() {
  let db = (await connectDB).db('board')
  let result = await db.collection('post').find().toArray()
  return (
    <div className="list-bg">
      {
        result.map((a, i)=>
          <div className="list-item">
            <Link href={'/detail/' + a._id}>
              <h4>{a.title}</h4>
            </Link>
            <p>1월 1일</p>
            <DetailLink />
          </div>
        )
      }
    </div>
  )
}