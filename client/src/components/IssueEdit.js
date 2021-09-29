import _ from "lodash";
import React from "react";
import { connect } from "react-redux";
import { fetchIssue, editIssue } from "../actions";
import IssueForm from "./IssueForm";

class IssueEdit extends React.Component {
  componentDidMount() {
    this.props.fetchIssue(this.props.match.params.id);
    // console.log(this.props.match.params.id);
  }

  onSubmit = (formValues) => {
    this.props.editIssue(this.props.match.params.id, formValues);
  };

  render() {
    if (!this.props.issue) {
      return <div>Loading...</div>;
    }

    return (
      <div>
        <h3>Edit an Issue</h3>
        <IssueForm
          onSubmit={this.onSubmit}
          initialValues={_.pick(this.props.issue, "title", "description")}
        />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return { issue: state.issues[ownProps.match.params.id] };
};

export default connect(mapStateToProps, { fetchIssue, editIssue })(IssueEdit);
