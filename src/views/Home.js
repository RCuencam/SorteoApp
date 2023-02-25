import Logo from "../assets/principal_background.jpg";
import { Link, Navigate, useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="home">
      <div className="home_logo">
        <img src={Logo} alt="" onClick={() => navigate("/sorteo")} />
      </div>
      {/*<div className="home_buttons">
        <Link to="/sorteo/1">
          <button>Sorteo 1</button>
        </Link>
        <Link to="/sorteo/2">
          <button>Sorteo 2</button>
        </Link>
        <Link to="/sorteo/3">
          <button>Sorteo 3</button>
        </Link>
        <Link to="/sorteo/extras">
          <button>Extras</button>
        </Link>
        </div>*/}
    </div>
  );
};

export default Home;
