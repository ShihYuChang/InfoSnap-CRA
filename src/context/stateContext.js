import { createContext, useState, useEffect, useContext } from 'react';
import { onSnapshot, doc, collection } from 'firebase/firestore';
import { db } from '../firebase';
import { UserContext } from './userContext';

export const StateContext = createContext({
  isAdding: false,
  isSearching: false,
  dailyBudget: null,
  userData: {},
  expenseRecords: [],
  todayBudget: 0,
  setIsSearching: () => {},
  setIsAdding: () => {},
  setDailyBudget: () => {},
  setUserData: () => {},
  setExpenseRecords: () => {},
  setTodayBudget: () => {},
});

export const StateContextProvider = ({ children }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [dailyBudget, setDailyBudget] = useState(null);
  const [userData, setUserData] = useState({});
  const [expenseRecords, setExpenseRecords] = useState([]);
  const [dailyTotalExpense, setDailyTotalExpense] = useState([]);
  const [todayBudget, setTodayBudget] = useState(0);
  const { email } = useContext(UserContext);

  function getTotalExpense(data) {
    return data.reduce((acc, cur) => {
      return acc + Number(cur.amount);
    }, 0);
  }

  function getDaysLeft(date) {
    const now = new Date(date);
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    const diffInMs = endOfMonth - now;
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24)) + 1;
    return diffInDays;
  }

  function parseTimestamp(timestamp) {
    const date = new Date(
      timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000
    );
    const formattedDate = date.toISOString().substring(0, 10);
    return formattedDate;
  }

  useEffect(() => {
    const userUnsub = onSnapshot(doc(db, 'Users', email), (doc) => {
      const data = doc.data();
      const income = data.monthlyIncome;
      const goal = data.savingsGoal;
      setUserData({ income: income, savingsGoal: goal });
    });

    const financeUnsub = onSnapshot(
      collection(db, 'Users', email, 'Finance'),
      (docs) => {
        const records = [];
        docs.forEach((doc) => records.push(doc.data()));
        setExpenseRecords(records);
      }
    );
    return () => {
      userUnsub();
      financeUnsub();
    };
  }, []);

  useEffect(() => {
    const dailyBudget = Math.round(
      Number(userData.income - getTotalExpense(expenseRecords)) / getDaysLeft(0)
    );

    const records = [...expenseRecords];
    const dailyExpense = records.reduce((acc, cur) => {
      const date = parseTimestamp(cur.date);
      const amount = Number(cur.amount);
      acc[date] = (acc[date] || 0) + amount;
      return acc;
    }, {});

    const today = new Date().toISOString().slice(0, 10);
    const todayExpense = dailyExpense[today];
    const todayBudget = dailyBudget - todayExpense;
    setTodayBudget(todayBudget);
    setDailyTotalExpense(dailyExpense);
    setDailyBudget(dailyBudget);
  }, [userData, expenseRecords]);

  return (
    <StateContext.Provider
      value={{
        isAdding,
        isSearching,
        setIsAdding,
        setIsSearching,
        dailyBudget,
        setDailyBudget,
        userData,
        setUserData,
        expenseRecords,
        setExpenseRecords,
        todayBudget,
        setTodayBudget,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};
