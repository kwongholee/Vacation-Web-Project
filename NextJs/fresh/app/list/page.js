'use client'

import { useState } from "react";

export default function List() {
  let product = ['Tomatoes', 'Pasta', 'Coconut'];
  let [like,setLike] = useState([0,0,0]); 

  return (
    <div>
      <h4 className="title">list</h4>
      {
        product.map((a,i) => {
          return(
            <div className="food" key={i}>
              <img src={"/food" + i + ".png"} className="food-img" />
              <h4>{a} $40</h4>
              <span> {like[i]} </span>
              <button onClick={() => {
                let copy = [...like];
                copy[i]++;
                setLike(copy)
                }}>+</button>
                <button onClick={() => {
                let copy = [...like];
                copy[i] -= 1;
                setLike(copy)
                }}>-</button>
            </div>
          )
        })
      }
    </div>
  )
}