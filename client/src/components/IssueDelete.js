import React from "react";
import Modal from "./Modal";
import { Link } from "react-router-dom";
import history from "../history";
import { fetchIssue, deleteIssue } from "../actions";
import { connect } from "react-redux";

class IssueDelete extends React.Component {
  componentDidMount() {
    this.props.fetchIssue(this.props.match.params.id);
  }

  renderActions() {
    // destructure variables
    // const { id } is the same as this.props.match.params.id
    const { id } = this.props.match.params;
    console.log(id);
    {
      /* correctly passing the id to deleteIssue */
    }
    return (
      <React.Fragment>
        <button
          className="ui button negative"
          onClick={() => this.props.deleteIssue(id)}
        >
          Delete
        </button>
        <Link to="/" className="ui button">
          Cancel
        </Link>
      </React.Fragment>
    );
  }

  renderContent() {
    if (!this.props.issue) {
      return "Are you sure you want to delete this issue?";
    }
    return `Are you sure you want to delete this issue with title: ${this.props.issue.title} ?`;
  }

  render() {
    return (
      <Modal
        title="Delete Issue"
        content={this.renderContent()}
        actions={this.renderActions()}
        onDismiss={() => history.push("/")}
      />
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    issue: state.issues[ownProps.match.params.id],
  };
};

export default connect(mapStateToProps, { deleteIssue, fetchIssue })(
  IssueDelete
);
