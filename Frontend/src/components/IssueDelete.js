import React, { useEffect } from "react";
import Modal from "./Modal";
import { Link } from "react-router-dom";
import history from "../history";
import { fetchIssue } from "../actions";
import { deleteIssue } from "../actions";
import { useDispatch, useSelector } from "react-redux";

import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import { Stack, Typography } from "@mui/material";


const IssueDelete = (props) => {
  const dispatch = useDispatch();

  // get the issue from redux state and store it in variable "issue"

  const issue = useSelector((state) => state.issues[props.match.params.id]);

  useEffect(() => {
    let issueId = props.match.params.id;
    dispatch(fetchIssue(issueId));
  }, [dispatch, props.match.params.id]);

  const handleClick = (id) => {
    dispatch(deleteIssue(id));
  };

  const renderContent = () => {
    // get title of item and display it
    if (!issue) {
      return (
        <Typography>Are you sure you want to delete this issue?</Typography>
      )
    }
    return <p>Are you sure you want to delete issue: <strong> {issue.title}</strong></p>;
  };

  const renderActions = () => {

    return (
      <Stack
      direction="row"
      spacing={2}>
        <Button
        variant="outlined"
        sx={{color: "error.main"}}
        startIcon={<DeleteIcon />}

          onClick={() => handleClick(issue._id)}
        >
          Delete
        </Button>
        <Button variant="outlined">
          <Link style={{color: "gray"}} to="/">
            Cancel
          </Link>
        </Button>
      </Stack>
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
