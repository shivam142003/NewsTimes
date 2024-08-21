import './App.css';
import Navbar from "./components/Navbar";
import News from "./components/News";
import React from 'react';
import{
  Routes,
  Route,
} from "react-router-dom";

const App=()=>{
    return (
      <div>
        <Navbar/>
        <Routes>
        <Route path="/" element={<News pageSize={5}/>}/>
        </Routes>
      </div>
    )
}

export default App;
