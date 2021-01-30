import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from "./components/navbar.component";
import ExerciseList from "./components/exercises-list.component";
import EditExercise from "./components/edit-exercise.component";
import CreateExercise from "./components/create-exercise.component";
import RegisterUser from "./components/register-user.component";
import LoginUser from "./components/login-user.component";
function App() {
  return (
    <Router>
      <Navbar />
      <br />
      <div className="container">
        <Route path="/" exact component={LoginUser} />
        <Route path="/homepage" component={ExerciseList} />
        <Route path="/edit/:id" component={EditExercise} />
        <Route path="/create" component={CreateExercise} />
        <Route path="/user/register" component={RegisterUser} />
      </div>
    </Router>
  );
}

export default App;
