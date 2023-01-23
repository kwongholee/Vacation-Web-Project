import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'; // react-bootstrap
import {Navbar, Container, Nav} from 'react-bootstrap'; // react-bootstrap component
import bg from './img/bg.png'; // react에서 img 파일 import 하고 url 사용
import { useState } from 'react';
import Detail from './routes/Detail';
import products from './components/data';
import {Routes, Route, Link, useNavigate, Outlet} from 'react-router-dom';

function App() {

  let [shoes, setShoes] = useState(products);
  let navigate = useNavigate();

  return (
    <div className="App">

      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">KwongHo Shop</Navbar.Brand>
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
          </>
        } />
        <Route path="/detail" element={<Detail />} />

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