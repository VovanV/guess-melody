import React, {Component} from "react";
import Proptypes from "prop-types";
import WelcomeScreen from "../welcome-screen/welcome-screen.jsx";
import ArtistQuestionScreen from "../artist-question-screen/artist-question-screen.jsx";
import QuestionGenreScreen from "../genre-question-screen/genre-question-screen.jsx";

const Type = {
  ARTIST: `game--artist`,
  GENRE: `game--genre`,
};


class App extends Component{
  constructor(props) {
    super(props);

    this.state = {
      question: -1,
    };
  }

  render() {
    const {questions} = this.props;
    const {question} = this.state;
    console.log(question);
    return <section className={`game ${Type.ARTIST}`}>
      <header className="game__header">
        <a className="game__back" href="#">
          <span className="visually-hidden">Сыграть ещё раз</span>
          <img className="game__logo" src="img/melody-logo-ginger.png" alt="Угадай мелодию" />
        </a>

      </header>
      {this._getScreen(questions[question], () => {
        console.log(question);
        this.setState({question: question + 1 >= question.length ? -1 : question + 1});
      })}
    </section>;


  }

  _getScreen(question, onClick){
    const {
      errorCount,
      gameTime
    } = this.props;

    if (!question){
      return <WelcomeScreen
        errorCount={errorCount}
        gameTime={gameTime}
        onClick={onClick}
      />
    }

    switch (question.type){
      case `genre`: return <QuestionGenreScreen
        onAnswer={onClick}
        question={question}
      />
      case `artist`: return <ArtistQuestionScreen
        onAnswer={onClick}
        question={question}
      />
    }
  }

}

App.propTypes = {
  errorCount: Proptypes.number.isRequired,
  gameTime: Proptypes.number.isRequired,
  questions: Proptypes.array.isRequired
}

export default App;
