import { Component } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import DataPath from "./components/DataPath";
import "./App.css";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/data" element={<DataPath />} />
        </Routes>
      </BrowserRouter>
    );
  }
}
export default App;
