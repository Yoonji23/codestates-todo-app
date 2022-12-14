import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./component/Header";
import {Main} from './pages/Main';


function App() {
  return (
   <BrowserRouter>
   <Header />
    <Routes>
      <Route path="/" element={<Main />}></Route>
    </Routes>
   </BrowserRouter>
  );
}

export default App;
