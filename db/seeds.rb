["landscape", "portrait", "colorful", "winter", "animals", "nature", "urban", "architecture", "aerial", "candid", "fashion"].each do |category|
  c_params = {
    name: category
  }
  category = Category.create!(c_params)
end
#Users
10.times do
  u_params = {
    name: Faker::Name.name,
    nickname: Faker::Name.first_name,
    email: Faker::Internet.email,
    image: Faker::Avatar.image,
    bio: Faker::Lorem.sentences.join(" "),
    password: "12345678",
    password_confirmation: "12345678",
  }
  u = User.create(u_params)
#Photos
  20.times do
    p_params = {
      avatar: File.new("#{Rails.root}/public/photos/reflect_architecture_logo.png"),
      description: Faker::Lorem.sentences
    }
    p = u.photos.create(p_params)
    category_ids = Category.pluck(:id)
    rand(1..3).times do
      p.photo_categories.create(category_id: category_ids.sample)
    end
  end
#Photolike
  20.times do
    l_params = {
      photo_id: Faker::Number.between(1, 200)
    }
    pl = u.photolikes.create(l_params)
  end
#Comments
  20.times do
    co_params = {
      text: Faker::Lorem.sentences,
      photo_id: Faker::Number.between(1, 200)
    }
  comment = u.comments.create(co_params)
    end
end
#Friendship
  Friendship.create(user_id: 1 ,friend_id: 2)
  Friendship.create(user_id: 3 ,friend_id: 4)
  Friendship.create(user_id: 5 ,friend_id: 6)
  Friendship.create(user_id: 7 ,friend_id: 8)
  Friendship.create(user_id: 9 ,friend_id: 10)