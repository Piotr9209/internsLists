import "./App.scss";
import { EditIntern } from "./components/editIntern/EditIntern";
import { InternList } from "./components/internList/InternList";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/interns/:id" exact element={<EditIntern />} />
      <Route path="/" element={<InternList />} />
    </Routes>
  );
}

export default App;
