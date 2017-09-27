import React from 'react';
import ReactDOM from 'react-dom';
import SessionFormContainer from './session_form/session_form_container';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      // formType: this.props.formType
    }
    //HandleSubmit must be bound to this since it is a callback
    this.handleSubmit = this.handleSubmit.bind(this);
    this.guestLogin = this.guestLogin.bind(this);
  }

  update(field) {
    return e => this.setState({
      [field]: e.currentTarget.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    if ( this.state.formType === "login" )
    {
      this.props.login({user: {email: this.state.email, password: this.state.password}});
    }
    else {
      this.props.signup({user: {email: this.state.email, password: this.state.password}});
    }
  }

  guestLogin(e){
    this.props.login({user: {email: "Guest", password: "123456"}})
  }

  //Depending on the formtype, we are going to show signup or log in instead


  submitButton(){

  }

  renderErrors() {

  }

  render() {
    return (
      <div>
        <SessionFormContainer />
      </div>
    );
  }
}

export default App;
