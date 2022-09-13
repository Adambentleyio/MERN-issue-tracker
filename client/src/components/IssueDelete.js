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

  const issue = useSelector((state) => state.issues[props.match.params.id]);

  useEffect(() => {
    let issueId = props.match.params.id;
    dispatch(fetchIssue(issueId));
  }, []);

  const handleClick = (id) => {
    dispatch(deleteIssue(id));
  };

  const renderContent = () => {
    // get title of item and display it
    if (!issue) {
      return "Are you sure you want to delete this issue?";
    }
    return `Are you sure you want to delete: ${issue.title} ?`;
  };

  const renderActions = () => {
    console.log(issue);
    return (
      <React.Fragment>
        <button
          className="ui button negative"
          onClick={() => handleClick(issue._id)}
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
