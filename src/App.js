/*eslint-disable*/
import logo from './logo.svg';
import { Button, Container, Navbar, Brand, Toggle, Collapse, Nav, NavDropdown, Item,Carousel } from 'react-bootstrap';
import './App.css';
import React, { useState , useContext, lazy, Suspense} from 'react';
import Data from "./data.js"
// import Detail from './Detail.js';
import axios from 'axios';
import Cart from './Cart.js';
let Detail = lazy(()=> import('./Detail.js'));

import { Link, Route, Switch ,useHistory } from 'react-router-dom';
import styled from 'styled-components';



export let 재고context = React.createContext();

function App() {

  let [shoes, shoes변경] = useState(Data);
  let [재고,재고변경] =useState([10,11,12]);
  let [더보기,더보기변경]=useState(true);

  return (
    <div className="App">
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand as={Link} to="/">ShoeShop</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/">Home</Nav.Link>
              <Nav.Link as={Link} to="/cart">myshop</Nav.Link>
              <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
              </NavDropdown>
            </Nav>
            {/* <Nav>
              <Nav.Link href="#deets">More deets</Nav.Link>
              <Nav.Link eventKey={2} href="#memes">
                Dank memes
              </Nav.Link>
            </Nav> */}
          </Navbar.Collapse>
        </Container>
      </Navbar>

    <Switch>

      <Route exact path="/">
        {/* <div className="jum">
          <p className="jum_1">Hello,world!</p>
          <p className="jum_2">This is a simple hero unit a jumbotafj dksd sdadas</p>
          <button className="jum_btn">버튼</button>
        </div> */}

<Carousel>
  <Carousel.Item>
    <img
      className="d-block w-100"
      src="./background.jpg"
      alt="First slide"
    />
    <Carousel.Caption>
      <h3>First slide label</h3>
      <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item>
    <img
      className="d-block w-100"
      src="./background.jpg"
      alt="Second slide"
    />

    <Carousel.Caption>
      <h3>Second slide label</h3>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item>
    <img
      className="d-block w-100"
      src="./background.jpg"
      alt="Third slide"
    />

    <Carousel.Caption>
      <h3>Third slide label</h3>
      <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
    </Carousel.Caption>
  </Carousel.Item>
</Carousel>

        <div className="container">

          <재고context.Provider value={재고}>
          <div className="row">
            {
              shoes.map((a, i) => {
                return (
                  <Card shoes={shoes[i]} i={i} key={i}></Card>
                )
              })
            }
          </div>
          </재고context.Provider>
          {
            더보기==true
            ? <button className="btn btn-primary" onClick={()=>{

              axios.post('서버URL',{id:'beack', pw:1234});
              더보기변경(false);
              axios.get('https://codingapple1.github.io/shop/data2.json')
              .then((result)=>{  /**성공하면 실행할 코드 */
                console.log(result.data)
                shoes변경([...shoes, ...result.data]);
                
                
                
              })
              .catch(()=>{ /* 실패시 실행할 코드* */
                console.log("실패")
              });
            }}>더보기</button>
            :null
          }
         
        </div>
      </Route>


      <Route exact path="/detail/:id">
        <재고context.Provider value={재고}>
          <Suspense fallback={<div>로딩중이예요</div>}>
          <Detail shoes={shoes} 재고={재고} 재고변경={재고변경}></Detail>
          </Suspense>
        </재고context.Provider>
      </Route>

      <Route path="/cart">
        <Cart></Cart>
      </Route>



      <Route exact path="/:id">
        <div>아무거나 적었을떄 이거 보여줘</div>
      </Route>

      </Switch>




      {/* <div className="container">
        <div className="row">
          {
            shoes.map(function (a, i) {
              return (
                <div className="col-md-4">
                  <img src={shoes[i].imges} width="100%" />
                  <h4>{shoes[i].title}</h4>
                  <p>{shoes[i].content} & {shoes[i].price}</p>
                </div>
              )
            })
          }
        </div>
      </div> */}






    </div>
  );
}



function Card(props) {

  let 재고 = useContext(재고context); 
  let history = useHistory();

  return (
    <div className="col-md-4" onClick={()=>{ history.push('/detail/' + props.shoes.id) } }>
      <img src={'https://codingapple1.github.io/shop/shoes' + (props.i + 1) + '.jpg'} width="100%" />
      <h4>{props.shoes.title}</h4>
      <p>{props.shoes.content} & {props.shoes.price}</p>
      
    </div>

  )
}

function Test(){
  let 재고 = useContext(재고context); 

  return <p>재고 : {재고}</p>
}

export default App;
