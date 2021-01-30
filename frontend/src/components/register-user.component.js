import React, { Component } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";

export default class CreateExercises extends Component {
    constructor(props) {
        super(props);

        //to bind this pointer with the properties ow the below functions will get this as null
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeFirstname = this.onChangeFirstname.bind(this);
        this.onChangeLastname = this.onChangeLastname.bind(this);
        this.onChangeRole = this.onChangeRole.bind(this);
        this.onChangeMobileno = this.onChangeMobileno.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        //whenever we update the state it will automatically the page
        this.state = {
            username: "",
            role: "",
            firstname: "",
            lastname: "",
            mobileno: "",
            password: ""

        };
    }

    componentDidMount() {
        axios.get("http://localhost:5000/user/").then((res) => {
            if (res.data.length > 0) {
                this.setState({
                    users: res.data.map((user) => user.username),
                    username: res.data[0].username,
                });
            }
        });
    }

    onChangeUsername(e) {
        this.setState({
            username: e.target.value,
        });
    }
    onChangeFirstname(e) {
        this.setState({
            firstname: e.target.value,
        });
    }
    onChangeLastname(e) {
        this.setState({
            lastname: e.target.value,
        });
    }
    onChangeRole(e) {
        this.setState({
            role: e.target.value,
        });
    }
    onChangeMobileno(e) {
        this.setState({
            mobileno: e.target.value,
        });
    }
    onChangePassword(e) {
        this.setState({
            password: e.target.value,
        });
    }

    onSubmit(e) {
        e.preventDefault();
        const newuser = {
            username: this.state.username,
            role: this.state.role,
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            mobileno: this.state.mobileno,
            password: this.state.password,
        };

        axios
            .post("http://localhost:5000/user/add/", newuser)
            .then((res) => {
                console.log(res.data);
                alert("User added succesfully for username = " + newuser.username);
                window.location = "/";
            })
            .catch((err) => alert("Error=" + err));

        console.log(newuser);
    }

    render() {
        return (
            <div>
                <h3>Register new User</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Email:</label>
                        <input
                            type="text"
                            ref="userInput"
                            required
                            className="form-control"
                            value={this.state.username}
                            onChange={this.onChangeUsername}
                        />
                        <div className="form-group">
                            <label>First Name: </label>
                            <input
                                type="text"
                                required
                                className="form-control"
                                value={this.state.firstname}
                                onChange={this.onChangeFirstname}
                            />
                        </div>
                        <div className="form-group">
                            <label>Last Name: </label>
                            <input
                                type="text"
                                required
                                className="form-control"
                                value={this.state.lastname}
                                onChange={this.onChangeLastname}
                            />
                        </div>
                        <div className="form-group">
                            <label>mobileno: </label>
                            <input
                                type="tel"
                                pattern="[0-9]{10}"
                                required
                                className="form-control"
                                value={this.state.mobileno}
                                onChange={this.onChangeMobileno}
                            />
                        </div>
                        <div className="form-group">
                            <label>Password: </label>
                            <input
                                type="text"
                                required
                                className="form-control"
                                value={this.state.password}
                                onChange={this.onChangePassword}
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <input
                            type="submit"
                            value="Create Exercise Log"
                            className="btn btn-primary"
                        />
                    </div>
                </form>
            </div>
        );
    }
}
