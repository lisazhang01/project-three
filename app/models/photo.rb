class Photo < ActiveRecord::Base
  belongs_to :user
  has_many   :comments
  has_many   :photolikes
  has_many   :photo_categories
  has_many   :categories, through: :photo_categories

#Allow photo model to allow an attached image file (avatar)
  has_attached_file :avatar, styles: { medium: "500x500>"}, default_url: "/images/:style/missing.png"
#Specities types of images that are allowed (jpg, png, bmg, gif etc)
  validates_attachment_content_type :avatar, content_type: /\Aimage\/.*\z/
end
