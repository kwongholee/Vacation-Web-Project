import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'; // react-bootstrap
import {Navbar, Container, Nav} from 'react-bootstrap'; // react-bootstrap component
import bg from './img/bg.png'; // react에서 img 파일 import 하고 url 사용
import { createContext, lazy, Suspense, useEffect, useState } from 'react';
// import Detail from './routes/Detail';
import products from './components/data';
import {Routes, Route, Link, useNavigate, Outlet, json, Navigate} from 'react-router-dom';
import axios from 'axios';
// import Cart from './routes/Cart';
import { useQuery } from 'react-query';

const Detail = lazy(() => import('./routes/Detail'));
const Cart = lazy(() => import('./routes/Cart'));

// export let Context1 = createContext(); // state 보관함

function App() {

  let [shoes, setShoes] = useState(products);
  let navigate = useNavigate();
  // let [product, setProduct] = useState([10,11,12]);

  useEffect(() => {
    localStorage.setItem('watched', JSON.stringify([]))
  },[]);

  let result = useQuery('name', () => {
    return axios.get('https://codingapple1.github.io/userdata.json').then((a) => {
      return a.data
    })
  })

  return (
    <div className="App">

      <Navbar bg="Light" variant="Light">
        <Container>
          <Navbar.Brand href="/">KwongHo Shop</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link onClick={() => {navigate('/')}}>Home</Nav.Link>
            <Nav.Link onClick={() => {navigate('/about')}}>About</Nav.Link>
            <Nav.Link onClick={() => {navigate('/detail/0')}}>Detail</Nav.Link>
            <Nav.Link onClick={() => {navigate('/event')}}>Event</Nav.Link>
            <Nav.Link onClick={() => {navigate('/cart')}}>Cart</Nav.Link>
          </Nav>
          <Nav className='ms-auto'>
            {result.isLoading && '로딩중'}
            {result.error && 'Error'}
            {result.data && result.data.name}
          </Nav>
        </Container>
      </Navbar>
      <div className='main-bg' style={{backgroundImage: 'url(' + bg + ')'}}></div>

      <Routes>
        <Route path="/" element={
          <>
            <div className='container'>
              <div className='row'>
                <Products shoes={shoes} />
              </div>
            </div>
            <button onClick={() => {
              axios.get('https://codingapple1.github.io/shop/data2.json')
              .then((res) => {
                let copy = [...shoes];
                copy.push(...res.data);
                setShoes(copy);
              })
              .catch((e) => {
                console.error(e);
              })

              axios.post('/data', {name: 'kim'})
            }}>More</button>
          </>
        } />
        <Route path="/detail/:id" element={
          // <Context1.Provider value={{product, shoes}}></Context1.Provider>
            <Suspense fallback={<div>Loading</div>}>
              <Detail shoes={shoes}/>
            </Suspense>   
        }/>

        <Route path='/cart' element={<Cart></Cart>} />  

        <Route path="/about" element={<About />}>
          <Route path="member" element={<div>member</div>}/>
          <Route path="location" element={<div>location</div>}/>
        </Route>

        <Route path='/event' element={<Event />}>
          <Route path='secret' element={<p>Easter Egg</p>} />
        </Route>

        <Route path="*" element={<div>Not Found</div>} />
      </Routes>
      
    </div>
  );
}

function About() {
  return(
    <div>
      <h4>About Page</h4>
      <Outlet></Outlet>
    </div>
  )
}

function Event() {
  return(
    <div>
      <h3>Today's Event</h3>
      <Outlet></Outlet>
    </div>
  )
}

function Products(props) {
  let navigate = useNavigate();

  return(
    props.shoes.map((a,i) => {
      return(
        <div className='col-md-4'>
          <img src={'https://codingapple1.github.io/shop/shoes' + (i+1) +'.jpg'} width="80%" onClick={() => {
            navigate(`/detail/` + Number(i));           
          }}/>
          <h4>{a.title}</h4>
          <p>{a.content}</p>
        </div>
      )
    })
  )
}

export default App;

