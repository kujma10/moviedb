FactoryGirl.define do
  factory :movie do
    title { Faker::Lorem.word }
    description { Faker::Lorem.sentence }
    category { Faker::Lorem.word }
  end
end