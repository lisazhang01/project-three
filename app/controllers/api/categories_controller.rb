class API::CategoriesController < ApplicationController

  before_action :set_categories, only: [:index]

  def index
    render json: @categories
  end

private
  def set_categories
    @categories = Category.all

    if @categories.nil?
      render json: "No categories found!", status: 404
    end
  end
end
