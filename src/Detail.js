import axios from 'axios';
import {Nav,Table} from 'react-bootstrap';
import { useContext, useEffect, useState } from 'react';
import {useHistory,useParams} from 'react-router-dom'
import styled from 'styled-components'
import './Detail.scss';
import {재고context} from './App.js';
import {CSSTransition} from "react-transition-group";
import {connect} from 'react-redux';

let 박스 = styled.div`
    padding:20px;
    
`;

let 제목 = styled.h4`
    font-size :25px;
    color : ${props=>props.색상}
`;





function Detail(props) {
    let [alert, alert변경] = useState(true);
    let [누른탭,누른탭변경] = useState(0);
    let [스위치,스위치변경] = useState(false);

    useEffect( () => {
        let arr = localStorage.getItem('watched');
        if(arr == null){
            arr=[]
        }else{
            arr = JSON.parse(arr);
        }
        arr.push(id);
        arr = new Set(arr);
        arr = [...arr];
        localStorage.setItem('watched',JSON.stringify(arr));
    },[]);

    let 재고 = useContext(재고context);
    

    useEffect(()=>{
        let timer = setTimeout(()=>{
            alert변경(false);
        },2000);
        return ()=>{clearTimeout(timer)}
    },[]);
    
    let { id }= useParams();
    let history = useHistory();
    let 찾은상품 = props.shoes.find(function(상품){
        return 상품.id == id
    });
    return (
        <div className="container">
            <박스>
            {/* <제목 색상={'blue'}>Detail</제목> */}
            <제목 >Detail</제목>
            </박스>

            

            {
                alert==true
                ?(<div className="my-alert2">
                <p>재고가 얼마 남지 않았습니다.</p>
                </div>)
                :null
            }

            
            <div className="row">
                <div className="col-md-6">
                <img src={'https://codingapple1.github.io/shop/shoes' + (찾은상품.id + 1) + '.jpg'} width="100%" />

                </div>
                <div className="col-md-6 mt-4">
                    <h4 className="pt-5">{찾은상품.title}</h4>
                    <p>{찾은상품.content}</p>
                    <p>{찾은상품.price}원</p>

                    <Info 재고={props.재고}></Info>

                    <button className="btn btn-danger" onClick={()=>{
                        props.재고변경([9,11,12]);
                        props.dispatch({type:'항목추가',payload : {id:찾은상품.id, name:찾은상품.title, quan : 1} });
                        history.push('/cart');
                        }}>주문하기</button>
                        &nbsp;
                    <button className="btn btn-danger" onClick={()=>{
                        history.push('/');
                        }}>뒤로가기</button>
                </div>
            </div>

            <Nav className="mt-5" variant="tabs" defaultActiveKey="/link-0">
                <Nav.Item>
                    <Nav.Link eventKey="link-0" onClick={()=>{스위치변경(false); 누른탭변경(0)}}>반품안내</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="link-1" onClick={()=>{스위치변경(false); 누른탭변경(1)}}>반품절차</Nav.Link>
                </Nav.Item>
            </Nav>
            
            <CSSTransition in={스위치} classNames="wow" timeout={500}>
            <TapContent 누른탭={누른탭} 스위치변경={스위치변경}></TapContent>
            </CSSTransition>

        </div>
    )
}

function TapContent(props){

    useEffect(()=>{
        props.스위치변경(true);
    });

    if(props.누른탭===0){
        return <div>
            <Table striped bordered hover>

  <tbody>
    <tr>
    <td colSpan="1">반품 배송비</td>
      <td colSpan="3">나의 상점에서 반품 신청 시 정확한 배송비를 확인할 수 있습니다.</td>
    </tr>
    <tr>
    <td colSpan="1">반품 주소</td>
      <td colSpan="3">나의 상점에서 반품 신청완료 후 발행되는 Return 문서 내 정확한 주소지를 확인할 수 있습니다.</td>
    </tr>
    <tr>
      <td colSpan="1">반품 안내</td>
      <td colSpan="3">운영하는 전문 고객센터 (1566-1111)로 문의주시기 바랍니다.</td>
    </tr>
  </tbody>
</Table>
        </div>
    }else if(props.누른탭===1){
        return <div>
            <Table striped bordered hover>
  <tbody>
    <tr>
      <td>반품절차</td>
      <td>1.반품신청</td>
      <td>2.반품접수</td>
      <td>3.발송</td>
      <td>4.반품완료</td>
    </tr>
    
  </tbody>
</Table>
        </div>
    }else if(props.누른탭===2){
        return <div>2번쨰 내용입니다</div>
    }
}

function Info(props){
    return(
        <p>{props.재고[0]}</p>
    )
}

function state를props화(state) {
    console.log(state);
    return {
        state: state.reducer,
        alert열렸니 : state.reducer2
    }
}
export default connect(state를props화)(Detail)
