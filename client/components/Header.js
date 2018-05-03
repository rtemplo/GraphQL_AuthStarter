import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { Link } from 'react-router';
import query from '../queries/CurrentUser';
import mutations from '../mutations/Logout';

class Header extends Component {
  onLogoutClick () {
    this.props.mutate({
      refetchQueries: [{ query }]
    });
  }

  renderButtons() {
    const { loading, user } = this.props.data;

    let authButtons = null;

    if (!loading) {
      if (user) {
        authButtons = (
          <div>
          <li><Link onClick={this.onLogoutClick.bind(this)}>Logout</Link></li>
          </div>
        );
      } else {
        authButtons = (
          <div>
            <li><Link to="/signup">Signup</Link></li>
            <li><Link to="/login">Login</Link></li>
          </div>
        );
      }
    }

    return authButtons;
  }

  render () {
    return (
      <nav>
        <div className="nav-wrapper">
          <Link to="/" className="brand-logo left">Home</Link>
          <ul className="right">
            {this.renderButtons()}
          </ul>
        </div>
      </nav>
    );
  }
};

export default graphql(mutations)(
  graphql(query)(Header)
);
