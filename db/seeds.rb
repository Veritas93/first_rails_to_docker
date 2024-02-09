
FactoryBot.create(:admin, first_name: 'admin', last_name: 'admin', email: 'admin@localhost.localhost', password: 'admin')

60.times do |i|
	u = [Manager, Developer].sample.new
	u.email = "email#{i}@email.gen"
	u.first_name = "FN#{i}"
	u.last_name = "LN#{i}"
	u.password = "#{i}"
	u.save
end