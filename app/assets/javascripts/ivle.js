// Sourced from https://github.com/ymichael/modivle
//main library obj
	var baseurl = "https://ivle.nus.edu.sg/api/Lapi.svc/";

	var jsonp = function(url, params, success, error, proxyurl){
		$.ajax({
			type: 'GET',
			dataType: 'jsonp',
			data: params,
			contentType:"application/x-javascript",
			url: url,
			xhrFields: { withCredentials: false },
			success: success,
			error: function(xhr, err, errobj){
				//console.log('revert to proxy');
				var request = url + "?" +  decodeURIComponent($.param(params));
				//console.log(request);
				if (proxyurl){
					$.ajax({
						type: 'POST',
						dataType: 'json',
						data:{request: request},
						url: proxyurl,
						dataFilter: function(data){
							return $.parseJSON(data);
						},
						success: success,
						error: error
					});
				} else {
					if (error){
						error.apply(this,arguments);
					}
				}
			}
		});
	};

	var ivle = function(apikey, proxy){
		//create user with auth token
        console.log(authtoken);
		this.user = function(authtoken){
			this.authtoken = authtoken;
			/*
			* APICALLS (work in progress)
			*/
			//set auth token
			this.setauthtoken = function(newauthtoken){
				this.authtoken = newauthtoken;
			};

			//validate user
			this.validate = function(success, error){
				var endpoint = 'Validate';
				var params = {
					"APIKey" : apikey,
					"Token" : this.authtoken,
					"output" : "json"
				};
				var url = baseurl + endpoint;
				jsonp(url, params, success, error, proxy);
			};

			//userid
			this.uid = function(success, error){
				var endpoint = 'UserID_Get';
				var params = {
					"APIKey" : apikey,
					"Token" : this.authtoken,
					"output" : "json"
				};
				var url = baseurl + endpoint;
				jsonp(url, params, success, error, proxy);
			};

			//userid
			this.uname = function(success, error){
				var endpoint = 'UserName_Get';
				var params = {
					"APIKey" : apikey,
					"Token" : this.authtoken,
					"output" : "json"
				};
				var url = baseurl + endpoint;
				jsonp(url, params, success, error, proxy);
			};

			//user email
			this.email = function(success, error){
				var endpoint = 'UserEmail_Get';
				var params = {
					"APIKey" : apikey,
					"Token" : this.authtoken,
					"output" : "json"
				};
				var url = baseurl + endpoint;
				jsonp(url, params, success, error, proxy);
			};

			//modules
			this.modules = function(success, error){
				var endpoint = 'Modules';
				var params = {
					"APIKey" : apikey,
					"AuthToken" : this.authtoken,
					"Duration" : 0,
					//whether to display basic info or all or it.
					"IncludeAllInfo" : false,
					//"IncludeAllInfo" : false,

					"output" : "json"
				};
				var url = baseurl + endpoint;
				jsonp(url, params, success, error, proxy);
			};

			//workbin
			this.workbin = function(courseId, success, error){
				var endpoint = 'Workbins';
				var params = {
					"APIKey" : apikey,
					"AuthToken" : this.authtoken,
					"CourseId" : courseId,
					"Duration" : 0,
					
					//"WorkbinID" : 0, // undefined means all
					
					//whether to display basic info or all or it.
					// "TitleOnly" : true,
					"TitleOnly" : false,
					"output" : "json"
				};
				var url = baseurl + endpoint;
				jsonp(url, params, success, error, proxy);
			};

			//file download
			this.file = function(fileId){
				//dont like this. but it works
				var url = "https://ivle.nus.edu.sg/api/downloadfile.ashx?APIKey=" + apikey + "&AuthToken=" + this.authtoken + "&ID=" + fileId + "&target=workbin";
				window.location.href = url;
			};

			//announcements
			this.announcements = function(courseId, success, error){
				var endpoint = 'Announcements';
				var params = {
					"APIKey" : apikey,
					"AuthToken" : this.authtoken,
					"CourseId" : courseId,
					"Duration" : 0,
					//whether to display basic info or all or it.
					// "TitleOnly" : true,
					"TitleOnly" : false,
					"output" : "json"
				};
				var url = baseurl + endpoint;
				jsonp(url, params, success, error, proxy);
			};

			//forum
			this.forums = function(courseId, success ,error){
				var endpoint = 'Forums';
				var params = {
					"APIKey" : apikey,
					"AuthToken" : this.authtoken,
					"CourseId" : courseId,
					"Duration" : 0,
					//whether to display basic info or all or it.
					"IncludeThreads" : false,
					"TitleOnly" : false,
					"output" : "json"
				};
				var url = baseurl + endpoint;
				jsonp(url, params, success, error, proxy);
			};
			this.forumheadingthreads = function(headingId, success, error){
				var endpoint = 'Forum_HeadingThreads';
				var params = {
					"APIKey" : apikey,
					"AuthToken" : this.authtoken,
					"HeadingID" : headingId,
					"Duration" : 0,
					//whether to display basic info or all or it.
					"GetMainTopicsOnly" : true,
					"output" : "json"
				};
				var url = baseurl + endpoint;
				jsonp(url, params, success, error, proxy);
			};
			this.forumthread = function(threadId, success, error){
				var endpoint = 'Forum_Threads';
				var params = {
					"APIKey" : apikey,
					"AuthToken" : this.authtoken,
					"GetSubThreads": true,
					"Duration": 0,
					"ThreadID" : threadId,
					"output" : "json"
				};
				var url = baseurl + endpoint;
				jsonp(url, params, success, error, proxy);
			};
		};
        return this;
	};

