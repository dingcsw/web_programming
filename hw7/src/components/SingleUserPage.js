import React, { Component, PropTypes } from 'react';

import 'babel-polyfill';
import fetch from 'isomorphic-fetch';

class SingleUserPage extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
  };

  constructor() {
    super();
    this.state = {
      avatar: '',
      name: '',
      age: 0,
    };
  }

  componentDidMount() {
    // fetch `/api/users/${id}` to get user and then set state...
    fetch(`/api/users/${this.props.id}`)
      .then(res => res.json())
      .then(json => this.setState({
        avatar: json.avatar,
        name: json.name,
        age: json.age,
      }));
  }

  render() {
    return (
      <div>
        <p>User {this.props.id}</p>
        <p>Avatar: {this.state.avatar}</p>
        <p>Name: {this.state.name}</p>
        <p>Age: {this.state.age}</p>
      </div>
    );
  }
}

export default SingleUserPage;
