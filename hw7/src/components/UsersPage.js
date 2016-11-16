import React, { Component } from 'react';

import 'babel-polyfill';
import fetch from 'isomorphic-fetch';

class UsersPage extends Component {
  constructor() {
    super();
    this.state = {
      users: [],
    };
  }

  componentDidMount() {
    // fetch `/api/users` to get users and then set state...
    fetch(`/api/users`)
      .then(res => res.json())
      .then(json => this.setState({ users: json.users }));
  }

  render() {
    // console.log(this.state.users);
    return (
      <div>Users{
          this.state.users.map((user, index) => (
            <li key={index}><a href={`#/users/${index + 1}`}>User {index + 1}</a></li>
          ))
        }
      </div>
    );
  }
}

export default UsersPage;
