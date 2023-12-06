import Table from "./Screens/table";
import Create from "./Screens/create";
import Update from "./Screens/update";
import { BrowserRouter, Routes, Route,  } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Table />} />
        <Route path="/create" element={<Create />} />
        <Route path="/update" element={<Update />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
