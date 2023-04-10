import { useState, useEffect, useReducer } from 'react';
import styled from 'styled-components/macro';

const Wrapper = styled.div`
  width: 100%;
`;

const Main = styled.main`
  width: 70%;
  height: 500px;
  margin: 50px auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Input = styled.textarea`
  width: 50%;
  height: 300px;
  border: 1px solid black;
  font-size: ${(props) => props.fontSize};
`;

const Test = styled.div`
  width: 50%;
  height: 200px;
  border: 1px solid black;
  margin-top: 50px;
`;

const ToggleList = styled.div`
  display: flex;
  flex-direction: column;
  width: 100px;
  border: 1px solid black;
  display: ${(props) => props.display};
  position: absolute;
`;

const Option = styled.button`
  width: 100%;
  height: 30px;
  text-align: center;
  cursor: pointer;
  border: 0;
  border-bottom: 1px solid black;
  background-color: white;
`;

export default function SlashCommand() {
  function reducer(state, action) {
    switch (action.type) {
      case 'ADD_H1': {
      }
      default: {
        return state;
      }
    }
  }
  const commands = ['h1', 'h2', 'h3'];
  const [isSlashed, setIsSlashed] = useState(false);
  const [userInput, setUserInput] = useState({ text: '', style: '' });
  const [text, setText] = useState('');
  const [rawText, setRawText] = useState('');

  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === '/') {
        setIsSlashed(true);
        console.log('slash!');
      } else {
        setIsSlashed(false);
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  function handleInput(e) {
    const range = window.getSelection().getRangeAt(0);
    console.log(range);
    const newInput = { ...userInput };
    newInput.text = e.target.value;
    setUserInput(newInput);
  }

  function selectCommand() {
    const newText = text + `<span style="font-size: 40px;"></span>`;
    console.log(newText);
  }

  function parseInput(data) {
    const parser = new DOMParser();
    const parsed = parser.parseFromString(data, 'text/html');
    const newText = parsed.body.textContent;
    return newText;
  }

  function handleTextChange(e) {
    setRawText(e.target.innerHTML);
    if (text) {
      const newTexts = e.target.innerHTML;
      const parsedTexts = parseInput(newTexts);
      setText(parsedTexts);
    }
    return;
  }

  function addText() {
    const newTexts = rawText + `<span style="font-size: 30px;">NEW!</span>`;
    setRawText(newTexts);
  }

  useEffect(() => console.log(rawText), [rawText]);

  return (
    <Wrapper>
      <Main>
        <ToggleList display={isSlashed ? 'block' : 'none'}>
          {commands.map((command, index) => (
            <div key={index}>
              <Option onClick={() => selectCommand(command)}>{command}</Option>
            </div>
          ))}
        </ToggleList>
        <Input onChange={handleInput} value={userInput.text} fontSize={20} />
        <Test
          contentEditable
          suppressContentEditableWarning
          onInput={handleTextChange}
          dangerouslySetInnerHTML={{ __html: rawText }}
        ></Test>
        <button onClick={addText}>ADD!</button>
      </Main>
    </Wrapper>
  );
}
