import * as APIUtil from '../util/all_users_api_util';

export const RECEIVED_USERS = 'RECEIVED_USERS';
export const receivedUsers = (users) => ({
  type: RECEIVED_USERS,
  users
});

export const requestUsers = () => dispatch => (
  APIUtil.requestUsers().then(users => (
    dispatch(receivedUsers(users)))
  )
);
