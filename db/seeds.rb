# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

User.destroy_all

User.create({email: "joe@gmail.com", password: "joey123"})
User.create({email: "dave@gmail.com", password: "dave123"})
User.create({email: "sam@gmail.com", password: "sam123"})
User.create({email: "tammy@gmail.com", password: "tammy123"})
User.create({email: "austin@gmail.com", password: "austin123"})
User.create({email: "guest@gmail.com", password: "guest123"})
User.create({email: "john@gmail.com", password: "john123"})
User.create({email: "alex@gmail.com", password: "alex123"})

Transaction.destroy_all
Transaction.create({from_user_id: 2, to_user_id: 9, num_credits: 20})
