import React from "react";
import { useDispatch } from "react-redux";
import IssueForm from "./IssueForm";
import { createIssue } from "../actions";

// class IssueCreate extends React.Component {
//   onSubmit = (formValues) => {
//     this.props.createIssue(formValues);
//   };

//   render() {
//     return (
//       <div>
//         <h3>Add Issue</h3>
//         <IssueForm onSubmit={this.onSubmit} />
//       </div>
//     );
//   }
// }

const IssueCreate = () => {
  const dispatch = useDispatch();

  const onSubmit = (formValues) => {
    dispatch(createIssue(formValues));
  };

  return (
    <div>
      <h3>Add Issue</h3>
      <IssueForm onSubmit={onSubmit} />
    </div>
  );
};

export default IssueCreate;

// export default connect(null, { createIssue })(IssueCreate);
