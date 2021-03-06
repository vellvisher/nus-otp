require 'httpclient'
class HomeController < ApplicationController
  def index
  end

  def tokenLanding
    client = HTTPClient.new
    req = client.get($APIUrl + "UserID_Get?output=json&callback=?&APIKey=" + $APIKey + "&Token=" + params[:token]).content
    userId = req[3..-4]
    session['userId'] = userId
    lookup = User.where(:name=>userId)
    if lookup.nil? || lookup.empty?
        @user = User.create(:name=>userId, :token=>params[:token])
        render "/home/firstTime"
    else
        lookup.last[:token] = params[:token]
        render "/home/twoFactor"
    end
  end

  def twoFactor
    if params[:otp]
        @user = User.where(:name=>session['userId']).first
        correctOTP = ROTP::TOTP.new(@user.auth_secret).now.to_s
        if correctOTP.length == 5
            correctOTP = "0"+correctOTP
        end
        logger.debug("correct otp" + correctOTP)
        if params[:otp].to_s == correctOTP
            if session[:privileged_url]
                url = session[:privileged_url]
                session[:privileged_url] = nil
                render url
            else
                render "/home/workspace"
            end
        else
            @error = 'wrong-otp'
        end
    end
  end

  def firstTime
    logger.debug(session)
    @user = User.where(:name=>session['userId']).first
  end

  def workspace
    logger.debug(session)
    @user = User.where(:name=>session['userId']).first
  end

  def gradebook
    session['privileged_url'] = '/home/gradebook_privileged'
    render "twoFactor"
  end

  def gradebook_privileged

  end
end
