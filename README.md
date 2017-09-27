# MOBIUS README
See Live Version Here: [https://mobius-code.herokuapp.com](https://mobius-code.herokuapp.com)

![mobius-demo](/app/assets/images/mobius_demo.gif)

## Security:
* Race condition prevention with Rails Active Record Locks
* Protect_from_forgery and CSRF protection
* Password never stored only Password Digest Stored using BCrypt

## Features:
* Send tokens to other users
* Chain of transactions is kept in transactions table with from_user_id, to_user_id, and num_credits
* Users each start with 1000 tokens just to keep token numbers in the positive

## Performance:
* B-trees in the Postgres database were created with add_index feature on user email, and transaction from_user_id/to_user_id. The reason for this is because they are searched by when a user logs in and when a user's balance is calculated, respectively. Logn search time instead of linear search time is the result
* 2 SQL queries were made with Rails ActiveRecord. One to get the sum of the num_credits value related to from_user_id and one for to_user_id. Total = To - from + 1000 and this was set as user's balance. 1000 is added because every user starts with 1000 tokens (just a temporary solution that could be solved by keeping track of the last transaction id/hash if its a ledger in the user model to provide a stopping point and to only calculate the new transactions not the old ones)
* Only the necessary amount of data was kept for this coding challenge, although a join table with transactions and users could be made to find all of a user's transactions if one wanted to show them to a user. Best done with has_many and belongs_to relationships.
