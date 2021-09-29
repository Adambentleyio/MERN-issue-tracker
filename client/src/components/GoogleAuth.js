import React, { Component } from "react";
import { connect } from "react-redux";
import { signIn, signOut } from "../actions";

class GoogleAuth extends Component {
  // When the component first appears in the DOM load up the Auth2 javascript.
  // Make a variable that holds the GAPI getAuthInstance() method, which has methods like signIn(),
  // signOut() and isSignedIn().
  // Then set the state of isSignedIn equal to the getAuthInstance isSignedIn() method.
  // Set up a listen method that calls our function when something changed. The function will
  // set the new state equal to the GAPI isSignedIn method.

  componentDidMount() {
    window.gapi.load("client:auth2", () => {
      window.gapi.client
        .init({
          clientId:
            "284084667086-lip1051ib5uc4s4elb4ab52754g7q4ap.apps.googleusercontent.com",
          scope: "email",
        })
        .then(() => {
          this.auth = window.gapi.auth2.getAuthInstance();
          this.onAuthChange(this.auth.isSignedIn.get());
          this.auth.isSignedIn.listen(this.onAuthChange);
        });
    });
  }

  onAuthChange = (isSignedIn) => {
    if (isSignedIn) {
      // call the action creator to signIn
      this.props.signIn(this.auth.currentUser.get().getId());
    } else {
      // call the action creator to signOut
      this.props.signOut();
    }
  };

  // check to see the value of our state isSinedIn and conditionally render our login status
  // wireup on click handlers for when user presses button to sign in or sign out

  onSignInClick = () => {
    this.auth.signIn();
  };

  onSignOutClick = () => {
    this.auth.signOut();
  };

  renderAuthButton() {
    if (this.props.isSignedIn === null) {
      return null;
    } else if (this.props.isSignedIn) {
      return (
        <button className="ui grey google button" onClick={this.onSignOutClick}>
          <i className="google icon" />
          Sign Out
        </button>
      );
    } else {
      return (
        <button className="ui teal google button" onClick={this.onSignInClick}>
          <i className="google icon" />
          Sign In with Google
        </button>
      );
    }
  }

  render() {
    return <div>{this.renderAuthButton()}</div>;
  }
}

const mapStateToProps = (state) => {
  return { isSignedIn: state.auth.isSignedIn };
};

export default connect(mapStateToProps, { signIn, signOut })(GoogleAuth);
