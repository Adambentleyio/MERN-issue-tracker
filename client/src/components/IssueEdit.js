import _ from "lodash";
import React, { useEffect } from "react";
import { useDispatch, useSelector, connect } from "react-redux";
import { fetchIssue, editIssue } from "../actions";
import IssueForm from "./IssueForm";

// const IssueEdit = (props) => {
//   // get the issue from redux state and store it in variable "issue"
//   const issue = useSelector((state) => state.issues[props.match.params.id]);

//   const dispatch = useDispatch();

//   // on component mount dispatch the action creator fetch issue
//   useEffect(() => dispatch(fetchIssue(issue)), []);

//   // handle the click and dispatch the action creator edit issue
//   const handleSubmit = (id) => {
//     dispatch(editIssue(id));
//   };

//   return (
//     <div>
//       <h3>Edit an Issue</h3>
//       <IssueForm
//         onSubmit={handleSubmit}
//         initialValues={_.pick(issue, "title", "description")}
//       />
//     </div>
//   );
// };

// export default IssueEdit;

// OLD CLASS COMPONENT AS EXAMPLE

class IssueEdit extends React.Component {
  componentDidMount() {}

  onSubmit = (formValues) => {
    this.props.editIssue(this.props.match.params.id, formValues);
  };

  render() {
    if (!this.props.issue) {
      return <div>Loading...</div>;
    }

    return (
      <div>
        <h3>Edit an Issue</h3>
        <IssueForm
          onSubmit={this.onSubmit}
          initialValues={_.pick(this.props.issue, "title", "description")}
        />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return { issue: state.issues[ownProps.match.params.id] };
};

export default connect(mapStateToProps, { fetchIssue, editIssue })(IssueEdit);
