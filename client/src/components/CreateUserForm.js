import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import './LoginPage.css'
import {reset} from 'redux-form';

let CreateUserForm = props => {
  const { handleSubmit, pristine, reset, submitting } = props
  return (
    <form onSubmit={ handleSubmit } >
      <table className="create-user-table">
        <tbody>
          <tr>
            <th>New Users</th>
          </tr>
          <tr>
            <Field
              className="field"
              name="firstName"
              component="input"
              type="text"
              placeholder="First Name"/>
          </tr>
          <tr>
            <Field
              className="field"
              name="lastName"
              component="input"
              type="text"
              placeholder="Last Name"/>
          </tr>
          <tr>
            <Field
              className="field"
              name="username"
              component="input"
              type="text"
              placeholder="Username"/>
          </tr>
          <tr>
            <Field
              className="field"
              name="password"
              component="input"
              type="password"
              placeholder="Password"/>
          </tr>
          <tr>
            <Field
              className="field"
              name="confirmPassword"
              component="input"
              type="password"
              placeholder="Confirm Password"/>
          </tr>
        </tbody>

      <div className="login-page-buttons">
        <button className="login-button" type="submit" disabled={pristine || submitting}>Submit</button>
      </div>
    </table>
    </form>
  )
}

const NewUserForm = reduxForm({
  form: 'contact'
})(CreateUserForm)

export default connect()(NewUserForm)
