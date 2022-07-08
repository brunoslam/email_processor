import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Modal from "react-modal";
import styled from "styled-components";
import Layout from "../../components/Layout";
import PrimaryButton from "../../components/Button";
import { getEmail } from "../../utils";
import { useEmail } from "../../contexts/email-context";
import { useUser } from "../../contexts/user-context";
import { useCountUp } from "react-countup";

const Main = styled.div`
  padding: 40px;
  width: 100%;
  height: 100%;
`;

const Toolbar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Actions = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 16px;
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

const Process = styled.div`
  display: flex;
  padding: 30px;
  justify-content: space-between;
`;

const EmailContent = styled.div`
  display: flex;
  color: #505050;
  align-items: center;
  gap: 16px;
  flex-direction: column;
`;

const Subject = styled.div`
  width: 100%;
  height: 35px;
  border: 1px solid #000000;
  border-radius: 5px;
`;

const Body = styled.div`
  width: 100%;
  height: 100%;
  flex: 1;
  border: 1px solid #000000;
  border-radius: 5px;
`;

const SessionModalWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
  flex-direction: column;

  h3 {
    margin: 0px;
  }

  h4 {
    margin: 0px;
    color: #a8a8a8;
  }
`;

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

function Leads() {
  const [email, setEmail] = useState();
  const [modalIsOpen, setIsOpen] = useState(true);

  const countUpRef = useRef(null);
  const { start } = useCountUp({
    ref: countUpRef,
    start: 0,
    end: 120,
    delay: 0,
    duration: 120,
    onEnd: ({ pauseResume }) => {
      setIsOpen(true);
    },
  });

  const {
    state: { user },
    dispatch: userDispatch,
  } = useUser();

  const { dispatch } = useEmail();

  const trigger = () => {
    start();
  };

  const getNew = () => {
    const newEmail = getEmail();
    trigger();
    setEmail(newEmail);
    setIsOpen(false);
  };

  useEffect(() => {
    getNew();
  // eslint-disable-next-line
  }, []);

  const mark = (status) => () => {
    dispatch({ type: status, payload: { email, user } });
    getNew();
  };

  const logOut = () => {
    userDispatch({ type: "logout" });
  };

  return (
    <Layout>
      <Main>
        <Toolbar>
          <span>
            <span ref={countUpRef} /> s
          </span>
          <Actions>
            <Link to="/overview">Overview</Link>
            <Button onClick={logOut}>Exit</Button>
          </Actions>
        </Toolbar>
        <Process>
          <PrimaryButton onClick={mark("POSITIVE_REPLY")}>
            positive reply
          </PrimaryButton>
          <PrimaryButton onClick={mark("NEUTRAL_REPLY")}>
            netural reply
          </PrimaryButton>
          <PrimaryButton onClick={mark("NOT_A_LEAD")}>not a lead</PrimaryButton>
        </Process>
        <EmailContent>
          <h2>Email</h2>
          <Subject>{email ? email.subject : "Subject"}</Subject>
          <Body>{email ? email.body : "Body"}</Body>
        </EmailContent>

        <Modal
          isOpen={modalIsOpen}
          style={customStyles}
          ariaHideApp={false}
          contentLabel="Expired"
        >
          <SessionModalWrapper>
            <h3>Session Expired</h3>
            <h4>Page will be refresh because session has expired.</h4>
            <PrimaryButton onClick={getNew}>Ok</PrimaryButton>
          </SessionModalWrapper>
        </Modal>
      </Main>
    </Layout>
  );
}

export default Leads;
