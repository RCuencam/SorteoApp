import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Reload = () => {
  const reload = useNavigate();
  useEffect(() => {
    console.log("entra");
    localStorage.removeItem("users");
    localStorage.removeItem("tablas");
    localStorage.removeItem("buttons");
    reload("/");
    window.location.reload();
  }, []);
};

export default Reload;
