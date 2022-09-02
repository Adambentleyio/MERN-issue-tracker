import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchIssues } from "../actions";
import { bindActionCreators } from "redux";
import styled from "styled-components";

const Card = styled.div`
  position: relative;
  min-height: 220px;
  max-width: 275px;
  background-color: #f2f4f7;
  border-radius: 12px;
  margin: 1.5rem 0;
  transition: 0.8s;
  &:hover {
    transform: translateX(-20px);
  }

  .title a {
    display: block;
    width: 80%;
    padding-left: 1rem;
    color: #022a52;
    text-decoration: none;
    font-size: 1.2rem;
    font-family: montserrat;
    font-weight: 500;
  }
`;

const CardContent = styled.div`
  position: absolute;
  overflow: hidden;
  padding-bottom: 2rem;
  bottom: 0;
  height: 55%;
  width: 100%;
  background-color: #b2b4b7;

  .description {
    /* margin-top: 1rem; */
    display: flex;
    /* align-items: center; */
    justify-content: center;
    font-family: montserrat;
    padding: 1rem;
    color: #88888;
    font-size: 0.8rem;
  }
  .admin-panel {
    position: absolute;
    bottom: 0;
    margin: 0.5rem 0;
    width: 100%;
    display: flex;
    text-align: center;
    align-items: center;
    justify-content: space-between;
  }
  btn,
  a {
    color: #e6eef6;
    text-decoration: none;
    font-family: montserrat;
    font-size: 0.8rem;
    padding: 0.25rem 1rem;
    margin: 0 1rem;
    border-radius: 20px;
  }
  .btn-delete {
    border: 2px solid #e6eef6;
    transition: 0.4s;
  }
  .btn-edit {
    background: linear-gradient(268.23deg, #3575b6 4.85%, #022a52 96.46%);
    width: 11rem;
    transition: 0.4s;
  }
  .btn-edit:hover,
  .btn-delete:hover {
    color: #3575b6;
  }
`;

class IssueList extends React.Component {
  componentDidMount() {
    this.props.fetchIssues();
  }

  renderAdmin(issue) {
    if (issue.userId === this.props.currentUserId) {
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
  }

  renderList() {
    return this.props.issues.map((issue) => {
      const d = new Date(issue.createdAt);
      const showDate = d.toDateString();
      return (
        // Each individual card layout
        <div key={issue.createdAt}>
          <div
            style={{
              fontSize: "10px",
              padding: "0.25rem 1rem",
              fontFamily: "montserrat",
              fontWeight: "200",
            }}
          >
            {showDate}
          </div>
          <div className="title">
            <Link to={`/issue/${issue._id}`}>{issue.title}</Link>
          </div>
          <div>
            <div className="description">{issue.description}</div>
            {this.renderAdmin(issue)}
          </div>
        </div>
      );
    });
  }

  renderCreate() {
    if (this.props.isSignedIn) {
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
  }

  render() {
    return (
      <div style={{ maxWidth: "900px" }}>
        <div className="ui celled list">{this.renderList()}</div>
        {this.renderCreate()}
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      fetchIssues: fetchIssues,
    },
    dispatch
  );
};

const mapStateToProps = (state) => {
  return {
    issues: Object.values(state.issues),
    isSignedIn: state.auth.isSignedIn,
    currentUserId: state.auth.userId,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(IssueList);