// 외부 라이브러리: 라이브러리 찾은 후 설치
// 외부에서 호스팅해둔 이미지 사용시 절대주소 사용 가능
// public 폴더에 이미지를 넣을 경우 '/이미지 경로'로 사용 가능 (단, 세부주소에서 발행 시 문제 발생 가능+따라서 create react app에서 public 이미지 사용 방법 따올 것)
// 이외에는 html에 이미지 경로를 import한 후 사용 가능
// 길고 복잡한 파일은 다른 js 파일에 받을 수 있음 + import, export 사용
// 페이지 나누는 법: 컴퍼넌트로 상세페이지를 각각 채워놓음 => /(~)로 들어가면 그 컴퍼넌트를 보여줌
// 라우터로 페이지 나누는 법: <Routes> <Route /> </Routes> (Route의 갯수 = 페이지 갯수)
// useNavigate: 페이지 이동을 도와줌
// 404 page: Not Found
// Nested Routes: 라우트 안의 또다른 라우트를 만드는 방법 (여러 유사한 페이지 필요할 때)
// Nested Routes의 장점: route 작성이 간단해짐, 부모와 자식의 element를 동시에 보여줌(component에서 Outlet으로 어디에 보여줄지 정해줌)
// stylded-components 라이브러리: js에서 css처럼 스타일 편집 가능(css 안 열어도 됨, 스타일이 다른 js파일로 오염되지 않음, 로딩시간 단축)
// css 오염 방지하려면 component.module.css 사용
// props로 컴퍼넌트 재활용가능함
// 단 js파일이 복잡해지고, 컴퍼넌트간 import 필요하며, 협업시 css 담당 숙련도 이슈 발생할 수도?
// component lifecycle: mount(페이지에 장착), update(페이지에서 업데이트), unmount(페이지에서 제거)
// component lifecycle 중간중간에 코드 실행 가능
// useEffect: mount, update시 코드 실행(랜더링 후 코드가 동작함)
// useEffect 안에 보통 (어려운 연산, 서버에서 데이터 가져오기, 타이머 장착)을 달아놓음
// side effect: 함수의 핵심기능과 상관없는 부가 기능
// useEffect 실행 조건을 넣을 수 있는 곳: useEffect(() => {},[])에서 [] ([]를 비워놓으면 mount시 1회 실행, 이외에는 조건이 바뀔 때마다 실행됨)
// useEffect 동작 전에 실행되는 코드: useEffect(() => {return() => {}})에서 return (unmount시 1회 실행됨)
// cleanup func은 mount시 실행 안됨, unmount시 실행됨
// 서버와 통신시 방법(GET(가져올 떄)/POST(보낼 때))과 자료(URL(서버개발자가 알고 있음))이 필요함
// ajax 이용하면 새로고침 없이 GET/POST 요청 가능
// axios.get('url'): axios를 이용한 get 요청
// axios.post('url', {data}): axios를 이용한 post 요청
// 동시에 ajax 요청 보내기: Promise.all([ axios.get('url'), axios.get('url') ]).then(()=>{})
// 서버와 통신할 때 모든 데이터는 문자 형태여야 하기 때문에 json 파일을 주고 받음
// fetch로도 ajax 요청 가능. 그러나 json data 변환이 필요함
// props 사용하기 귀찮을 때 파라미터 안에 {data작명이름}을 넣으면 props 없이 사용 가능
// 전환애니메이션: css에서 애니메이션 동작 전 className 만들기 => 애니메이션 동작 후 className 만들기 => className에 transition 속성 추가 => 원할 때 후 className 장착
// state 변경 함수가 있으면 automatic batching 기능 대문에 모든 변경 함수를 하나의 랜더링으로만 실행함(마지막 함수 이외에는 기능이 씹힘)(따라서 타이머를 둬서 시간을 둬야함)
// single page application 단점: 컴퍼넌트간 state 공유 불가능
// props 전송은 {부모->자식}만 가능
// Context API: props 없이 state 공유 가능(실전에서 많이 사용하지는 않음) -> 자손들도 사용 가능
// Redux(외부 라이브러리): 한 js파일에 state를 넣어놓고 모든 파일에서 끌어당겨서 씀
// Redux store에는 다른 컴퍼넌트들과 공유할 state만 넣어놓을 것
// Redux state 변경하는 법: state 수정해주는 함수 만들rl => 만든 함수 export => 만든 함수 import => useDispatch 사용
// Redux state 변경하는 거 방법이 거지같지만 사이즈가 커지면 이게 굉장히 효율적인 방식임
// 만약 state가 array/object인 경우 return 쓰지 않고 직접 수정해도 state 변경됨
// localstorage: key,value 형태로 저장 가능 / 문자만 5MB 저장 가능 / 브라우저를 청소하지 않는 한 사이트 접속해도 남아있음
// sessionstorage: 브라우저 끄면 날라감(휘발성 있는 데이터를 저장할 때 사용)
// 데이터저장: localstorage.setItem('이름', '값')/ 데이터 출럭: localstorage.getItem('이름')/ 데이터 삭제: localstorage.removeItem('이름')
// localstorage 데이터를 수정하는 문법은 따로 없고 안에 있는 데이터를 꺼내서 직접 수정해야함
// localstorage에 array/object를 저장하려면 JSON 형태로 바꿔서 저장해야함
// JSON화하려면 JSON.stringify(변수), 다시 되돌릴려면 JSON.parse(변수)
// react-query: 실시간 데이터를 계속 받아올 때 유용
// 성공,실패,로딩중 쉽게 파악 가능/ 자동으로 refetch해줌/ 실패시에도 재시도 알아서 해줌/ ajax로 가져온 결과는 state 공유하지 않아도 됨/ ajax 결과 캐싱가능
// 대부분의 지연 시간은 서버에서 데이터가 늦게 와서 그런거임
// React devTool, Redux devTool: react를 사용할 때 유용한 개발자 도구
// 메인 페이지 이외의 페이지를 따로 로딩하고 싶으면 lazy import 사용(단 lazy를 사용한 페이지를 띄울 때 로딩이 생길 수 있음)
// <Suspense>를 통해 로딩중 ui 생성 가능
// 부모를 재랜더링하면 자식들도 재랜더링됨
// 자식을 꼭 필요할 때만 재랜더랑하고 싶으면 memo 사용
// memo: props가 변할 때만 재랜더링해줌
// useMemo: useEffect와 거의 동일, 실행 시점에 있어서 차이가 있음
// useTransition, useDeferredValue: 느린 컴퍼넌트 성능 향상
// PWA(Progressing Web App): 웹사이트를 모바일 앱처럼 설치해서 쓸 수 있음
// PWA: 설치 마케팅 비용 적음, 아날로그 유저들 배려, html css js 만으로 앱 완성 가능, 푸시알림/센서 등등
// PWA 셋팅된 리액트 프로젝트 설치: npx create-react-app 프로젝트명 --template cra-template-pwa
// PWA 조건: manifest.json(앱 설정파일) + service-worker.json(오프라인에서도 사이트 열 수 있게 도와줌) 파일 필요함
// state 변경함수들은 모두 '비동기적'으로 처리됨. 따라서 useEffect를 잘 사용해볼 것