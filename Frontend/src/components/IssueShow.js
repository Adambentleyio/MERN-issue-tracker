import React from "react";
import { connect } from "react-redux";
import { fetchIssue } from "../actions";

class IssueShow extends React.Component {
  componentDidMount() {
    this.props.fetchIssue(this.props.match.params.id);
  }

  render() {
    console.log("issue: " + this.props.issue)
    if (this.props?.issue) {
      const { title, description } = this.props.issue;
      return (
        <div>
          <h1>{title}</h1>
          <h5>{description}</h5>
        </div>
      );
    } else {
      return <div>Loading...</div>;
    }
  }
}

const mapStateToProps = (state, ownProps) => {
  return { issue: state.issues[ownProps.match.params._id] };
};

export default connect(mapStateToProps, { fetchIssue })(IssueShow);
