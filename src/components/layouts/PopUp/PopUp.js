import React from 'react';
import styled from 'styled-components/macro';
import Question from '../../Inputs/Question';
import Button from '../../Buttons/Button';

const Wrapper = styled.div`
  display: ${(props) => props.display};
  box-sizing: border-box;
  width: 800px;
  min-height: 600px;
  background-color: #38373b;
  border-radius: 10px;
  position: absolute;
  z-index: 30;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const Title = styled.div`
  box-sizing: border-box;
  width: 100%;
  border-radius: 10px;
  background-color: #3a6ff7;
  color: white;
  font-size: 36px;
  font-weight: 800;
  padding: 38px 60px;
`;

const Content = styled.div`
  box-sizing: border-box;
  margin: 100px auto 148px;
  width: 575px;
  height: 325px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Row = styled.div`
  box-sizing: border-box;
  display: grid;
  grid-template-columns: ${(props) => props.gridFr};
  gap: 30px;
  width: 100%;
  margin-bottom: ${(props) => props.marginBottom};
`;

const ButtonWrapper = styled.div`
  width: 575px;
  margin: 0 auto 50px;
`;

export default function PopUp({ display, gridFr }) {
  return (
    <Wrapper display={display}>
      <Title>TITLE</Title>
      <Content>
        <Row gridFr={gridFr}>
          <Question wrapperWidth='100%' labelWidth='100px' height='50px'>
            Title
          </Question>
        </Row>
        <Row gridFr='1fr'>
          <Question wrapperWidth='100%' labelWidth='100px' height='50px'>
            Title
          </Question>
        </Row>
        <Row gridFr='1fr'>
          <Question wrapperWidth='100%' labelWidth='100px' height='50px'>
            Title
          </Question>
        </Row>
      </Content>
      <ButtonWrapper>
        <Button featured textAlignment='center'>
          SAVE
        </Button>
      </ButtonWrapper>
    </Wrapper>
  );
}