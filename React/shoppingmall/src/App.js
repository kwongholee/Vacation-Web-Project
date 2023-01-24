import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'; // react-bootstrap
import {Navbar, Container, Nav} from 'react-bootstrap'; // react-bootstrap component
import bg from './img/bg.png'; // react에서 img 파일 import 하고 url 사용
import { useState } from 'react';
import Detail from './routes/Detail';
import products from './components/data';
import {Routes, Route, Link, useNavigate, Outlet} from 'react-router-dom';
import axios from 'axios';

function App() {

  let [shoes, setShoes] = useState(products);
  let navigate = useNavigate();

  return (
    <div className="App">

      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/">KwongHo Shop</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link onClick={() => {navigate('/')}}>Home</Nav.Link>
            <Nav.Link onClick={() => {navigate('/about')}}>About</Nav.Link>
            <Nav.Link onClick={() => {navigate('/detail')}}>Detail</Nav.Link>
            <Nav.Link onClick={() => {navigate('/event')}}>Event</Nav.Link>
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
            }}>btn</button>
          </>
        } />
        <Route path="/detail/:id" element={<Detail  shoes={shoes}/>} />

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
  return(
    props.shoes.map((a,i) => {
      return(
        <div className='col-md-4'>
          <img src={'https://codingapple1.github.io/shop/shoes' + (i+1) +'.jpg'} width="80%" />
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
// 