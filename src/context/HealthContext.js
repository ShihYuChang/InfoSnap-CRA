import { createContext, useEffect, useState } from 'react';

const initialNutrition = [
  { title: 'Protein', total: 0, goal: 170 },
  { title: 'Carbs', total: 0, goal: 347 },
  { title: 'Fat', total: 0, goal: 69 },
];

export const HealthContext = createContext({
  intakeRecords: [],
  searchedFood: [],
  selectedFood: null,
  nutritions: initialNutrition,
  isLoading: false,
  setSearchedFood: () => {},
  setSelectedFood: () => {},
  setNutritions: () => {},
  setIntakeRecords: () => {},
  setIsLoading: () => {},
});

function getNutritionTotal(data) {
  const contents = [];
  data.forEach((obj) => contents.push(obj.content));
  const totals = contents.reduce(
    (acc, cur) => {
      return {
        protein: Number(acc.protein) + Number(cur.protein),
        carbs: Number(acc.carbs) + Number(cur.carbs),
        fat: Number(acc.fat) + Number(cur.fat),
      };
    },
    { protein: 0, carbs: 0, fat: 0 }
  );
  return totals;
}

export const HealthContextProvider = ({ children }) => {
  const [intakeRecords, setIntakeRecords] = useState([]);
  const [nutritions, setNutritions] = useState(initialNutrition);
  const [searchedFood, setSearchedFood] = useState([]);
  const [selectedFood, setSelectedFood] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  function updateData(rawData) {
    const newData = [...rawData];
    const intakeToday = getNutritionTotal(intakeRecords);
    newData.forEach((data) => {
      const name = data.title.toLowerCase();
      data.total = intakeToday[name];
    });
    return newData;
  }

  useEffect(() => {
    if (intakeRecords) {
      setNutritions(updateData(nutritions));
    }
  }, [intakeRecords]);

  return (
    <HealthContext.Provider
      value={{
        searchedFood,
        setSearchedFood,
        selectedFood,
        setSelectedFood,
        nutritions,
        setNutritions,
        intakeRecords,
        setIntakeRecords,
        isLoading,
        setIsLoading,
      }}
    >
      {children}
    </HealthContext.Provider>
  );
};