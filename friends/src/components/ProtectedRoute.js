import React from "react";
import { axiosAuth } from "../authentication/axiosAuth";

const initialForm = {
  name: "",
  age: "",
  email: "",
  id: new Date(),
};

export default class ProtectedRoute extends React.Component {
  constructor() {
    super();
    this.state = {
      friends: [],
      form: initialForm,
    };
  }

  componentDidMount() {
    this.getData();
  }

  getData = () => {
    axiosAuth()
      .get(`/friends`)
      .then((res) => {
        this.setState({ friends: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  handleChange = (evt) => {
    const { name, value } = evt.target;
    this.setState({
      form: {
        ...this.state.form,
        [name]: value,
      },
    });
  };

  handleNewFriend = (evt) => {
    evt.preventDefault();
    axiosAuth()
      .post("/friends", this.state.form)
      .then((res) => {
        this.setState({ friends: res.data });
        this.setState({ form: initialForm });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    return (
      <div>
        {this.state.friends.map((friend) => {
          return (
            <div key={friend.id}>
              <p>
                <strong>Name:</strong> {friend.name}
              </p>
            </div>
          );
        })}
        <div>
          <h3>New Friend</h3>
          <form onSubmit={this.handleNewFriend}>
            <input
              type="text"
              name="name"
              placeholder="name"
              value={this.state.form.name}
              onChange={this.handleChange}
            />
            <input
              type="text"
              name="age"
              placeholder="age"
              value={this.state.form.age}
              onChange={this.handleChange}
            />
            <input
              type="email"
              name="email"
              placeholder="email"
              value={this.state.form.email}
              onChange={this.handleChange}
            />
            <button>Add Friend</button>
          </form>
        </div>
      </div>
    );
  }
}
