import {Route, Routes} from "react-router-dom";
import Register from "./components/auth/register";
import Login from "./components/auth/login";
import Board from "./components/Board";
import BoardInFolder from "./components/BoardInFolder";

function App() {
  return (
      <div>
        <Routes>
            <Route path="/registration" element={ <Register/> } />
            <Route path="/login" element={ <Login/> } />
            <Route path="/" element={ <Board/> } />
            <Route path="/:id" element={ <BoardInFolder/> } />
        </Routes>
      </div>
  );
}

export default App;