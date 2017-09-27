export const createTransaction = transaction => (
  $.ajax({
    method: 'POST',
    url: 'api/transactions',
    data: { transaction }
  })
);

export const requestNewBalance = () => (
  $.ajax({
    method: 'Get',
    url: 'api/v1/users/current'
  })
);

// data is sent in as {transaction} because this makes it the correct shape in
// which it is {transaction: {transaction_params}}
