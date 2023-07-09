'use client'

import Link from "next/link"

export default function ListItem(props) {
    return(
        <div>
            {
                props.result.map((a, i)=>
                    <div className="list-item" key={i}>
                        <Link href={'/detail/' + a._id}>
                        <h4>{a.title}</h4>
                        </Link>
                        <span onClick={(e) => {
                            fetch('/api/post/delete', {method: 'DELETE', body: a._id})
                            .then((r) => {
                                r.json()
                            })
                            .then(() => {
                                e.target.parentElement.style.opacity = 0
                                setTimeout(() => {
                                    e.target.parentElement.style.display = 'none';
                                }, 1000)
                            })
                        }}>Delete</span> 
                        <p>1월 1일</p>
                        <Link href={'/edit/' + a._id}>Edit</Link>
                    </div>
                )
            }
        </div>
    )
}