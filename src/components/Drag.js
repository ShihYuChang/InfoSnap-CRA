import { useEffect, useState } from 'react';
import styled from 'styled-components';
import trash from './trash.png';

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
`;

const Container = styled.div`
  width: 500px;
  display: flex;
  gap: 50px;
  margin: 300px auto;
`;
const Box = styled.div`
  width: 300px;
  min-height: 500px;
  padding: 30px;
  border: 1px solid black;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

const Card = styled.div`
  width: 100px;
  height: 100px;
  background-color: yellow;
  text-align: center;
  line-height: 100px;
  border: 1px solid black;
  opacity: ${(props) => props.opacity};
`;

const AddCardBtn = styled.button`
  width: 100px;
  height: 50px;
  cursor: pointer;
`;

const CardContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const RemoveIcon = styled.div`
  width: 20px;
  height: 20px;
  background-image: url(${trash});
  background-size: cover;
  cursor: pointer;
`;

function allowDrop(event) {
  event.preventDefault();
}

export default function Drag() {
  const cards = ['Task A', 'Task B'];
  const [db, setDb] = useState(cards);
  const [isDragging, setIsDragging] = useState(false);
  const [selectedCard, setSelectedCard] = useState();
  function dragStart(event) {
    event.dataTransfer.setData('Text', event.target.id);
    setSelectedCard(Number(event.target.id));
    setIsDragging(true);
  }

  function drop(event) {
    event.preventDefault();
    const data = event.dataTransfer.getData('Text');
    const draggedElement = document.getElementById(data);
    if (event.target.className.includes('box')) {
      event.target.appendChild(draggedElement);
    }
    setIsDragging(false);
  }

  function addCard() {
    setDb([...db, 'Task C']);
  }

  function deleteCard(index) {
    const data = [...db];
    data.splice(index, 1);
    setDb(data);
  }

  if (!db) {
    return;
  }
  return (
    <Wrapper
      onDrop={() => {
        setIsDragging(false);
      }}
      onDragOver={(event) => {
        allowDrop(event);
      }}
    >
      <Container>
        <Box
          className='box'
          onDrop={drop}
          onDragOver={(event) => {
            allowDrop(event);
          }}
        >
          {db.map((card, index) => {
            return (
              <CardContainer>
                <Card
                  onDragStart={dragStart}
                  draggable={true}
                  id={index}
                  opacity={index === selectedCard && isDragging ? 0.01 : 1}
                  key={index}
                >
                  {card}
                </Card>
                <RemoveIcon
                  onClick={() => {
                    deleteCard(index);
                  }}
                />
              </CardContainer>
            );
          })}
          <AddCardBtn onClick={addCard}>Add a card</AddCardBtn>
        </Box>
        <Box onDrop={drop} onDragOver={allowDrop} className='box'></Box>
      </Container>
    </Wrapper>
  );
}
