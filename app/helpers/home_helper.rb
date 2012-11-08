require 'net/http'
module HomeHelper
    $APIKey = "cfL8GNtVF9As36ZGVLvvG"
    $APIDomain = "https://ivle.nus.edu.sg/"
    $APIUrl = $APIDomain + "api/lapi.svc/"
    def google_authenticator_qrcode(user)
        data = "otpauth://totp/nus-otp?secret=#{user.auth_secret}"
        data = Rack::Utils.escape(data)
        url = "https://chart.googleapis.com/chart?chs=200x200&chld=M|0&cht=qr&chl=#{data}"
        return image_tag(url, :alt => 'Google Authenticator QRCode')
    end

    def getUserName(user)
        client = HTTPClient.new
        req = client.get($APIUrl + "Username_Get?output=json&callback=?&APIKey=" + $APIKey + "&Token=" + user[:token]).content
        return req[3..-4]
    end

    def getModules(user)
        client = HTTPClient.new
        req = client.get($APIUrl + "Modules?output=json&callback=?&Duration=0&IncludeAllInfo=false&APIKey=" + $APIKey + "&AuthToken=" + user[:token]).content
        logger.debug(req)
        return req[2..-3]
    end
end
