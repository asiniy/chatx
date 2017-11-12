def random_chars(amount)
  ('a'..'z').to_a.shuffle[0, amount].join
end

User.create!(username: 'vasiliy', first_name: 'Vasiliy', last_name: 'Gladishev', password: 'secret', password_confirmation: 'secret', token: random_chars(30))
User.create!(username: 'asiniy', first_name: 'Alex', last_name: 'Antonov', password: 'secret', password_confirmation: 'secret', token: random_chars(30))
