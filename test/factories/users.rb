FactoryBot.define do
  factory :user do
    first_name
    last_name
    password
    email
    avatar
    type { '' }

    factory :developer do
      type { 'Developer' }
    end

    factory :admin do
      first_name { generate :string }
      last_name { generate :string }
      email
      password { generate :string }
      type { 'Admin' }
    end

    factory :manager do
      type { 'Manager' }
    end
  end
end
