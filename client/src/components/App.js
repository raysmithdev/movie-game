import React, { Component } from 'react';
import './App.css';

import {fetchNewGame,
  fetchLogin,
  receiveMultiWordMovieData,
  receiveSingleWordMovieData,
  input,
  fetchMultiWordMovieData,
  fetchSingleWordMovieData,
  fetchUserProfile
} from '../actions'

import MovieForm from './MovieForm'
import ScoresTable from './ScoresTable'
import getScores from './ScoresTable'
import SavedScoreBox from './SavedScoreBox'
import SaveButton from './SaveButton'
import LoadButton from './LoadButton'
import CurrentScore from './CurrentScore'
import LoggedInAs from './LoggedInAs'
import ExistingUserLoginForm from './ExistingUserLoginForm'

import { Field, reduxForm, change } from 'redux-form';

import { connect } from 'react-redux';
import store from '../store'
import Header from './Header'

class App extends Component {

  componentWillReceiveProps(nextProps) {
  this.props.dispatch(change('simple', 'movie', nextProps.relevantLetter));
}

  componentDidMount() {
    this.props.dispatch(fetchUserProfile())
  }

  submit = (values) => {
      event.preventDefault()
      let inputVal = values.movie
      let splitString = inputVal.toUpperCase('').split(' ');
      if (splitString.includes("THE")) {
        for (var i = 0; i < splitString.length; i++) {
          if (splitString[0] = "THE") {
            alert('Nice try...you know what you did... :)'),
            this.props.dispatch(fetchNewGame(this.props.score))
          }
        }
      } else if (this.props.usedMovies.includes(inputVal)) {
          alert('Hey! You already used that one! Game over pal!'),
          this.props.dispatch(fetchNewGame(this.props.score));
      } else if (inputVal[0].toUpperCase() !== this.props.relevantLetter) {
        alert("Hey! That word didn't start with " + this.props.relevantLetter
        + "! Better luck next time bucko!"),
        this.props.dispatch(fetchNewGame(this.props.score));
      } else if (inputVal.includes(' ')) {
        this.props.dispatch(fetchMultiWordMovieData(inputVal, this.props.score));
      } else {
        this.props.dispatch(fetchSingleWordMovieData(inputVal, this.props.score));
      }
    }


  handleSubmit = (values) => {
    this.props.dispatch(fetchLogin(values.existingUsername, values.existingPassword))
  }

  render() {
    return (
      <div className="App">
        <Header infoModal={this.props.showInfoModal}/>
           <div className="row" id="hello">
             <div className="col-3">
               <MovieForm onSubmit={this.submit} relevantLetter={this.props.relevantLetter}/>
               <LoggedInAs />
               <SavedScoreBox currentScore={this.props.score}/>
               <CurrentScore currentScore={this.props.score}/>
               <SaveButton score={this.props.score}/>
               <LoadButton />

             </div>
             <div className="col-6 main-box">

               <div className='random'>
                 <img className="Backdrop img-responsive" src={this.props.backdrop}/>
               </div>

               <div className="title-overview-box">
                 <div className="movie-title">{this.props.movieTitle}</div>
                 <div className="overview">{this.props.overview}</div>
               </div>

             </div>
             <div className="col-3">
               <ScoresTable />
             </div>
          </div>
      </div>
    );
  }
}

const mapStateToProps = state => {

  return {
    usedMovies: state.movieData.usedMovies,
    movieTitle: state.movieData.movieTitle,
    overview: state.movieData.overview,
    poster: state.movieData.poster,
    backdrop: state.movieData.backdrop,
    score: state.movieData.score,
    userInput: state.movieData.userInput,
    usedMovies: state.movieData.usedMovies,
    relevantLetter: state.movieData.relevantLetter,
    showInfoModal: state.reducer.showInfoModal,
    users: state.movieData.users,
    loggedInUser: state.movieData.loggedInUser,
}
};

App = reduxForm({
  form: 'movieForm'
})(App);

export default connect(mapStateToProps)(App);
