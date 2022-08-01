/* eslint-disable */

import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';

function App() {
  // (중요!) 주석에 (1)(2)(3) step 잘 쓰기

  let post = 'Practice React';
  let [글제목, 글제목변경] = useState(['남자코트 추천', '강남 우동맛집', '파이썬독학']);
  let [따봉, 따봉변경] = useState([0, 0, 0]);
  let [modal, setModal] = useState(false);
  let [입력값, 입력값변경] = useState('');
  let [모달제목, 모달제목변경] = useState(0);


  return (
    <div className="App">
      <div className='black-nav'>
        <h4>{ post }</h4>
      </div>

      <button className='btn' onClick={() => { 
        let copy = [...글제목]; // ★★★ (1)배열 useState로 변경 시 항상 카피본 만들기
        copy[0] = '여자코트 추천'; // (2)카피된 배열에 변경함수식 넣기
        글제목변경(copy) // (3)변경할 useState에 변경함수식 카피본 적용
      }}>성별 바꾸기</button>

      <button className='btn' onClick={() => { 
        let copy = [...글제목]; // ★★★ (1)배열 useState로 변경 시 항상 카피본 만들기
        copy.sort(); // (2)카피된 배열에 변경함수식 넣기
        글제목변경(copy) // (3)변경할 useState에 변경함수식 카피본 적용
      }}>게시글 정렬</button>

      {/* 
      <div className='list'>
        <h4>{ 글제목[0] } <span style={ {cursor: 'pointer'} } onClick={ () => { 따봉변경(따봉 + 1) } }>👏</span> { 따봉 } </h4>
        <p>6월 20일 발행</p>
      </div>

      <div className='list'>
        <h4>{ 글제목[1] }</h4>
        <p>6월 21일 발행</p>
      </div>

      <div className='list'>
        <h4 onClick={ () => { setModal(!modal) } }>{ 글제목[2] }</h4>
        <p>7월 2일 발행</p>
      </div> 
      */}

      {
        글제목.map(function(a, i) {
          return (
            <div className='list' key={i}>
              <h4 onClick={ (e) => { setModal(!modal); 모달제목변경(i) } }>{ 글제목[i] } 

                <span style={ {cursor: 'pointer'} } onClick={ (e) => {

                  e.stopPropagation(); // 이벤트 버블링(부모태그와 같이 눌림)방지코드 
                  let copy = [...따봉]; // ★★★ (1)배열 useState로 변경 시 항상 카피본 만들기
                  copy[i] = copy[i] + 1;  // (2)카피된 배열에 변경함수식 넣기
                  따봉변경(copy) // (3)변경할 useState에 변경함수식 카피본 적용
                } }>🤣</span> { 따봉[i] } 

                <button className='delete' onClick={ (e) => {

                  e.stopPropagation(); // 이벤트 버블링(부모태그와 같이 눌림)방지코드 
                  let copy = [...글제목]; // ★★★ (1)배열 useState로 변경 시 항상 카피본 만들기
                  copy.splice(i, 1); // (2)카피된 배열에 변경함수식 넣기
                  글제목변경(copy); // (3)변경할 useState에 변경함수식 카피본 적용
                  console.log(글제목);

                } }>삭제</button>

              </h4>
              <p>6월 21일 발행</p>
              
            </div>
          )
        })
      }  

      <input onChange={ (e) => { 입력값변경(e.target.value); } } />
      <button className='upload' onClick={ () => { 
        let copy = [...글제목]; // ★★★ (1)배열 useState로 변경 시 항상 카피본 만들기
        copy.unshift(입력값); // (2)카피된 배열에 변경함수식 넣기
        글제목변경(copy); // (3)변경할 useState에 변경함수식 카피본 적용
        console.log(copy); 
      } }>발행</button> 

      {
        modal == true ? <Modal 모달제목={모달제목} 글제목={글제목} 글제목변경={ () => {
          let copy = [...글제목]; // ★★★ (1)배열 useState로 변경 시 항상 카피본 만들기
          copy[0] = '여자코트 추천' // (2)카피된 배열에 변경함수식 넣기
          글제목변경(copy); // (3)변경할 useState에 변경함수식 카피본 적용
        } }/> : null
      }

      <Modal2 />
    </div>
  );
}

function Modal(props) {
  return (
    <>
      <div className='modal' style={ {background : props.color} }>
        <h4>{ props.글제목[props.모달제목] }</h4>
        <p>날짜</p>
        <p>상세내용</p>
        <button onClick={ props.글제목변경 }>글수정</button>
      </div>

    </>
  );
}

// 구 class 문법(모달창만들기)
class Modal2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name : 'woo',
      age : 20,
    }
  }
  render() {
    return (
      <div className='modal2'>
        <p>구 class 문법 모달창</p>
        name : {this.state.age}<br/>
        age : {this.state.age}<br />
        <button onClick={ () => {
          this.setState({ age : 31 });
        }}>버튼</button>
      </div>
    )
  }
}

export default App;
