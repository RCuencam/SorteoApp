import { HashRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Reload from "./components/Reload";
import AppProvider from "./context/AppProvider";
import Home from "./views/Home";
import Sorteo from "./views/Sorteo";

function App() {
  return (
    <div className="App">
      <AppProvider>
        <HashRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/sorteo/:id" element={<Sorteo />} />
            <Route path="/sorteo/:id/extras" element={<Sorteo />} />
            <Route path="/sorteo/extras" element={<Sorteo />} />
            <Route exact path="/reset" element={<Reload />} />
          </Routes>
        </HashRouter>
      </AppProvider>
    </div>
  );
}

export default App;
