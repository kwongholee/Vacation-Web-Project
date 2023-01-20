import logo from './logo.svg';
import './App.css';

function App() {

  let post = '강남 우동 맛집';

  return (
    <div className="App">
      <div className="black-nav">
        <h4 style={{color: 'red', fontSize: '16px'}}>Blog</h4>
      </div>
      <h4>{post}</h4>
    </div>
  );
}

export default App;

// class(react에서는 새로운 기능) != className(html에서 우리가 알던 class)
// 변수를 넣고 싶다면(데이터바인딩) => {변수}
// style을 넣고 싶다면 style = { {요기 안에다 적음(-기호 사용 불가)} }