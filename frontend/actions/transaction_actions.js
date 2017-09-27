import * as APIUtil from '../util/transaction_api_util';
import { receiveErrors, clearErrors } from './error_actions';

export const RECEIVED_BALANCE = "RECEIVED_BALANCE";

const receivedNewBalance = updatedUser => ({
  type: RECEIVED_BALANCE,
  updatedUser
});

export const createTransaction = transaction => dispatch => (
  APIUtil.createTransaction(transaction).then(() => {
    APIUtil.requestNewBalance()
    .then((updatedUser) => dispatch(receivedNewBalance(updatedUser)))
  }, err => {
    dispatch(receiveErrors(err.responseJSON))
  })
);
