import React from "react";
import { Field, reduxForm } from "redux-form";

class IssueForm extends React.Component {
  // the Field component doesn't know how to inject an element into the DOM, so we create a helper
  // function. In the function we receive props from redux form, descructure the object to just input
  // then use the spread operator to capture all those props into our input element like onChange
  // and value

  renderError({ error, touched }) {
    if (touched && error) {
      return (
        <div className="ui error message">
          <div className="header">{error}</div>
        </div>
      );
    }
  }

  renderInput = ({ input, label, meta }) => {
    const className = `field ${meta.error && meta.touched ? "error" : ""}`;
    return (
      <div className={className}>
        <label>{label}</label>
        <input {...input} autoComplete="off" />
        {this.renderError(meta)}
      </div>
    );
  };

  onSubmit = (formValues) => {
    this.props.onSubmit(formValues);
  };

  render() {
    return (
      <form
        onSubmit={this.props.handleSubmit(this.onSubmit)}
        className="ui form error"
      >
        <Field name="title" component={this.renderInput} label="Enter Title" />
        <Field
          name="description"
          component={this.renderInput}
          label="Enter Description"
        />
        <button className="ui button grey">Submit</button>
      </form>
    );
  }
}

const validate = (formValues) => {
  const errors = {};

  if (!formValues.title) {
    errors.title = "You need a title!";
  }

  if (!formValues.description) {
    errors.description = "You need a description";
  }

  return errors;
};

export default IssueForm = reduxForm({
  form: "issueForm",
  validate: validate,
})(IssueForm);
