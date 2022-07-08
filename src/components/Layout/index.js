import styled from "styled-components";

const BoardRoot = styled.div`
  margin-top: 150px;
  display: flex;
  justify-content: center;
`;

const Board = styled.div`
  width: 750px;
  min-height: 550px;
  background: #c6c4c4;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Layout = ({ children }) => {
  return (
    <BoardRoot>
      <Board>{children}</Board>
    </BoardRoot>
  );
};

export default Layout;
