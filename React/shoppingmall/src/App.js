import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'; // react-bootstrap
import {Navbar, Container, Nav} from 'react-bootstrap'; // react-bootstrap component
import bg from './img/bg.png'; // react에서 img 파일 import 하고 url 사용
import { useState } from 'react';
import products from './data';

function App() {

  let [shoes, setShoes] = useState(products);

  return (
    <div className="App">

      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">KwongHo Shop</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#features">Products</Nav.Link>
            <Nav.Link href="#pricing">Basket</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <div className='main-bg' style={{backgroundImage: 'url(' + bg + ')'}}></div>
      
      <div className='container'>
        <div className='row'>
          <Products shoes={shoes}></Products>
        </div>
      </div>
      

    </div>
  );
}

function Products(props) {
  return(
    props.shoes.map((a,i) => {
      return(
        <div className='col-md-4'>
          <img src='https://codingapple1.github.io/shop/shoes1.jpg' width="80%" />
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