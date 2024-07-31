import styled from 'styled-components';
import ReadDetail from './ReadDetail';

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
  // const [btn, setBtn] = useState('');
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
        <li
          onClick={(e) => {
            e.preventDefault();
            alert('했냐');
            // setBtn('first');
          }}
        >
          정보확인
        </li>
        <li
          onClick={(e) => {
            e.preventDefault();
            alert('했냐2');
            // setBtn('second');
          }}
        >
          정보작성 및 수정
        </li>
      </MenuList>
    </RightMouseBtnContainer>
  );
};

export default RightMouse;
