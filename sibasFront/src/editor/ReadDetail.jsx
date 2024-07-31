import React, { useState } from 'react';
import styled from 'styled-components';

const DetailContainer = styled.div`
  position: absolute;
  background-color: aliceblue;
  width: 500px;
  height: 600px;
  z-index: 9999999999;
  top: 120px;
  border-radius: 10px;
  border: 1px solid black;
  display: ${(props) => (props.visible ? 'block' : 'none')};
`;

const ReadDetail = ({ url, click }) => {
  //click이 false 이면 닫힌 상태 아니면 열린상태 거기서 close가 true 가 되면 또 닫힘
  const checkOpen = () => {
    return click === true;
  };
  return (
    <DetailContainer visible={checkOpen()}>
      <button
        onClick={(e) => {
          e.preventDefault();
          click = false;
        }}
      >
        X
      </button>
      <div
        style={{
          backgroundImage: `url(${url})`,
        }}
      >
        {console.log(url)}
        건물사진
      </div>
      <div>건물이름</div>
      <div>평수</div>
      <div>가격</div>
      <div>주소</div>
    </DetailContainer>
  );
};

export default ReadDetail;
