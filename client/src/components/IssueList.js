import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchIssues } from "../actions";
import styled from "styled-components";

const Card = styled.div`
  position: relative;
  margin: 2rem;
  padding: 1.2rem 1rem;
  transition: 0.8s;

  .title a {
    display: flex;
    color: #333;
  }

  .title .name {
    margin-bottom: 0.7rem;
    text-decoration: none;
    font-size: 1.6rem;
    font-family: Roboto;
    font-weight: 800;
    align-self: flex-end;
  }

  .title .edit {
    padding: 0 0.3rem;
    font-size: 0.8rem;
    align-self: flex-start;
  }
`;

const CardContent = styled.div`
  /* position: absolute; */
  font-family: inter;
  overflow: hidden;
  margin-top: 1.5rem;
  width: 100%;
  border-bottom: 1px solid #d1d1d1;

  .admin-panel {
    display: flex;
    justify-content: flex-end;
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
  }
  .btn-edit {
    color: #313131;
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

  useEffect(() => {
    dispatch(fetchIssues());
  }, [dispatch]);

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
              <Link to={`/issue/${issue._id}`}>
                <div className="title name">{issue.title}</div>
                <i class="edit icon"></i>
              </Link>
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
        <div>
          <Link to="/issue/new" className="ui button">
            Create a new issue
          </Link>
        </div>
      );
    }
  };

  return (
    <div>
      <div>{renderList()}</div>
      {renderCreate()}
    </div>
  );
};

export default IssueList;
