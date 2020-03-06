import React, {Component} from "react";
import {connect} from "react-redux";
import Proptypes from "prop-types";

import {ActionCreator} from "../../reducer";
import WelcomeScreen from "../welcome-screen/welcome-screen.jsx";
import ArtistQuestionScreen from "../artist-question-screen/artist-question-screen.jsx";
import QuestionGenreScreen from "../genre-question-screen/genre-question-screen.jsx";
import questions from "../../mocks/questions";

const Type = {
  ARTIST: `game--artist`,
  GENRE: `game--genre`,
};


class App extends Component{
  _getScreen(question){
    const {
      errorCount,
      gameTime,
      onWelcomeScreenClick,
    } = this.props;

    if (!question){
      return <WelcomeScreen
        errorCount={errorCount}
        gameTime={gameTime}
        onClick={onWelcomeScreenClick}
      />
    }

    const {onUserAnswer} = this.props;

    switch (question.type){
      case `genre`: return <QuestionGenreScreen
        question={question}
        onAnswer={(userAnswer) => onUserAnswer(userAnswer, question)}
      />
      case `artist`: return <ArtistQuestionScreen
        question={question}
        onAnswer={(userAnswer) => onUserAnswer(userAnswer, question)}
      />
    }
  }
  render() {
    const {
      questions,
      step,
    } = this.props;

    console.log(question);
    return <section className={`game ${Type.ARTIST}`}>
      <header className="game__header">
        <a className="game__back" href="#">
          <span className="visually-hidden">Сыграть ещё раз</span>
          <img className="game__logo" src="img/melody-logo-ginger.png" alt="Угадай мелодию" />
        </a>

      </header>
      {this._getScreen(questions[step])}
    </section>;
  }

}

App.propTypes = {
  errorCount: Proptypes.number.isRequired,
  gameTime: Proptypes.number.isRequired,
  questions: Proptypes.array.isRequired,
  step: Proptypes.number.isRequired,
  onUserAnswer: Proptypes.func.isRequired,
  onWelcomeScreenClick: Proptypes.func.isRequired
}

const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  step: state.step,
  mistakes: state.mistakes,
})

const mapDispatchToProps = (dispatch) => ({
  onWelcomeScreenClick: () => {dispatch(ActionCreator.incrementStep())},

  onUserAnswer: (userAnswer, question) => {
    dispatch(ActionCreator.incrementStep());
    dispatch(ActionCreator.incrementMistake(userAnswer, question));
  }
})

export {App};

export default connect(mapStateToProps, mapDispatchToProps)(App);
