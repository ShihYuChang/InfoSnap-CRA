import styled from 'styled-components/macro';
import Logo from '../../components/Logo/Logo';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import GoogleLogin from '../../components/GoogleLogin';
import { BsFillEyeFill } from 'react-icons/bs';
import { useState } from 'react';

const Wrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const IntroContainer = styled.div`
  box-sizing: border-box;
  width: 540px;
  height: 575px;
  display: ${(props) => props.display};
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #1b2028;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Title = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 800;
  font-size: 36px;
  letter-spacing: 5px;
  margin-bottom: 32px;
`;

const QuestionWrapper = styled.div`
  width: 380px;
  display: flex;
  flex-direction: column;
  gap: 34px;
  margin-bottom: 34px;
`;

const Question = styled.form`
  width: 100%;
  position: relative;
`;

const InputDescription = styled.div`
  position: absolute;
  font-size: 12px;
  color: #3c3c3c;
  top: 5px;
  left: 15px;
  z-index: 10;
`;

const InputBar = styled.input`
  box-sizing: border-box;
  width: 100%;
  height: 50px;
  border-radius: 10px;
  border: 0;
  outline: none;
  background-color: #8e8e8e;
  color: white;
  padding: 20px 14px 0;

  &:focus {
    border: 2px solid #3a6ff7;
    + ${InputDescription} {
      color: #3a6ff7;
    }
  }
`;

const ButtonWrapper = styled.div`
  width: 380px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 20px;
`;

const IconWrapper = styled.div`
  position: absolute;
  top: 14px;
  right: 30px;
  cursor: pointer;

  &:hover {
    color: #3a6ff7;
  }
`;

const Button = styled.button`
  width: 100%;
  height: 50px;
  border-radius: 10px;
  border: 0;
  outline: none;
  color: white;
  letter-spacing: 2px;
  background-color: ${(props) => props.backgroundColor};
`;

const SignUpPrompt = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 5px;
  cursor: pointer;
`;

const LogoWrapper = styled.div`
  width: 150px;
  position: absolute;
  top: 23px;
  left: 44px;
`;

const PromptText = styled.div`
  color: ${(props) => props.color};
`;

export default function SignInPrompt({ onClick, display }) {
  const [passwordIsVisible, setPasswordIsVisible] = useState(false);
  const [userInput, setUserInput] = useState({});
  const questions = [
    { label: 'Email', value: 'email', type: 'email' },
    {
      label: 'Password',
      value: 'password',
      type: passwordIsVisible ? 'text' : 'password',
    },
  ];

  const buttons = [
    { label: 'SIGN IN', bgColor: '#45C489' },
    // { label: 'SIGN IN WITH GOOGLE', bgColor: '#3a6ff7' },
  ];

  function handleInput(value, e) {
    const inputs = { ...userInput, [value]: e.target.value };
    setUserInput(inputs);
  }

  function signIn(e) {
    e.preventDefault();
    const auth = getAuth();
    signInWithEmailAndPassword(auth, userInput.email, userInput.password)
      .then((userCredential) => {
        alert('Login Success!');
        window.location.href = '/';
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        if (errorCode === 'auth/user-not-found') {
          alert('User not found. Please sign up first.');
        } else if (errorCode === 'auth/wrong-password') {
          alert('Wrong password. Please try again.');
        } else {
          alert('Something went wrong. Please try again later.');
        }
        console.log(`Error Code: ${errorCode}
          Error Message: ${errorMessage}`);
      });
  }

  return (
    <Wrapper>
      <LogoWrapper>
        <Logo imgWidth='30px' titleFontSize='20px' />
      </LogoWrapper>
      <IntroContainer display={display}>
        <IntroContainer>
          <Title>SIGN IN</Title>
          <QuestionWrapper>
            {questions.map((question, index) => (
              <Question key={index} onSubmit={signIn}>
                <InputBar
                  type={question.type}
                  onChange={(e) => handleInput(question.value, e)}
                  required
                />
                <InputDescription>{question.label}</InputDescription>
                {question.value === 'password' && (
                  <IconWrapper
                    onClick={() => setPasswordIsVisible((prev) => !prev)}
                  >
                    <BsFillEyeFill size={25} />
                  </IconWrapper>
                )}
              </Question>
            ))}
          </QuestionWrapper>
          <ButtonWrapper>
            {buttons.map((button, index) => (
              <Button key={index} backgroundColor={button.bgColor}>
                {button.label}
              </Button>
            ))}
            <GoogleLogin />
          </ButtonWrapper>
          <SignUpPrompt>
            <PromptText color='#a4a4a3'>Do not have an account?</PromptText>
            <PromptText color='#3a6ff7'>Sign Up</PromptText>
          </SignUpPrompt>
        </IntroContainer>
      </IntroContainer>
    </Wrapper>
  );
}
