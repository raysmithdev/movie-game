import React from 'react'
import { Field, reduxForm, change } from 'redux-form'
import {connect} from 'react-redux'

import {newGame,
  fetchData,
  fetchData2
} from '../actions'

import './MovieForm.css'
import SavedScoreBox from './SavedScoreBox'
import SaveButton from './SaveButton'
import LoadButton from './LoadButton'
import CurrentScore from './CurrentScore'

class MovieForm extends React.Component {


  componentDidMount() {
    this.props.initialize({ movie:  this.props.relevantLetter});
  }

  render() {
    const { handleSubmit, pristine, reset, submitting } = this.props
  return (
    <form onSubmit={ handleSubmit } >
      <table>
        <tbody>
          <tr>
            <th>Think of a movie that starts with {this.props.relevantLetter}</th>
          </tr>
          <tr>
            <Field
            className="Field"
            name="movie"
            component="input"
            type="text"
            placeholder="Enter Movie Title Here"/>
          </tr>
        </tbody>

        <div>
          <button type="submit" disabled={pristine || submitting}>Submit</button>
        </div>

      </table>
    </form>
  )
}
}

const mapStateToProps = state => ({
  relevantLetter: state.movieData.relevantLetter
});

const FormComponent = reduxForm({
  form: 'simple',
  initialValues: { letter: 'T', max: 10 }
})(MovieForm)

export default connect(mapStateToProps)(FormComponent)
