import React from "react";
import { connect } from "react-redux";
import { fetchIssue } from "../actions";

class IssueShow extends React.Component {
  componentDidMount() {
    console.log(this.props.match.params);
    this.props.fetchIssue(this.props.match.params.id);
  }

  render() {
    if (!this.props.issue) {
      return <div>Loading...</div>;
    }

    const { title, description } = this.props.issue;

    return (
      <div>
        <h1>{title}</h1>
        <h5>{description}</h5>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return { issue: state.issues[ownProps.match.params._id] };
};

export default connect(mapStateToProps, { fetchIssue })(IssueShow);
