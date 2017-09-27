import React from 'react';
import ReactDOM from 'react-dom';
import NumericInput from 'react-numeric-input';
import { merge } from 'lodash';

class SessionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      formType: "login",
      amounts: {}
    }
    //HandleSubmit must be bound to this since it is a callback
    this.handleSubmit = this.handleSubmit.bind(this);
    this.guestLogin = this.guestLogin.bind(this);
    this.showUsers = this.showUsers.bind(this);
    this.sessionFormDisplay = this.sessionFormDisplay.bind(this);
  }
  //
  componentDidMount() {
    this.props.requestUsers();
  }
  update(field) {
    return e => this.setState({
      [field]: e.currentTarget.value
    });
  }

  showUsers(){
    const all = this.props.allUsers.map((user, idx) => {
      return (
        <div className="usercontainer" key={idx}>
          <p>{user.email}</p>
          <NumericInput
            className="form-control" min={1}
            onChange={(amt)=> this.setState(merge({}, this.state, {amounts: {[user.id]: amt}}))}
            size={6}
            style={{
                wrap: {
                    background: '#E2E2E2',
                    boxShadow: '0 0 1px 1px #fff inset, 1px 1px 5px -1px #000',
                    padding: '2px 2.26ex 2px 2px',
                    borderRadius: '6px 3px 3px 6px',
                    fontSize: 32
                },
                input: {
                    borderRadius: '4px 2px 2px 4px',
                    color: '#988869',
                    padding: '0.1ex 1ex',
                    border: '1px solid #ccc',
                    marginRight: 4,
                    display: 'block',
                    fontWeight: 100
                },
                'input:focus' : {
                    border: '1px inset #69C',
                    outline: 'none'
                },
                arrowUp: {
                    borderBottomColor: 'rgba(66, 54, 0, 0.63)'
                },
                arrowDown: {
                    borderTopColor: 'rgba(66, 54, 0, 0.63)'
                }
            }} />
          <button style={{width: 100, marginTop: 20, textAlign: 'center'}}onClick={()=> this.props.createTransaction({to_user_id: user.id, num_credits: this.state.amounts[user.id]})}>
            Send
          </button>
        </div>
      )
    })
    return(
      <div className="all-users">
        {all}
      </div>
    )
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
  navLink() {
    if (this.state.formType === 'login'){
      return (
        <div className="redirection">
          <h4 className="tsaccount">Don't have a Mobius account?</h4>
          <h4 className="redirect-to-signup" onClick={()=> this.setState({formType: 'signup'})}>Sign Up</h4>
        </div>
      )
    }
    else {
      return (
        <div className="redirection">
          <h4 className="tsaccount">Already have a Mobius account?</h4>
          <h4 className="redirect-to-login" onClick={()=> this.setState({formType: 'login'})}>Log In</h4>
        </div>
      )
    }
  }


  guestUser(){
    return (
      <div className="guest-login">
        <p className="guest-text" onClick={this.guestLogin}>Guest</p>
      </div>
    )
  }

  submitButton(){
    if ( this.state.formType === 'login' )
    {
      return <input className="entrance-button btn-text" type="submit" value="Login" />
    }
    else
    {
      return <input className="entrance-button btn-text" type="submit" value="Sign Up" />
    }
  }

  renderErrors() {
    return(
      <ul className="signup-login-errors">
        {this.props.errors.map((error, i) => (
          <li className="error" key={`error-${i}`}>
            {error}
          </li>
        ))}
      </ul>
    );
  }

  logoutDisplay(){
    return(
      <div onClick={this.props.logout.bind(this)}>
        <p>Logout</p>
      </div>
    )
  }

  sessionFormDisplay(){
    return (
      <form onSubmit={this.handleSubmit.bind(this)} className="login-form-box">
        <br/>
        <div className="login-form">
          <br/>
          <div className="registration">
            <input type="text"
              autoFocus="autofocus"
              value={this.state.email}
              placeholder=" email"
              onChange={this.update('email')}
              className="login-input"
              />
          </div>
          <br/>
          <div className="registration">
            <input type="password"
              value={this.state.password}
              onChange={this.update('password')}
              placeholder=" password"
              className="login-input"
              />
          </div>
          <br/>
          <span className="btn-text">
            {this.submitButton()}
          </span>
          {this.guestUser()}
          {this.navLink()}
          {this.renderErrors()}
        </div>
      </form>
    )
  }

  //OnChange will change the the state on keystroke and will go through update method.
  render() {
    console.log(this.state);
    return (
      <div className="login-form-container">
        <div className="siteintro">
          <span className="sitename">Mobius</span>
        </div>
        {this.props.loggedIn ? this.logoutDisplay() : this.sessionFormDisplay()}
        {this.props.loggedIn ? this.props.currentUser.balance : null}
        {this.showUsers()}
      </div>
    );
  }
}

export default SessionForm;
