import React, { Component } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import { Link } from "react-router-dom";
import "react-bootstrap"


export default class LoginUser extends Component {
    constructor(props) {
        super(props);

        //to bind this pointer with the properties ow the below functions will get this as null
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        //whenever we update the state it will automatically the page
        this.state = {
            username: "",
            password: ""

        };

    }

    // componentDidMount() {
    //     axios.get("http://localhost:5000/user/").then((res) => {
    //         if (res.data.length > 0) {
    //             this.setState({
    //                 users: res.data.map((user) => user.username),
    //                 username: res.data[0].username,
    //             });
    //         }
    //     });
    // }

    onChangeUsername(e) {
        this.setState({
            username: e.target.value,
        });
    }
    onChangePassword(e) {
        this.setState({
            password: e.target.value,
        });
    }

    onSubmit(e) {
        e.preventDefault();

        const email = this.state.username.toLowerCase();
        const password = this.state.password;
        axios.get("http://localhost:5000/user/" + email + "/" + password)
            .then(res => alert(res.data[0].firstname))
            .catch(err => alert("No user exists"));


        // axios
        //     .post("http://localhost:5000/user/add", newuser)
        //     .then((res) => {
        //         console.log(res.data);
        //         alert("User added succesfully for username = " + newuser.username);
        //         window.location = "/";
        //     })
        //     .catch((err) => alert("Error=>" + err));

        // console.log(newuser);
    }

    render() {
        return (

            <div className="container w-50  p-2">
                <br></br>
                <br></br>
                <div className="rounded border border-success bg-black">
                    <br></br>
                    <h3 className="d-flex justify-content-center justify-content-center">Register new User</h3>
                    <form onSubmit={this.onSubmit} className="m-4">
                        <div className="form-group">
                            <label>Email:</label>
                            <input
                                type="email"
                                required
                                className="form-control"
                                onChange={this.onChangeUsername}
                            />
                            <div className="form-group">
                                <label>Password: </label>
                                <input
                                    type="password"
                                    required
                                    className="form-control"
                                    value={this.state.password}
                                    onChange={this.onChangePassword}
                                />
                            </div>

                        </div>
                        <div className="form-group container">
                            <div className="row d-flex justify-content-center">
                                <input
                                    type="submit"
                                    value="Login"
                                    className="btn btn-warning col-4"
                                />
                                <span className="col-md-1"></span>
                                <Link to="/user/register">
                                    <input
                                        value="Register! new User"
                                        className="btn btn-success "
                                    />
                                </Link>
                            </div>
                        </div>
                    </form>

                </div>
            </div>
        );
    }
}
