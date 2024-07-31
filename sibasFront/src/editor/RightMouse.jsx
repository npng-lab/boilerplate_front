import styled from 'styled-components';

const RightMouseBtnContainer = styled.div`
  position: absolute;
  left: ${(props) => props.left + props.leftCoord}px;
  top: ${(props) => props.top + props.topCoord}px;
  margin: 0px;
  padding: 0px;
  width: 120px;
  height: 45px;
  background-color: #0088ff;
  z-index: 99999;
`;
const MenuList = styled.ul`
  list-style: none;
  width: 100%;
  margin: 0px;
  padding: 0px;
  font-size: 15px;
  text-align: center;
  > li:hover {
    background-color: aliceblue;
  }
`;

const RightMouse = ({ left, top, leftCoord, topCoord }) => {
  //우클릭 1번 정보 확인
  //우클릭 2번 정보 수정/작성
  return (
    <RightMouseBtnContainer
      left={left}
      top={top}
      leftCoord={leftCoord}
      topCoord={topCoord}
    >
      <MenuList>
        <li onClick={() => {}}>정보확인</li>
        <li onClick={() => {}}>정보작성 및 수정</li>
      </MenuList>
    </RightMouseBtnContainer>
  );
};

export default RightMouse;
// 우클릭시 해당 위치에 메뉴 생성.
// 다른 건물 클릭하면 원래있던거 지워지고 또 다른 위치에 생성
// // 좌클릭이나 빈곳 클릭하면 메뉴바 지우기
// //우클릭 이벤트 import
// import RightMouse from './RightMouse';
// <div>{rClick ? <RightMouse /> : ''}</div>; // 우클릭 클릭시 발동하는 기능
// setRClick(!rClick);
// const [rClick, setRClick] = useState(false);
