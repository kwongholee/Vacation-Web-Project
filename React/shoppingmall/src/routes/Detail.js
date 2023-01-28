import React, { useContext, useEffect, useState } from "react";
import { Nav } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import styled from 'styled-components';
import { order } from "../store";
import {Context1} from './../App'

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

  // let {product, shoes} = useContext(Context1);

  let [show, setShow] = useState(true);
  let [count, setCount] = useState(0);
  let {id} = useParams();
  let [input, setInput] = useState(0);
  let [tab, setTab] = useState(0);
  let [fade2, setFade2] = useState('');
  let dispatch = useDispatch();
  let findProduct = props.shoes.find(x => x.id == id);

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

  useEffect(() => {
    setTimeout(() => {
      setFade2('end')
    }, 100);
    return () => {
      setFade2('')
    }
  },[])

  function findId(element) {
    if(element.id == id) {
      return true;
    }
  }
  let array = props.shoes.find(findId);

  useEffect(() => {
    let watched = JSON.parse(localStorage.getItem('watched'));
    watched.push(findProduct.id);
    watched.sort();
    watched = new Set(watched);
    watched = Array.from(watched);
    localStorage.setItem('watched', JSON.stringify(watched));
  }, [])

  return (
    <div className={`container start ${fade2}`}>
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
          <button className="btn btn-danger" onClick={() => {
            dispatch(order({id: Number(id), name: array.title, count: 1}))
          }}>주문하기</button> 
        </div>
      </div>

      <Nav variant="tabs"  defaultActiveKey="link0">
        <Nav.Item>
          <Nav.Link eventKey="link0" onClick={() => {setTab(0)}}>버튼0</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="link1" onClick={() => {setTab(1)}}>버튼1</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="link2" onClick={() => {setTab(2)}}>버튼2</Nav.Link>
        </Nav.Item>
      </Nav>
      <TabContent tab={tab}></TabContent>

    </div> 
  )
}

function TabContent({tab}) {

  let [fade, setFade] = useState('');

  useEffect(() => {
    setTimeout(() => {
      setFade('end')
    }, 100);
    return () => {
      clearTimeout();
      setFade('')
    }
  }, [tab])

  return (<div className={`start + ${fade}`}>
    {[<div>post0</div>,<div>post1</div>,<div>post2</div>][tab]}
  </div>)
}

export default Detail;