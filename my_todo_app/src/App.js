import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./component/Header";
import {Main} from './pages/Main';
import {Todo} from './pages/Todo';

function App() {
  return (
   <BrowserRouter>
   {/* <Header /> */}
    <Routes>
      <Route path="/" element={<Main />}></Route>
      <Route path="/todo" element={<Todo />}></Route>
    </Routes>
   </BrowserRouter>
  );
}

export default App;
