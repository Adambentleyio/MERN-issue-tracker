import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchIssues } from "../actions";
import styled from "styled-components";
import { toTitleCase } from "../helpers/toTitleCase";

const Card = styled.div`
  position: relative;
  max-width: 10rem + 60vw;
  padding: 1.2rem 0;
  transition: 0.8s;

  .title a {
    display: block;
    margin-bottom: 0.7rem;
    color: #333;
    text-decoration: none;
    font-size: 1.6rem;
    font-family: Roboto;
    font-weight: 800;
  }
`;

const CardContent = styled.div`
  font-family: inter;
  padding: 0.8rem 0;

  .admin-panel {
    margin:  1rem 0 0 auto;
    width: 100%;
    display: flex;
  }
  .btn {
    font-weight: 800;
  }
  .btn:nth-of-type(2) {
    padding-left: 0.6rem;
  }
  .btn-delete {
    transition: 0.2s;
  }
  .btn-edit {
    transition: 0.2s;
  }
  .btn-edit:hover,
  .btn-delete:hover {
    color: #221ee0;
  }
`;

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


  const renderAdmin = (issue) => {
    if (issue.userId === currentUserId) {
      return (
        <div className="admin-panel">
          <Link className="btn btn-edit" to={`/issue/edit/${issue._id}`}>
            Edit
          </Link>

          <Link className="btn btn-delete" to={`issue/delete/${issue._id}`}>
            Delete
          </Link>
        </div>
      );
    } else
      return (
        <div className="admin-panel">
          <Link className="btn btn-edit" to={`/issue/edit/${issue._id}`}>
            Edit
          </Link>

          <Link className="btn btn-delete" to={`issue/delete/${issue._id}`}>
            Delete
          </Link>
        </div>
      );
  };

  const renderList = () => {

    return sortedItems.map((issue) => {
      const d = new Date(issue.createdAt);
      const showDate = d.toDateString();
      return (
        // Each individual card layout
        <Card key={issue.title}>
          <div>
            <div className="title">
              <Link to={`/issue/${issue._id}`}>{issue.title}</Link>
            </div>
            <div style={{display: "flex"}}>
              <div>{showDate}</div>
              <div style={{color: "purple", marginLeft: "0.6rem"}}>{toTitleCase(issue.status)}</div>
            </div>
          </div>

          <CardContent>
            <div className="description">{issue.description}</div>
            {renderAdmin(issue)}
          </CardContent>
        </Card>
      );
    });
  };

  const renderCreate = () => {
    if (isSignedIn) {
      return (
        <div style={{ textAlign: "right" }}>
          <Link
            to="/issue/new"
            className="ui button"
            style={{ backgroundColor: "#e6eef6", color: "#022a52" }}
          >
            Create a new issue
          </Link>
        </div>
      );
    }
  };

  return (
    <div style={{ maxWidth: "900px" }}>
      <button onClick={() => setSortItemChronology('asc')}>Latest First</button>
      <button onClick={() => setSortItemChronology('desc')}>Newest First</button>
      <div>{renderCreate()}</div>
      <div className="ui celled list">{renderList()}</div>
    </div>
  );
};

export default IssueList;
