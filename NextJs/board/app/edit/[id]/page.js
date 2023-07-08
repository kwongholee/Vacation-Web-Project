import { connectDB } from "@/util/database"
import { ObjectId } from "mongodb";

export default async function Edit(props) {
    let db = (await connectDB).db('board')
    let result = await db.collection('post').findOne({_id: new ObjectId(props.params.id)});

    return(
        <div className="p-20">
            <h4>Edit</h4>
            <form action="/api/post/edit" method="POST">
                <input name="_id" defaultValue={result._id.toString()} style={{display: "none"}} />
                <input name="title" defaultValue={result.title} /><br/>
                <input name="content" defaultValue={result.content} /><br/>
                <button type="submit">Edit</button>
            </form>
        </div>
    )
}