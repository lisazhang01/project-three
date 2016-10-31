json.merge!     @photo.attributes
json.avatar     @photo.avatar.url
json.comments   @photo.comments
json.categories @photo.categories.pluck(:name)
# json.users      @photo.users
