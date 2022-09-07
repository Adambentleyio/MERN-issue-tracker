import React, { useEffect } from "react";
import Modal from "./Modal";
import { Link } from "react-router-dom";
import history from "../history";
import { fetchIssue } from "../actions";
// import { deleteIssue } from "../actions";
// import { connect } from "react-redux";
import { useDispatch, useSelector } from "react-redux";

// class IssueDelete extends React.Component {
//   componentDidMount() {
//     this.props.fetchIssue(this.props.match.params.id);
//   }

//   renderActions() {
//     // destructure variable
//     const { id } = this.props.match.params;

//     return (
//       <React.Fragment>
//         <button
//           className="ui button negative"
//           onClick={() => this.props.deleteIssue(id)}
//         >
//           Delete
//         </button>
//         <Link to="/" className="ui button">
//           Cancel
//         </Link>
//       </React.Fragment>
//     );
//   }

//   renderContent() {
//     if (!this.props.issue) {
//       return "Are you sure you want to delete this issue?";
//     }
//     return `Are you sure you want to delete this issue with title: ${this.props.issue.title} ?`;
//   }

//   render() {
//     return (
//       <Modal
//         title="Delete Issue"
//         content={this.renderContent()}
//         actions={this.renderActions()}
//         onDismiss={() => history.push("/")}
//       />
//     );
//   }
// }

// const mapStateToProps = (state, ownProps) => {
//   return {
//     issue: state.issues[ownProps.match.params.id],
//   };
// };

// export default connect(mapStateToProps, { deleteIssue, fetchIssue })(
//   IssueDelete
// );

//
// ISSUEDELETE FUNCTIONAL COMPONENT
//

const IssueDelete = (props) => {
  const dispatch = useDispatch();

  const id = useSelector((state) => state.issues[props.match.params.id]);
  const issue = useSelector((state) => state.issues[props.match.params.id]);

  useEffect(() => dispatch(fetchIssue(id)));

  const renderContent = () => {
    // get title of item and display it
    if (!issue) {
      return "Are you sure you want to delete this issue?";
    }
    return `Are you sure you want to delete: ${issue.title} ?`;
  };

  const renderActions = () => {
    return (
      <React.Fragment>
        <button
          className="ui button negative"
          onClick={() => dispatch({ type: "DELETE_ISSUE", payload: id })}
        >
          Delete
        </button>
        <Link to="/" className="ui button">
          Cancel
        </Link>
      </React.Fragment>
    );
  };

  return (
    <Modal
      title="Delete Issue"
      content={renderContent()}
      actions={renderActions()}
      onDismiss={() => history.push("/")}
    />
  );
};

export default IssueDelete;
