import { useNavigate, useParams } from "react-router-dom";
import { useContext, useRef, useState } from "react";
import { AppContext } from "../context/context";
import  Header  from "../assets/header.png";

const Sorteo = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [bloques, setBloques] = useState(5);
  const [intentos, setIntentos] = useState(0);

  const [numWinners, setNumWinners] = useState(
    id === "1" ? 3 : id === "2" ? 2 : 1
  );

  const stopRoll = useRef(false);

  const [sorteoButton, setSorteoButton] = useState(false);
  const [stopButton, setStopButton] = useState(false);
  const [backButton, setBackButton] = useState(false);

  const {
    users,
    setUsers,
    randomNumbers,
    setRandomNumbers,
    tablas,
    setTablas,
    buttons,
    setButtons,
  } = useContext(AppContext);

  const [user1, setUser1] = useState({
    id: "example1",
    name: "",
  });
  const [user2, setUser2] = useState({
    id: "example2",
    name: "",
  });
  const [user3, setUser3] = useState({
    id: "example3",
    name: "",
  });

  const timer = useRef(null);

  const removeWinners = (id1, id2, id3) => {
    if (id === "1") {
      setUsers(
        users.filter(
          (item) => item.id !== id1 && item.id !== id2 && item.id !== id3
        )
      );
    } else if (id === "2") {
      setUsers(users.filter((item) => item.id !== id1 && item.id !== id2));
    } else {
      setUsers(users.filter((item) => item.id !== id3));
    }
  };

  const saveWinners = (user1, user2, user3) => {
    if (id === "1") {
      setTablas(
        tablas.map((item) =>
          item.id === 1
            ? { ...item, winners: [...item.winners, user1, user2, user3] }
            : item
        )
      );
    } else if (id === "2") {
      setTablas(
        tablas.map((item) =>
          item.id === 2
            ? { ...item, winners: [...item.winners, user1, user2] }
            : item
        )
      );
    } else if (id === "3") {
      setTablas(
        tablas.map((item) =>
          item.id === 3 ? { ...item, winners: [...item.winners, user3] } : item
        )
      );
    } else {
      setTablas(
        tablas.map((item) =>
          item.id === 4 ? { ...item, winners: [...item.winners, user3] } : item
        )
      );
    }
  };

  const saveRandomNumbers = (num1, num2, num3) => {
    if (id === "1") {
      setRandomNumbers([...randomNumbers, num1, num2, num3]);
    } else if (id === "2") {
      setRandomNumbers([...randomNumbers, num1, num2]);
    } else {
      setRandomNumbers([...randomNumbers, num3]);
    }
  };

  const raffle = () => {
    setSorteoButton(true);
    setBackButton(true);

    id && setBloques((item) => item - 1);
    id && setIntentos((item) => item + 1);
    id && setIntentosButton();
    stopRoll.current = false;

    timer.current = setInterval(() => {
      let randomNumber1 = Math.floor(Math.random() * users.length);
      let randomNumber2 = Math.floor(Math.random() * users.length);
      let randomNumber3 = Math.floor(Math.random() * users.length);

      /*if (
        randomNumber1 === randomNumber2 ||
        randomNumber1 === randomNumber3 ||
        randomNumber2 === randomNumber3
      ) {
        return;
      } else {
        setUser1(users[randomNumber1]);
        setUser2(users[randomNumber2]);
        setUser3(users[randomNumber3]);
      }*/
      if (users.length > 0) {
        setUser3(users[randomNumber3]);
      }

      if (stopRoll.current) {
        clearInterval(timer.current);
        if (users.length > 0) {
          saveWinners(
            users[randomNumber1],
            users[randomNumber2],
            users[randomNumber3]
          );
          removeWinners(
            users[randomNumber1].id,
            users[randomNumber2].id,
            users[randomNumber3].id
          );
        }
        /*saveWinners(
          users[randomNumber1],
          users[randomNumber2],
          users[randomNumber3]
        );

        removeWinners(
          users[randomNumber1].id,
          users[randomNumber2].id,
          users[randomNumber3].id
        );*/

        if (
          randomNumbers.includes(randomNumber1) ||
          randomNumbers.includes(randomNumber2) ||
          randomNumbers.includes(randomNumber3)
        ) {
          setUser1(users[randomNumber1]);
          setUser2(users[randomNumber2]);
          setUser3(users[randomNumber3]);
        } else {
          saveRandomNumbers(randomNumber1, randomNumber2, randomNumber3);
        }
      }
    }, 40);
  };

  const stop = () => {
    stopRoll.current = true;
    if (bloques !== 0) {
      setSorteoButton(false);
    }
    if (bloques === 0) {
      setStopButton(true);
    }
    setBackButton(false);
  };

  const setIntentosButton = () => {
    if (id === "1") {
      setButtons(
        buttons.map((item) =>
          item.id === 1 ? { ...item, intentos: item.intentos + 1 } : item
        )
      );
    } else if (id === "2") {
      setButtons(
        buttons.map((item) =>
          item.id === 2 ? { ...item, intentos: item.intentos + 1 } : item
        )
      );
    } else {
      setButtons(
        buttons.map((item) =>
          item.id === 3 ? { ...item, intentos: item.intentos + 1 } : item
        )
      );
    }
  };

  const getIntentos = () => {
    if (id === "1") {
      return buttons[0]?.intentos;
    } else if (id === "2") {
      return buttons[1]?.intentos;
    } else {
      return buttons[2]?.intentos;
    }
  };

  const intentosValidator = () => {
    if (id === "1") {
      return buttons[0].intentos === 5 ? true : false;
    } else if (id === "2") {
      return buttons[1].intentos === 5 ? true : false;
    } else {
      return buttons[2].intentos === 5 && id ? true : false;
    }
  };

  return (
    <div className="sorteo_container">
      <div className="goBack" onClick={() => navigate("/")}></div>
      <div className="sorteo_container_img">{<img src={Header} alt="" />}</div>
      <div className="questions-background">
        <div className="questions_container">
          <div className="questions_container_winners">
            {numWinners === 3 ? (
              <div>
                <p>{user1?.name}</p>
                <p>{user2?.name}</p>
                <p>{user3?.name}</p>
              </div>
            ) : numWinners === 2 ? (
              <div>
                <p>{user1?.name}</p>
                <p>{user2?.name}</p>
              </div>
            ) : (
              <div className="user_name">
                <p>{user3?.name}</p>
              </div>
            )}
          </div>
          <div className="questions_container_buttons">
            <button
              onClick={raffle}
              disabled={sorteoButton || intentosValidator()}
              className={
                sorteoButton || intentosValidator() ? "button-disabled" : ""
              }
            >
              Sorteo {id && getIntentos() + " " + "-" + " " + "5"}
            </button>
            <button
              onClick={stop}
              disabled={stopButton}
              className={stopButton ? "button-disabled" : ""}
            >
              Stop
            </button>
            {/*<Link to={!backButton && "/ganadores"}>
              <button
                disabled={backButton}
                className={backButton ? "button-disabled" : ""}
              >
                <GrRotateLeft size={25} />
              </button>
            </Link>*/}
          </div>
          {/*<div className="table_winners">
            <div className="table_winners_container">
              <table>
                <thead>
                  <tr>
                    <th>Ganadores</th>
                  </tr>
                </thead>
                <tbody>
                  {id === "1"
                    ? tablas[0]?.winners.map((item) => (
                        <tr key={item?.id}>
                          <td>{item?.name}</td>
                        </tr>
                      ))
                    : id === "2"
                    ? tablas[1]?.winners.map((item) => (
                        <tr key={item?.id}>
                          <td>{item?.name}</td>
                        </tr>
                      ))
                    : id === "3"
                    ? tablas[2]?.winners.map((item) => (
                        <tr key={item?.id}>
                          <td>{item?.name}</td>
                        </tr>
                      ))
                    : tablas[3]?.winners.map((item) => (
                        <tr key={item?.id}>
                          <td>{item?.name}</td>
                        </tr>
                      ))}
                </tbody>
              </table>
            </div>
                    </div>*/}
        </div>
      </div>
    </div>
  );
};

export default Sorteo;
