def random_chars(amount)
  ('a'..'z').to_a.shuffle[0, amount].join
end

vasiliy = User.create!(username: 'vasiliy', first_name: 'Vasiliy', last_name: 'Gladishev', password: 'secret', password_confirmation: 'secret', token: random_chars(30))
asiniy  = User.create!(username: 'asiniy', first_name: 'Alex', last_name: 'Antonov', password: 'secret', password_confirmation: 'secret', token: random_chars(30))

vasiliy.messages.create!(body: "Hello @asiniy, how are you?")
asiniy.messages.create!(body: "Hi Vasya, I'm well. And you?")
vasiliy.messages.create!(body: "Fine, thanks")
vasiliy.messages.create!(body: "Typical english discussions are so pointless!")
