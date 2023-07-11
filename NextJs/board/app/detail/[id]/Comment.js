'use client'

import { useEffect, useState } from "react"

export default function Comment(props) {
  let [comment, setComment] = useState('');
  let [data, setData] = useState([]);

  useEffect(() => {
    fetch('/api/comment/list?id=' + props.id).then((r) => r.json())
    .then((result) => {
      setData(result);
    })
  },[])

  return(
    <div>
      <hr></hr>
      <div>댓글</div>
      {
        data.length > 0 ?
        data.map((a,i) => 
          <p key={i}>{a.comment}</p>
        )
        : 'Loading'
      }
      <input onChange={(e) => {setComment(e.target.value)}} />
      <button onClick={() => {
        fetch('/api/comment/new', {method: 'POST', body: JSON.stringify({comment: comment, parent: props.id})})
      }}>댓글 전송</button>
    </div>
  )
}