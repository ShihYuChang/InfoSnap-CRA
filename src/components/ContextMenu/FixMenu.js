import React from 'react';
import styled from 'styled-components/macro';

const FixedMenu = styled.div`
  display: flex;
  height: ${(props) => props.height};
  width: 200px;
  box-sizing: border-box;
  background-color: #a4a4a3;
  position: fixed;
  bottom: ${({ bottom }) => bottom};
  right: ${({ right }) => right};
  border-radius: 10px;
  flex-direction: column;
  transition: all, 0.5s;
  visibility: ${(props) => props.vilble};
  z-index: 100;
`;

const FixedMenuText = styled.div`
  padding: 30px;
  font-size: 20px;
  border-radius: 10px;
  cursor: pointer;
  text-align: center;

  &:hover {
    background-color: #3a6ff7;
  }
`;

export default function FixMenu({
  options,
  height,
  optionIsVisible,
  bottom,
  right,
}) {
  return (
    <FixedMenu height={height} bottom={bottom} right={right}>
      {options.map((option, index) =>
        optionIsVisible ? (
          <FixedMenuText key={index} onClick={option.onClick}>
            {option.label}
          </FixedMenuText>
        ) : null
      )}
    </FixedMenu>
  );
}
