class AddAvatarToPhotos < ActiveRecord::Migration
  def up
    add_attachment :photos, :avatar
  end

  def down
    remove_attachment :photos, :avatar
  end
end
