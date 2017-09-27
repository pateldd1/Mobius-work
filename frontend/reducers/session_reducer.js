import merge from 'lodash/merge';
import {
  RECEIVE_CURRENT_USER,
  LOGOUT_USER
  // RECEIVE_ERRORS
} from '../actions/session_actions';
import { RECEIVED_BALANCE } from '../actions/transaction_actions';

const SessionReducer = (state = null, action) => {
  Object.freeze(state);
  switch(action.type)
  {
    case RECEIVE_CURRENT_USER:
      return Object.assign({}, action.currentUser);
    case RECEIVED_BALANCE:
      return Object.assign({}, action.updatedUser);
    case LOGOUT_USER:
      return null;
    default:
      return state;
  }
};

export default SessionReducer;
