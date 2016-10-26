class CreatePhotoCategories < ActiveRecord::Migration
  def change
    create_table :photo_categories do |t|
      t.integer :photo_id
      t.integer :category_id

      t.timestamps null: false
    end
  end
end
