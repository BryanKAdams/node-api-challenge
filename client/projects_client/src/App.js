import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Route } from "react-router-dom";
import Projects from "./components/ProjectList";
import Project from "./components/Project";

function App() {
  return (
    <div className="App">
      <Route exact path="/" component={Projects} />
      <Route exact path="/projects/:id" component={Project} />
    </div>
  );
}

export default App;
