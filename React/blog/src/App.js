/* eslint-disable */  // waring 제거

import logo from './logo.svg';
import './App.css';
import {useState} from 'react';

function App() {

  let post = '강남 우동 맛집';
  let [blogtitle, setlogo] = useState('ReactBlog');
  let [posttitle, posttitlechange] = useState(['남성 코트 추천','강남 우동 맛집','파이썬 독학']);
  let [like, likeplus] = useState(0);

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
      <div className="list">
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
        <h4>{posttitle[2]}</h4>
        <p>2.17 post</p>
      </div>
    </div>
  );
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