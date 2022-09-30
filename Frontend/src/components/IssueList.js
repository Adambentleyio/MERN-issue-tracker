import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchIssues } from "../actions";
import styled from "styled-components";
import { toTitleCase } from "../helpers/toTitleCase";
import Button from '@mui/material/Button';
import { Card, CardContent, IconButton, Stack, Typography } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';


const IssueList = () => {

  const dispatch = useDispatch();

  const currentUserId = useSelector((state) => state.auth.UserId);
  const isSignedIn = useSelector((state) => state.auth.isSignedIn);
  const issues = useSelector((state) => Object.values(state.issues));

  useEffect(() => dispatch(fetchIssues()), [dispatch]);

  const [sortItemChronology, setSortItemChronology] = useState('desc');

  const sortedItems = issues.sort((a, b) => {
      // use localeCompare to compare two non number strings as dates
      // return sortItemChronology === "desc" ? b.createdAt.localeCompare(a.createdAt) : a.createdAt.localeCompare(b.createdAt)
      return sortItemChronology === "desc" ? new Date(b.createdAt) - new Date(a.createdAt) : a.createdAt.localeCompare(b.createdAt)
  }
  )


  const renderList = () => {

    return sortedItems.map((issue) => {
      const d = new Date(issue.createdAt);
      const showDate = d.toDateString();
      let statusColor = `${issue.status ? "error" : "secondary"}`

      return (
        // Each individual card layout
        <Card key={issue.title} sx={{mb: 2}}>
          <CardContent>
            <Typography variant="h4" sx={{fontSize: 24}}>
              <Link style={{color: "white"}} to={`/issue/${issue._id}`}>{issue.title}</Link>
            </Typography>
            <Stack direction="row" spacing={2} sx={{mb: 2}}>
              <Typography variant="p">{showDate}</Typography>
              <Typography style={issue.status === "urgent" ? {color: "#e62828"} : {color: "#666"}}>{toTitleCase(issue.status)}</Typography>
            </Stack>
            <Typography sx={{fontSize: 14, mb: 2}}>{issue.description}</Typography>
              {renderAdmin(issue)}
          </CardContent>
        </Card>
      );
    });
  };

  const renderAdmin = (issue, currentUserId) => {
    if (issue.userId === currentUserId) {
      return (

        <Stack direction="row" spacing={2}>
          Button
          <Link to={`/issue/edit/${issue._id}`}>
            Edit
          </Link>

          <Link to={`issue/delete/${issue._id}`}>
            Delete
          </Link>
        </Stack>

      );
    } else
    return (

      <Stack direction="row">
        <IconButton size="small">
          <Link style={{color: "#666"}} to={`/issue/edit/${issue._id}`}>
          <EditIcon />
          </Link>
        </IconButton>
        <IconButton>
          <Link style={{color: "#666"}} to={`issue/delete/${issue._id}`}>
        <DeleteIcon />
          </Link>
        </IconButton>
      </Stack>)
  };

  const sortComponent = () => {
    return (
      <>
      <Stack direction="row" sx={{mb: 2}}>
        <Button color="neutral" onClick={() => setSortItemChronology('asc')}>Latest First</Button>
        <Button color="neutral" onClick={() => setSortItemChronology('desc')}>Newest First</Button>
      </Stack>
      </>
    )
  }

  const renderCreate = () => {
    if (isSignedIn) {
      return (
        <div>
          <Button variant="contained" color="neutral" sx={{mb: 2}}>
            <Link style={{color: "#333"}}
              to="/issue/new"
            >
              <Typography>
              Create issue
              </Typography>
            </Link>
          </Button>
        </div>
      );
    }
  };

  //! component Return

  return (
    <div style={{ maxWidth: "900px" }}>
      <div>{sortComponent()}</div>
      <div>{renderCreate()}</div>
      <div>{renderList()}</div>
    </div>
  );
};

export default IssueList;
