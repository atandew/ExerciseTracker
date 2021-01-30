import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Exercise = (props) => (
  <tr>
    <td>{props.exercise.username}</td>
    <td>{props.exercise.description}</td>
    <td>{props.exercise.duration}</td>
    <td>{props.exercise.date.substring(0, 10)}</td>
    <td>
      <Link to={"/edit/" + props.exercise._id}>edit</Link> |{" "}
      <a
        href="#"
        onClick={() => {
          props.deleteExercise(props.exercise._id);
        }}
      >
        delete
      </a>
    </td>
  </tr>
);

export default class Exerciselist extends Component {
  constructor(props) {
    super(props);

    this.deleteExercise = this.deleteExercise.bind(this);

    this.state = { exercises: [] };
  }

  componentDidMount() {
    axios
      .get("http://localhost:5000/exercise/")
      .then((response) => {
        this.setState({
          exercises: response.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  deleteExercise(id) {
    axios.delete("http://localhost:5000/exercise/" + id).then((res) => {
      console.log(res.data);
      alert("One Entry succesfully deleted from exercise log");
    });
    //_id is automatically created in mongodb
    this.setState({
      exercises: this.state.exercises.filter((el) => el._id !== id),
    });
  }

  Exerciselist() {
    return this.state.exercises.map((currentexcercise) => {
      return (
        <Exercise
          exercise={currentexcercise}
          deleteExercise={this.deleteExercise}
          key={currentexcercise._id}
        />
      );
    });
  }

  render() {
    return (
      <div>
        <h3>Logged Exercises</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Username</th>
              <th>Description</th>
              <th>Duration</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>{this.Exerciselist()}</tbody>
        </table>
      </div>
    );
  }
}
