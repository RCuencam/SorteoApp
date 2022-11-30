import { useEffect, useState } from "react";
import { usersData } from "../data/users";
import { AppContext } from "./context";

const AppProvider = ({ children }) => {
  const [users, setUsers] = useState(
    JSON.parse(localStorage.getItem("users")) || []
  );

  const [randomNumbers, setRandomNumbers] = useState([]);
  const [tablas, setTablas] = useState(
    JSON.parse(localStorage.getItem("tablas")) || [
      {
        id: 1,
        winners: [],
      },
      {
        id: 2,
        winners: [],
      },
      {
        id: 3,
        winners: [],
      },
      {
        id: 4,
        winners: [],
      },
    ]
  );

  const [buttons, setButtons] = useState([
    {
      id: 1,
      intentos: 0,
    },
    {
      id: 2,
      intentos: 0,
    },
    {
      id: 3,
      intentos: 0,
    },
  ]);

  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("tablas", JSON.stringify(tablas));
    localStorage.setItem("buttons", JSON.stringify(buttons));
  }, [tablas, users, buttons]);

  return (
    <AppContext.Provider
      value={{
        users,
        setUsers,
        randomNumbers,
        setRandomNumbers,
        tablas,
        setTablas,
        buttons,
        setButtons,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
