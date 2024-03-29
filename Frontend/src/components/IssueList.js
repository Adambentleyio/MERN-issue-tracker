import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchIssues } from "../actions";

import { toTitleCase } from "../helpers/toTitleCase";
import Button from '@mui/material/Button';
import { Card, CardContent, Stack, Typography } from "@mui/material";
import SortIcon from '@mui/icons-material/Sort';
import RenderAdmin from "./RenderAdmin";


const IssueList = () => {

  const dispatch = useDispatch();
  const isSignedIn = useSelector((state) => state.auth.isSignedIn);
  const currentUserId = useSelector((state) => state.auth.userId);
  const issues = useSelector((state) => Object.values(state.issues));

  useEffect(() => {
    dispatch(fetchIssues())
  }, [dispatch, currentUserId]
  );

  const [sortItemChronology, setSortItemChronology] = useState(true);

  const sortedItems = issues.sort((a, b) => {
      // use localeCompare to compare two non number strings as dates
      // return sortItemChronology === "desc" ? b.createdAt.localeCompare(a.createdAt) : a.createdAt.localeCompare(b.createdAt)
      return sortItemChronology === true ? new Date(b.createdAt) - new Date(a.createdAt) : a.createdAt.localeCompare(b.createdAt)
  }
  )

  const RenderList = () => {

    // isSignedIn & currentUserId === issues.UserId
    if (isSignedIn) {
    return sortedItems.map((issue) => {

      const d = new Date(issue.createdAt);
      const showDate = d.toDateString();

      return (
        // Each individual card layout
        <Card key={issue.title} sx={{mb: 2, maxWidth: "40rem"}}>

          <CardContent>

            <Typography variant="h3" sx={{fontSize: '2.3rem', mb: 1.5}}>
              {issue.title}
            </Typography>

            <Stack direction="row" spacing={2} sx={{mb: 2.5, color: "gray"}}>
              <Typography variant="p">{showDate}</Typography>
              <Typography variant="p" style={issue.status === "urgent" ? {color: '#2a818c'} : {color: "gray"}}>{toTitleCase(issue.status)}</Typography>
            </Stack>

            <Typography sx={{mb: 2.5, fontSize: '1.2rem'}}>{issue.description}</Typography>

            <RenderAdmin issue={issue} currentUserId={currentUserId} />

          </CardContent>
        </Card>
      );
    });
  } return <h3>Sign in to manage your issues</h3>
  };

  const sortComponent = () => {
    if (isSignedIn || issues.length < 1) {
      return (
        <>
        <Stack direction="row" sx={{mb: 2}}>
          <SortIcon sx={{cursor: 'pointer'}} onClick={() => setSortItemChronology(!sortItemChronology)}>Oldest First</SortIcon>
          {/* <SortIcon sx={{transform: "rotate(180deg)"}} onClick={() => setSortItemChronology('desc')}>Newest First</SortIcon> */}
        </Stack>
        </>
      )
    }
  }

const renderCreate = () => {
    if (isSignedIn) {
      return (
          <div>
            <Button sx={{mb: 2, border: '1px solid white'}}>
              <Link style={{color: "#c0c0c0"}}
                to="/issue/new"
              >
                <Typography>
                Create issue
                </Typography>
              </Link>
            </Button>
          </div>
      )
  }}

  //! component Return

  return (
    <div>
        <div>{renderCreate()}</div>
        <div>{sortComponent()}</div>
      <RenderList />
    </div>
  );
};

export default IssueList;
