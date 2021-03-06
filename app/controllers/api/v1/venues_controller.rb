# this is Api Venues Controller
class Api::V1::VenuesController < ApplicationController
  skip_before_action :verify_authenticity_token
  before_action :authenticate_user!, except: [:index, :show]

  def index
    venues = Venue.all.sort_by{ |v| v.reviews.length }.reverse
    render json: { venues: venues, current_user: current_user }
  end

  def show
    venue = Venue.find(params[:id])
    render json: venue
  end

  def create
    puts 'Test'
    venue = Venue.new(venue_params)
    if venue.save
      render json: venue
    else
      render json: { error: venue.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def update
    if Venue.update(params[:id], venue_params)
      venue = Venue.find(params[:id])
      render json: venue
    else
      render json: { error: venue.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def venue_params
    params.require(:venue).permit(
      :name,
      :address,
      :city,
      :state,
      :zip,
      :website,
      :age_restriction,
      :food_options,
      :parking,
      :hours,
      :phone,
      :dress_code,
      :cover_charge,
      :cash_only,
      :image_url
    )
  end
end
