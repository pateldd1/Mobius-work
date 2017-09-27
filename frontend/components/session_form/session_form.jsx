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
    this.logoutDisplay = this.logoutDisplay.bind(this);
    this.onLogout = this.onLogout.bind(this);
    this.registerTransaction = this.registerTransaction.bind(this);
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
  registerTransaction(to_user_id){
    //Only allow the transaction if the user has the funds to make the transaction
    if ( this.state.amounts[to_user_id] <= this.props.currentUser.balance )
    {
      this.props.createTransaction({to_user_id: to_user_id, num_credits: this.state.amounts[to_user_id]});
    }
    else {
      //Just keeping it simple for now.
      console.log("insufficient funds");
    }
  }
  showUsers(){
    const all = this.props.allUsers.map((user, idx) => {
      return (
        <div className="panel panel-default" key={idx}>
          <p style={{fontSize: 20, textAlign: 'center', paddingTop: 10}}>{user.email}</p>
          <NumericInput
            className="form-control" min={1}
            onChange={(amt)=> this.setState(merge({}, this.state, {amounts: {[user.id]: amt}}))}
            size={6}
            value={this.state.amounts[user.id]}
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
          <button className="btn btn-primary btn-lg" onClick={()=> this.registerTransaction(user.id)}>
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
    this.props.login({user: {email: "devanshpatel@gmail.com", password: "devansh"}})
  }

  //Depending on the formtype, we are going to show signup or log in instead
  navLink() {
    if (this.state.formType === 'login'){
      return (
        <div className="redirection">
          <h4 className="tsaccount">Don't have a Mobius account?</h4>
          <p className="btn btn-warning" onClick={()=> this.setState({formType: 'signup'})}>Sign Up</p>
        </div>
      )
    }
    else {
      return (
        <div className="redirection">
          <h4 className="tsaccount">Already have a Mobius account?</h4>
          <p className="btn btn-warning" onClick={()=> this.setState({formType: 'login'})}>Log In</p>
        </div>
      )
    }
  }


  guestUser(){
    return (
      <button onClick={this.guestLogin} className="btn btn-success">
        Guest
      </button>
    )
  }

  submitButton(){
    if ( this.state.formType === 'login' )
    {
      return <input className="btn btn-primary" type="submit" value="Login" />
    }
    else
    {
      return <input className="btn btn-primary" type="submit" value="Sign Up" />
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

  onLogout(){
    this.setState({
      email: "",
      password: "",
      formType: "login",
      amounts: {}
    })
    this.props.logout();
  }

  logoutDisplay(){
    return(
      <button className="btn btn-danger" onClick={this.onLogout}>
        Logout
      </button>
    )
  }

  sessionFormDisplay(){
    return (
      <form onSubmit={this.handleSubmit} className="form-inline">
        <br/>
        <div className="login-form">
          <br/>
          <h4>Email</h4>
          <div className="input-group">
            <input type="text"
              autoFocus="autofocus"
              value={this.state.email}
              placeholder=" email"
              onChange={this.update('email')}
              className="form-control"
              />
          </div>
          <br/>
          <h4>Password</h4>
          <div className="input-group">
            <input type="password"
              value={this.state.password}
              onChange={this.update('password')}
              placeholder=" password"
              className="form-control"
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
    return (
      <div className="page-container">
        <div className="siteintro">
          <h1 className="sitename">Mobius</h1>
        </div>
        {this.props.loggedIn ? this.logoutDisplay() : this.sessionFormDisplay()}
        <h3>{this.props.loggedIn ? `Welcome ${this.props.currentUser.email}!` : null}</h3>
        <h3 style={{borderBottom: 1}}>Your Balance: {this.props.loggedIn ? this.props.currentUser.balance : "Login to see your"} tokens</h3>
        {this.props.loggedIn ? this.showUsers() : null}
      </div>
    );
  }
}

export default SessionForm;
