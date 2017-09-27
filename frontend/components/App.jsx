import React from 'react';
import ReactDOM from 'react-dom';
import SessionContainer from './session_form/session_container';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <SessionContainer />
      </div>
    );
  }
}

export default App;
