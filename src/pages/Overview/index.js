import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Layout from "../../components/Layout";
import { useEmail } from "../../contexts/email-context";

const Main = styled.div`
  padding: 40px;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
  p {
    margin: 0px;
  }
`;

const Toolbar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  span {
    font-size: 21px;
    font-weight: bold;
  }
`;

const Button = styled.button`
  background: #9c9c9c;
  color: white;
  font-size: 12px;
  font-weight: bold;
  height: 36px;
  border-radius: 18px;
  border: none;
  padding: 5px 16px;
  text-transform: uppercase;
  cursor: pointer;
`;

const List = styled.div`
  background: #d6d6d6;
  border: 1px solid #838383;
  border-radius: 3px;
  flex: 1;
  & div {
    width: 25%;
    padding: 10px;
    overflow: hidden;
  }
  & > div {
    display: flex;
    width: 100%;
    border-bottom: 1px solid #838383;
  }
`;

function Overview() {
  const navigate = useNavigate();

  const {
    state: { emails },
    dispatch,
  } = useEmail();

  const postiveReplies = emails.filter(
    (email) => email.status === "POSITIVE_REPLY"
  ).length;
  const neutralReplies = emails.filter(
    (email) => email.status === "NEUTRAL_REPLY"
  ).length;
  const notALead = emails.filter(
    (email) => email.status === "NOT_A_LEAD"
  ).length;

  const goBack = () => {
    navigate(-1);
  };

  const reset = () => {
    dispatch({ type: "RESET" });
  };

  return (
    <Layout>
      <Main>
        <Toolbar>
          <Button onClick={reset}>reset application</Button>
          <span>Overview page</span>
          <Button onClick={goBack}>Back</Button>
        </Toolbar>
        <p>
          <span>Positive replies: </span> <span>{postiveReplies}</span>
        </p>
        <p>
          <span>Neutral replies: </span> <span>{neutralReplies}</span>
        </p>
        <p>
          <span>Not a Lead: </span> <span>{notALead}</span>
        </p>
        <List>
          {emails.map((email, index) => (
            <div key={index}>
              <div>{email.subject}</div>
              <div>{email.body}</div>
              <div>{email.status}</div>
              <div>{email.user}</div>
            </div>
          ))}
        </List>
      </Main>
    </Layout>
  );
}

export default Overview;
