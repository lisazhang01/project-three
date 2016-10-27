class AddAvatarToPhotos < ActiveRecord::Migration
  # def up
  #   add_attachment :photos, :avatar
  # end

  # def down
  #   remove_attachment :photos, :avatar
  # end

  def self.up
    change_table :photos do |t|
      t.attachment :avatar
    end
  end

  def self.down
    remove_attachment :photos, :avatar
  end
end
