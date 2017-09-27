export const requestUsers = () =>(
  $.ajax({
    method: 'GET',
    url: '/api/users'
  })
);
