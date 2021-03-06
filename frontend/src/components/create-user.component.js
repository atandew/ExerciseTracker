import React, { Component } from "react";
import axios from "axios";


export default class CreateUSer extends Component {
  constructor(props) {
    super(props);

    //to bind this pointer with the properties ow the below functions will get this as null
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    //whenever we update the state it will automatically the page
    this.state = {
      username: "",
    };
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value,
    });
  }

  onSubmit(e) {
    e.preventDefault();
    const user = {
      username: this.state.username,
    };
    console.log(user);

    //connecting with backend
    axios
      .post("http://localhost:5000/user/add/", user)
      .then((res) => {
        console.log(res.data);
        alert("User succesfully added with username = " + user.username);
      })
      .catch((err) => console.log("Error: " + err));

    this.setState({
      username: "",
    });
  }

  render() {
    return (
      <div>
        <h3>Create New User</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Username:</label>
            <input
              type="text"
              required
              className="form-control"
              value={this.state.username}
              onChange={this.onChangeUsername}
            />
          </div>
          <div className="form-group">
            <input
              type="submit"
              value="Create User"
              className="btn btn-primary"
            />
          </div>
        </form>
      </div>
    );
  }
}
