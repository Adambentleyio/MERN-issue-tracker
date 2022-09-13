import React from "react";
import { connect } from "react-redux";
import IssueForm from "./IssueForm";
import { createIssue } from "../actions";

class IssueCreate extends React.Component {
  onSubmit = (formValues) => {
    this.props.createIssue(formValues);
  };

  render() {
    return (
      <div>
        <h3>Add Issue</h3>
        <IssueForm onSubmit={this.onSubmit} />
      </div>
    );
  }
}

export default connect(null, { createIssue })(IssueCreate);
