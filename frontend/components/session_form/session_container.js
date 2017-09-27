import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { login, logout, signup } from '../../actions/session_actions';
import { requestUsers } from '../../actions/all_user_actions';
import { createTransaction } from '../../actions/transaction_actions';
import { selectAll } from '../../reducers/selectors';
import Session from './session.jsx';

const mapStateToProps = ({ currentUser, errors, allUsers }) => {
  return {
    loggedIn: !currentUser ? false : true,
    errors,
    allUsers: selectAll(allUsers),
    currentUser
  }
}

const mapDispatchToProps = (dispatch, { location }) => {
  return {
    signup: user => dispatch(signup(user)),
    login: user => dispatch(login(user)),
    requestUsers: () => dispatch(requestUsers()),
    logout: () => dispatch(logout()),
    createTransaction: (transaction) => dispatch(createTransaction(transaction))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Session);
