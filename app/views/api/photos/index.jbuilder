json.array! @photos do |photo|
  json.merge! photo.attributes
  json.avatar photo.avatar.url
end