# README

![mobius-demo](/assets/images/mobius_demo.gif)

## Security:
* Race condition prevention with Rails Active Record Locks
* Protect_from_forgery and CSRF protection
* Password never stored only Password Digest Stored using BCrypt

## Features:
* Send tokens to other users
* Chain of transactions is kept in transactions table with from_user_id, to_user_id, and num_credits
* Users each start with 1000 tokens just to keep token numbers in the positive
