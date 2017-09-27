import { merge } from 'lodash';

import {
  RECEIVED_USERS
} from '../actions/all_user_actions';

const defaultState = [];


const AllUsersReducer = (state = defaultState, action) => {
  Object.freeze(state);
  switch(action.type) {
    case RECEIVED_USERS:
      return action.users;
    default:
      return state;
  }
};

export default AllUsersReducer;
