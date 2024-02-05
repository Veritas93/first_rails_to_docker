class Admin::ApplicationController < ApplicationController
  include AuthHelper
  before_action :authenticate_user!, :authorize
  helper_method :current_user

  def authorize
    if forbidden?
      render(file: File.join(Rails.root,
                             'public/403.html'), status: 403, loyout: false)
    end
  end

  def forbidden?
    !current_user.is_a?(Admin)
  end
end
