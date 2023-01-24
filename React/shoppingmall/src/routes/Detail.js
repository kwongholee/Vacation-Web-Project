import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from 'styled-components';

class Detail2 extends React.Component { // 옛 component에서 lifecycle 간섭 방식
  componentDidMount() {
    // component mount 시 코드 실행
  }
  componentDidUpdate() {
    // component update 시 코드 실행
  }
  componentWillUnmount() {
    // component unmount 시 코드 실행
  }
}

// let Yellowbtn = styled.button`
//   background: ${props => props.bg};
//   color: black;
//   padding: 10px;
// `
// let Box = styled.div`
//   background: grey;
//   padding: 20px;
// `

// let NewBtn = styled.button(Yellowbtn); // 복사 붙여넣기

function Detail(props) {

  let [show, setShow] = useState(true);
  let [count, setCount] = useState(0);
  let {id} = useParams();
  let [input, setInput] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      setShow(false);
    }, 2000);
    return () => {
      clearTimeout();
    }
  }, [count])

  useEffect(() => {
    if(isNaN(input) == true) {
      alert('Please insert the number in input');
    }
  }, [input])

  function findId(element) {
    if(element.id == id) {
      return true;
    }
  }
  let array = props.shoes.find(findId);

  return (
    <div className="container">
      {/* <Yellowbtn bg='blue'>btn</Yellowbtn> */}
      {
        show == true ? <div className="alert alert-warning"> 2 Seconds left~ Hurry up!</div>: null 
      }
      <input onChange={(e) => {setInput(e.target.value)}}></input>
      {count}
      <button onClick={() => {setCount(count+1)}}>btn</button>
      <div className="row">
        <div className="col-md-6">
          <img src={"https://codingapple1.github.io/shop/shoes"+(Number(id)+1)+".jpg"} width="100%" />
        </div>
        <div className="col-md-6">
          <h4 className="pt-5">{array.title}</h4>
          <p>{array.content}</p>
          <p>{array.price}</p>
          <button className="btn btn-danger">주문하기</button> 
        </div>
      </div>
    </div> 
  )
}

export default Detail;