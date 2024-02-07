FactoryBot.define do
  factory :admin do
    first_name { 'admin' }
    last_name { 'admin' }
    email { 'admin@localhost.localhost' }
    password { 'admin' }
  end
end
