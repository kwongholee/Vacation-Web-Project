/* eslint-disable */  // waring 제거

import logo from './logo.svg';
import './App.css';
import {useState} from 'react';

function App() {

  let post = '강남 우동 맛집';
  let [blogtitle, setlogo] = useState('ReactBlog');
  let [posttitle, posttitlechange] = useState(['남성 코트 추천','강남 우동 맛집','파이썬 독학']);
  let [like, setLike] = useState([0,0,0]);
  let [modal, setModal] = useState(false);

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
            <div className="list">
              <h4>{a} <span onClick={() => {
                let copy = [...like];
                copy[i] = copy[i] + 1;
                setLike(copy);
              }}>Like👍</span> {like[i]} </h4>
              <p>2.17 post</p>
            </div>
          )
        })
      }
      {
        modal == true ? <Modal></Modal> : null
      }
    </div>
  );
}

function Modal() { // 다른 function 밖에다가 작성 + 영어 대문자 사용
  return (
    <div className='modal'>
      <h4>title</h4>
      <p>date</p>
      <p>postwrite</p>
    </div>
  )
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