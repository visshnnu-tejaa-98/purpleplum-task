import logo from "./logo.svg";
import "./App.css";
import HomePage from "./screens/Home";
import { Link } from "react-router-dom";
import { useState } from "react";

function App() {
  return (
    <div className="App">
      <HomePage />
    </div>
  );
}

export default App;
