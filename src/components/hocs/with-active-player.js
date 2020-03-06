import React, {PureComponent} from 'react';
import Proptypes from 'prop-types';

const withActivePlayer = (Component) => {
  class WithActivePlayer extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        activePlayer: props.activePlayer,
      }
    }

    render(){
     const {activePlayer} = this.state;

     return <Component
       {...this.props}
       activePlayer={activePlayer}
       onPlayButtonClick={(i)=>console.error('call::onPlayButtonClick') || this.setState({
         activePlayer: activePlayer === i ? -1 : i
       })}
     />

    }
  }

  withActivePlayer.propTypes = {
    activePlayer: Proptypes.number.isRequired,
  }

  return withActivePlayer;
}

export default withActivePlayer;
