class HomeController < ApplicationController
  def index
  end

  def twoFactor
    logger.debug "debugging"
    logger.debug params
    params.delete :token
    url_for(params.except(:token))
  end
end
