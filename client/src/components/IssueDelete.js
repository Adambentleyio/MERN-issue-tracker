import React, { useEffect } from "react";
import Modal from "./Modal";
import { Link } from "react-router-dom";
import history from "../history";
import { fetchIssue } from "../actions";
import { deleteIssue } from "../actions";
import { useDispatch, useSelector } from "react-redux";

const IssueDelete = (props) => {
  const dispatch = useDispatch();

  // get the issue from redux state and store it in variable "issue"

  useEffect(() => {
    let issue = props.match.params.id;
    let res = dispatch(fetchIssue(issue));
    console.log(`useEffect is fetching issue: ${issue} and got ${res}`);
  }, []);

  const stateIssues = useSelector((state) => state.issues);
  const stateIssue = stateIssues[props.match.params.id];

  const handleClick = (id) => {
    dispatch(deleteIssue(id));
  };

  const renderContent = () => {
    // get title of item and display it
    if (!stateIssue) {
      return "Are you sure you want to delete this issue?";
    }
    return `Are you sure you want to delete: ${stateIssue.title} ?`;
  };

  const renderActions = () => {
    const _id = props.match.params.id;
    console.log(`_id : ${_id}`);
    return (
      <React.Fragment>
        <button className="ui button negative" onClick={() => handleClick(_id)}>
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
