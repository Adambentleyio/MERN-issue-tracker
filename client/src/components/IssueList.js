import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchIssues } from "../actions";
import { bindActionCreators } from "redux";
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

class IssueList extends React.Component {
  componentDidMount() {
    console.log(this.props.issues);
    this.props.fetchIssues();
  }

  // componentDidUpdate(prevProps) {
  //   if (prevProps.issues !== this.props.issues) {
  //     this.props.fetchIssues();
  //   }
  // }

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
        <Card key={issue.createdAt}>
          <div>
            <div className="title">
              <Link to={`/issue/${issue._id}`}>{issue.title}</Link>
            </div>
            <div>{showDate}</div>
          </div>

          <CardContent>
            <div className="description">{issue.description}</div>
            {this.renderAdmin(issue)}
          </CardContent>
        </Card>
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
