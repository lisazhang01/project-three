class RemovePhotoColumn < ActiveRecord::Migration
  def change
    remove_column :photos, :link_url, :string
  end
end
