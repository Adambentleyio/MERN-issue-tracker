import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchIssues } from "../actions";
import styled from "styled-components";

const Card = styled.div`
  position: relative;
  width: 375px;
  margin: 2rem;
  padding: 1.2rem 1rem;
  transition: 0.8s;

  .title a {
    display: block;
    margin-bottom: 0.7rem;
    width: 80%;
    color: #333;
    text-decoration: none;
    font-size: 1.6rem;
    font-family: Roboto;
    font-weight: 800;
  }
`;

const CardContent = styled.div`
  /* position: absolute; */
  font-family: inter;
  overflow: hidden;
  margin-top: 0.8rem;
  height: 55%;
  width: 100%;
  padding-bottom: 0.6rem;
  border-bottom: 1px solid #d1d1d1;

  .description {
    /* margin-top: 1rem; */
    display: flex;
    /* align-items: center; */
    /* justify-content: center; */
  }
  .admin-panel {
    margin: auto 0 0 0;
    width: 100%;
    display: flex;
    justify-content: space-between;
  }
  btn,
  a {
    color: #e6eef6;
    text-decoration: none;
    margin: 0 1rem;
    border-radius: 20px;
  }
  .btn-delete {
    color: #313131;
    transition: 0.2s;
    margin-top: 1rem;
  }
  .btn-edit {
    color: #313131;
    width: 3rem;
    margin: 1rem 0 0 auto;
    transition: 0.2s;
  }
  .btn-edit:hover,
  .btn-delete:hover {
    color: orange;
  }
`;

const IssueList = () => {
  const dispatch = useDispatch();

  const currentUserId = useSelector((state) => state.auth.UserId);
  const isSignedIn = useSelector((state) => state.auth.isSignedIn);
  const issues = useSelector((state) => Object.values(state.issues));

  useEffect(() => dispatch(fetchIssues()), [dispatch]);

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
    return issues.map((issue) => {
      const d = new Date(issue.createdAt);
      const showDate = d.toDateString();
      return (
        // Each individual card layout
        <Card key={issue.title}>
          <div>
            <div className="title">
              <Link to={`/issue/${issue._id}`}>{issue.title}</Link>
            </div>
            <div>{showDate}</div>
          </div>

          <CardContent>
            <div className="description">{issue.description}</div>
            <div>{issue.status}</div>
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
      <div className="ui celled list">{renderList()}</div>
      {renderCreate()}
    </div>
  );
};

export default IssueList;
