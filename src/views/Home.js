import Logo from "../assets/home-logo.jpg";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="home">
      <div className="home_logo">
        <img src={Logo} alt="" />
      </div>
      <div className="home_buttons">
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
      </div>
    </div>
  );
};

export default Home;
