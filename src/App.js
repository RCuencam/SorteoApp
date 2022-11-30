import { HashRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Reload from "./components/Reload";
import AppProvider from "./context/AppProvider";
import { Ganadores } from "./views/Ganadores";
import Home from "./views/Home";
import { Participantes } from "./views/Participantes";
import Sorteo from "./views/Sorteo";

/*
<AppProvider>
        <HashRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/sorteo/:id" element={<Sorteo />} />
            <Route path="/sorteo/:id/extras" element={<Sorteo />} />
            <Route path="/sorteo/extras" element={<Sorteo />} />
            <Route path="/ganadores" element={<Ganadores />} />
            <Route path="/participantes" element={<Participantes />} />
            <Route exact path="/reset" element={<Reload />} />
          </Routes>
        </HashRouter>
</AppProvider>
*/
function App() {
  return (
    <div className="App">
      <AppProvider>
        <HashRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/sorteo" element={<Sorteo />} />
            <Route path="/ganadores" element={<Ganadores />} />
            <Route path="/participantes" element={<Participantes />} />
            <Route exact path="/reset" element={<Reload />} />
          </Routes>
        </HashRouter>
      </AppProvider>
    </div>
  );
}

export default App;
