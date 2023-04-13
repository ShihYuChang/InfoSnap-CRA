import { useState, useEffect, useCallback, useContext } from 'react';
import ReactLoading from 'react-loading';
import styled from 'styled-components/macro';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { UserContextProvider, UserContext } from './context/userContext';
import { EventContextProvider } from './context/eventContext';
import { StateContextProvider } from './context/stateContext';
import { DashboardContextProvider } from './context/dashboardContext';
import { createGlobalStyle } from 'styled-components';
import Header from './components/Header/Header';
import { Outlet } from 'react-router-dom';
import SignInPrompt from './pages/Authentication/SignInPrompt';
import SignIn from './pages/Authentication/SignIn';

const GlobalStyle = createGlobalStyle`
  #root{
    position: relative;
  }
`;

const Loading = styled(ReactLoading)`
  margin: 50px auto;
`;

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isSignIn, setIsSignIn] = useState(false);
  const [hasClickedSignIn, setHasClickedSignIn] = useState(false);

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoading(false);
        setIsSignIn(true);
      } else {
        setIsLoading(false);
        setIsSignIn(false);
      }
    });
  }, []);

  if (isLoading) {
    return (
      <>
        <Header />
        <Loading type='spinningBubbles' color='#313538' />
      </>
    );
  } else if (!isLoading && !isSignIn) {
    return (
      <>
        <Header />
        <SignInPrompt
          onClick={() => {
            setHasClickedSignIn(true);
          }}
          display={hasClickedSignIn ? 'none' : 'flex'}
        />
        <SignIn display={hasClickedSignIn ? 'flex' : 'none'} />
      </>
    );
  }

  return (
    <>
      <GlobalStyle />
      <UserContextProvider>
        <EventContextProvider>
          <StateContextProvider>
            <DashboardContextProvider>
              <Header />
              <Outlet />
            </DashboardContextProvider>
          </StateContextProvider>
        </EventContextProvider>
      </UserContextProvider>
    </>
  );
}
