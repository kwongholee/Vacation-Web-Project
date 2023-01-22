/* eslint-disable */  // waring 제거

import logo from './logo.svg';
import './App.css';
import React, {useState} from 'react';

function App() {

  let post = '강남 우동 맛집';
  let [blogtitle, setlogo] = useState('ReactBlog');
  let [posttitle, posttitlechange] = useState(['남성 코트 추천','성수동 브런치 맛집','파이썬 독학']);
  let [like, setLike] = useState([0,0,0]);
  let [modal, setModal] = useState(false);
  let [title, setTitle] = useState(0);
  let [input, setInput] = useState('');

  return (
    <div className="App">
      <div className="black-nav">
        <h4 style={{color: 'red', fontSize: '16px'}}>{blogtitle}</h4>
      </div>
      <button onClick={() => {
        let copytitle2 = [...posttitle];
        copytitle2.sort();
        posttitlechange(copytitle2);
      }}>가나다순 정렬</button>
      {/* <div className="list">
        <h4>{posttitle[0]} <span onClick={() => {likeplus(like+1)}}>Like👍</span> {like} </h4>
        <p>2.17 post</p>
        <button className='btn-fem' onClick={() => {
          let copytitle = [...posttitle];
          copytitle[0] = '여성 코트 추천';
          posttitlechange(copytitle);
        }}>여성 코트 추천</button>
      </div>
      <div className="list">
        <h4>{posttitle[1]}</h4>
        <p>2.17 post</p>
      </div>
      <div className="list">
        <h4 onClick={() => {
          if(modal == true) {
            setModal(false);
          } else {
            setModal(true);
          }
        }}>{posttitle[2]}</h4>
        <p>2.17 post</p>
      </div> */}
      {
        posttitle.map((a,i) => { // i: 반복문이 돌 때마다 0부터 1씩 증가하는 정수
          return (
            <div className="list" key={i}>
              <h4  onClick={() => {
                if(modal == true) {
                  setTitle(i);
                  setModal(false);
                } else {
                  setTitle(i);
                  setModal(true);
                }
              }}>{a} <span onClick={(e) => {
                e.stopPropagation();
                let copy = [...like];
                copy[i] = copy[i] + 1;
                setLike(copy);
              }}>Like👍</span> {like[i]} </h4>
              <p>2.17 post</p>
              <button onClick={() => {
                let copy = [...posttitle];
                copy.splice(i,1);
                posttitlechange(copy);
              }}>delete</button>
            </div>
          )
        })
      }
      <input onChange={(e) => { setInput(e.target.value) }} />
      <button onClick={() => {
        let copy = [...posttitle];
        copy.push(input);
        let copy2 = [...like];
        copy2.push(0);
        posttitlechange(copy);
        setLike(copy2);
      }}>post</button>
      {
        modal == true ? <Modal title={title} posttitle={posttitle} posttitlechange={posttitlechange}></Modal>: null
      }
    </div>
  );
}

function Modal(props) { // 다른 function 밖에다가 작성 + 영어 대문자 사용
  return (
    <div className='modal' style={{background: 'skyblue'}}>
      <h4>{props.posttitle[props.title]}</h4>
      <p>date</p>
      <button onClick={() => {
        let copy = [...props.posttitle]; 
        copy[0] = '여성 코트 추천'
        props.posttitlechange(copy)}}>postchange</button>
    </div>
  )
}

class Modal2 extends React.Component { // class: React의 옛날 component 생성 방식
  constructor(props) {
    super(props);
    this.state = { // state 생성 방법
      name: 'kim',
      age: 20
    }
  }
  render() {
    return (
      <div>Hi {this.state.age}
        <button onClick={() => {
          this.setState({age:21}); // setState: 기존은 똑같고 수정부분만 변경됨
        }}>btn</button>
      </div>
    )
  }
}

export default App;

// class(react에서는 새로운 기능) != className(html에서 우리가 알던 class)
// 변수를 넣고 싶다면(데이터바인딩) => {변수}
// style을 넣고 싶다면 style = { {요기 안에다 적음(-기호 사용 불가)} }
// return () 안에 하나의 태그만 존재 가능
// 자료를 잠깐 저장할 때는 변수 or state
// state 사용법: useState import => 저장
// Destructuring 문법 (ex> let [a,c] = [1,2])
// 변수와 state의 차이점: 변수는 갑자기 변경되면 html에 자동 반영이 되지 않지만
// state는 자동 렌더링 됨
// 기존 state == 신규 state의 경우 변경하지 않음
// array, object: refernce type임을 명심할 것
// component 만드는 법: function 만들기 => return() 안에 html 담기 => <함수명></함수명> 쓰기
// component 사용 이유: 반복적인 html 축약, 큰 페이지들 만들기, 자주 변경되는 것들 만들기
// component 단점: state를 가져다 쓸 때 문제가 생김
// 동적 UI 제작: 디자인 미리 완성 => UI의 현재 상태를 state에 저장 => state에 따라 UI 보이는 유무 작성
// if문 대신 사용하는 조건문 = 삼항 연산자 => 조건식 ? 참 : 거짓
// for 대신 사용하는 반복문 = map: array 자료 갯수만큼 콜백함수 실행, 함수의 파라미터는 array 안에 있는 자료, return에는 array로 담아줌
// 부모에서 자식으로 state 전송하는법: <자식컴퍼넌트 작명={state이름}> => props 파라미터 등록후 props.작명 사용
// state를 만드는 곳: state를 사용하는 컴퍼넌트 중 가장 최상위 컴퍼넌트
// 이벤트 버블링 막는 법: 이벤트 객체 e 선언(in eventlistner) => e.stoppropagation()
// class의 필수 콜백 함수: constructor(){super()}, render(){}