import React, { useState } from 'react';
import styled from 'styled-components/macro';
import Button from '../../Buttons/Button';
import Icon from '../../Icon';
import Title from '../../Title/Title';
import DashboardGrey from './dashboard-grey.png';
import DashboardWhite from './dashboard-white.png';
import FinanceGrey from './finance-grey.png';
import FinanceWhite from './finance-white.png';
import NotesGrey from './notes-grey.png';
import NotesWhite from './notes-white.png';
import TasksGrey from './tasks-grey.png';
import TasksWhite from './tasks-white.png';
import HealthGrey from './health-grey.png';
import HealthWhite from './health-white.png';

const Wrapper = styled.div`
  box-sizing: border-box;
  width: 386px;
  height: 100vh;
  background-color: #1b2028;
  padding: 48px 42px 56px;
`;

const ContentWrapper = styled.div`
  width: 100%;
  height: 100%;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  width: 100%;
  height: 74px;
  margin-bottom: 75px;
`;

const LogoImg = styled.div`
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background-color: #3a6ff7;
`;

const LogoTitle = styled.div`
  flex-grow: 1;
  text-align: center;
  line-height: 74px;
  font-size: 40px;
  font-weight: 800;
  color: white;
`;

const OptionContainer = styled.div`
  height: 560px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-bottom: 200px;
`;

const LogOut = styled.div`
  width: 100%;
  height: 42px;
  background-color: green;
`;

export default function Menu() {
  const options = [
    { label: 'DASHBOARD', selectedImg: DashboardWhite, img: DashboardGrey },
    { label: 'FINANCE', selectedImg: FinanceWhite, img: FinanceGrey },
    { label: 'NOTES', selectedImg: NotesWhite, img: NotesGrey },
    { label: 'TASKS', selectedImg: TasksWhite, img: TasksGrey },
    { label: 'HEALTH', selectedImg: HealthWhite, img: HealthGrey },
  ];
  const [selectedOption, setSelectedOption] = useState('DASHBOARD');

  function selectOption(label) {
    setSelectedOption(label);
  }

  return (
    <Wrapper>
      <ContentWrapper>
        <Logo>
          <LogoImg />
          <LogoTitle>InfoSnap</LogoTitle>
        </Logo>
        <OptionContainer>
          {options.map((option, index) =>
            option.label === selectedOption ? (
              <Button key={index} selected>
                <Icon width='30px' imgUrl={option.selectedImg} />
                {option.label}
              </Button>
            ) : (
              <Title
                key={index}
                height='42px'
                onClick={() => selectOption(option.label)}
              >
                <Icon width='30px' imgUrl={option.img} />
                {option.label}
              </Title>
            )
          )}
        </OptionContainer>
        <LogOut></LogOut>
      </ContentWrapper>
    </Wrapper>
  );
}
