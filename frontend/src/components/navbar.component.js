import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Navbar extends Component {
  render() {
    return (
      <nav className="navbar navbar-dark bg-dark navbar-expand-sm">
        <Link to="/" className="navbar-brand">
          ExerciseTracker
        </Link>
        <div className="navbar-collapse">
          <ul className="navbar-nav mr-auto">
            <li className="navbar-item">
              <Link to="/homepage" className="nav-link">
                Exercises
              </Link>
            </li>
            <li className="navbar-item">
              <Link to="/create" className="nav-link">
                Create Exercise Log
              </Link>
            </li>
            <li className="navbar-item">
              <Link to="/user/register" className="nav-link">
                Create User
              </Link>
            </li>
            <li className="navbar-item">
              <Link to="/" className="nav-link">
                Login User
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}
