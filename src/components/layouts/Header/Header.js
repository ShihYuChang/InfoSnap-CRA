import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components/macro';
import { StateContext } from '../../../context/stateContext';
import { UserContext } from '../../../context/userContext';
import SearchBar from '../../SearchBar/SearchBar';
import calendar from './calendar.png';
import Button from '../../Buttons/Button';
import { Calendar, theme, ConfigProvider } from 'antd';
import Icon from '../../Icon';
import { useEffect } from 'react';

const Wrapper = styled.div`
  width: 100%;
  height: 74px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  background-color: #31353f;
  top: 0;
  z-index: 100;
`;

const Title = styled.h1`
  width: 260px;
  line-height: 74px;
  font-size: 24px;
  color: white;
  flex-shrink: 0;
`;

const Profile = styled.div`
  display: flex;
  gap: 20px;
  width: 200px;
  height: 100%;
  align-items: center;
  justify-content: end;
  color: white;
  cursor: pointer;
`;

const ProfilePic = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background-color: #9e9e9e;
`;

const IconWrapper = styled.div`
  box-sizing: border-box;
  width: 50px;
  height: 50px;
  background-color: #1b2028;
  border-radius: 10px;
  position: relative;
  flex-shrink: 0;
  /* margin-left: 50px; */
  cursor: pointer;
`;

const BlackBgIcon = styled.div`
  background-image: url(${(props) => props.imgUrl});
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-size: contain;
  width: 35px;
  height: 35px;
`;

const CalendarWrapper = styled.div`
  display: ${({ display }) => display};
  position: absolute;
  z-index: 10;
  top: 120px;
`;

const DateContainer = styled.div`
  width: 220px;
  display: flex;
  gap: 10px;
  align-items: center;
  margin-right: 20px;
`;

const Icons = styled.div`
  display: flex;
  justify-content: space-around;
  flex-grow: 1;
  align-items: center;
`;

const AutocompleteRow = styled.div`
  box-sizing: border-box;
  width: 100%;
  display: flex;
  justify-content: space-between;
  gap: 20px;
  cursor: pointer;
  border-radius: 10px;
  padding: 10px;

  &:hover {
    background-color: #3a6ff7;
  }
`;

const AutocompleteText = styled.div`
  flex-grow: 1;
`;

const AutocompleteTag = styled.div`
  height: 35px;
  background-color: ${(props) => props.backgourndColor};
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  width: 100px;
`;

const tags = ['Finance', 'Notes', 'Tasks', 'Health'];

export default function Header({ children }) {
  const navigate = useNavigate();
  const { selectedOption, headerIcons, selectedDate, setSelectedDate } =
    useContext(StateContext);
  const { token } = theme.useToken();
  const [isSelectingDate, setIsSelectingDate] = useState(false);
  const [userInput, setUserInput] = useState('');
  const { setHasSearch, allData } = useContext(UserContext);
  const [matchedData, setMatchedData] = useState({
    finance: null,
    notes: null,
    tasks: null,
    health: null,
  });

  const wrapperStyle = {
    width: 300,
    border: `1px solid ${token.colorBorderSecondary}`,
    borderRadius: token.borderRadiusLG,
    backgroundColor: token.colorInfo,
  };

  function selectDate(date) {
    setSelectedDate(date);
    setIsSelectingDate(false);
  }

  function clickCalendar() {
    setIsSelectingDate((prev) => !prev);
  }

  function searchEverything() {
    navigate(`/search?keyword=${userInput}`);
    setHasSearch(true);
  }

  useEffect(() => {
    const newData = { ...matchedData };
    const financeMatch = allData.finance?.filter((item) =>
      item.content.note
        .toLowerCase()
        .replace(' ', '')
        .includes(userInput.toLowerCase())
    );
    const notesMatch = allData.notes?.filter(
      (item) =>
        item.content.context.toLowerCase().includes(userInput.toLowerCase()) ||
        item.content.title
          .toLowerCase()
          .replace(' ', '')
          .includes(userInput.toLowerCase())
    );
    const tasksMatch = allData.tasks?.filter((item) =>
      item.content.task
        .toLowerCase()
        .replace(' ', '')
        .includes(userInput.toLowerCase())
    );
    const healthMatch = allData.health?.filter((item) =>
      item.content.note
        .toLowerCase()
        .replace(' ', '')
        .includes(userInput.toLowerCase())
    );
    newData.finance = financeMatch;
    newData.notes = notesMatch;
    newData.tasks = tasksMatch;
    newData.health = healthMatch;
    console.log(newData);
    setMatchedData(newData);
  }, [userInput]);

  // console.log(selectedDate);
  return (
    <Wrapper>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: '#3a6ff7',
            colorBgContainer: '#1B2028',
            colorText: 'white',
          },
        }}
      >
        <CalendarWrapper display={isSelectingDate ? 'block' : 'none'}>
          <div style={wrapperStyle}>
            <Calendar
              fullscreen={false}
              onSelect={(value) => selectDate(value.format('YYYY-MM-DD'))}
            />
          </div>
        </CalendarWrapper>
      </ConfigProvider>
      <DateContainer>
        <IconWrapper>
          <BlackBgIcon imgUrl={calendar} onClick={clickCalendar} />
        </IconWrapper>
        {typeof selectedDate === 'string' ? (
          <Title>{selectedDate}</Title>
        ) : null}
      </DateContainer>
      <SearchBar
        hasSearchIcon
        autocompleteDisplay={userInput === '' ? 'none' : 'flex'}
        onChange={(e) => setUserInput(e.target.value)}
        onSubmit={(e) => {
          e.preventDefault();
          searchEverything();
        }}
      >
        {matchedData.finance?.map((item, index) => (
          <AutocompleteRow key={index}>
            <AutocompleteText>
              {item.content.note ?? item.content.task ?? item.content.title}
            </AutocompleteText>
            {/* <AutocompleteText>
              {item.content.created_time?.toDate().toLocaleString() ??
                item.content.date?.toDate().toLocaleString() ??
                item.content.expireDate?.toDate().toLocaleString()}
            </AutocompleteText> */}
            <AutocompleteTag backgourndColor='#3a6ff7'>Finance</AutocompleteTag>
          </AutocompleteRow>
        ))}
      </SearchBar>
      {headerIcons.length > 0 ? (
        <Icons>
          {headerIcons.map((icon, index) =>
            icon.button ? (
              <Button
                featured
                width={icon.width}
                textAlignment='center'
                height='50px'
                onClick={icon.onClick}
              >
                {icon.text}
              </Button>
            ) : icon.type === 'add' ? (
              <Icon type={icon.type} width='40px' onClick={icon.onClick} />
            ) : (
              <IconWrapper key={index} onClick={icon.onClick}>
                <BlackBgIcon imgUrl={icon.imgUrl} type={icon.type} />
              </IconWrapper>
            )
          )}
        </Icons>
      ) : null}
      {children}
      <Profile>
        <ProfilePic />
        Samuel Chang
      </Profile>
    </Wrapper>
  );
}
