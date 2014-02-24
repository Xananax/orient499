// based on  Code http://potomak.github.io/jquery-instagram/

var defaults = {
	accessToken: null
,	clientId: null
,	count: null
,	url: null
,	hash: null
,	userId: null
,	location: null
,	search: null
};

function composeRequest(options){

	var url = 'https://api.instagram.com/v1';
	var data = {};

	if (!options.access_token && !options.client_id) {throw 'You must provide an access token or a client id';}

	data = $.extend(data,{
		access_token: options.access_token,
		client_id: options.client_id,
		count: options.count
	});

	if (options.url != null) {url = options.url;}
	else if (options.hash != null) {url += '/tags/' + options.hash + '/media/recent';}
	else if (options.search != null) {
		url += '/media/search';
		data = $.extend(data, options.search);
	}
	else if (options.userId != null) {
		if (options.accessToken == null){throw 'You must provide an access token';}
		url += '/users/' + options.userId + '/media/recent';
	}
	else if (options.location != null) {
		url += '/locations/' + options.location.id + '/media/recent';
		delete options.location.id;
		data = $.extend(data, options.location);
	}
	else {
		url += '/media/popular';
	}
	
	return {url: url, data: data};
}

module.exports = function(options){

	var that = this;
	options = $.extend({}, defaults, options);
	var request = composeRequest(options);

	var tumblr_callback = function(data){
		data = data.data;
		$.each(data,function(i,v){
			if(this.type!='image'){return;}
			var card = {
				title: this.name || false
			,	id: this.object_id
			,	slug: this.object_id
			,	columns: "1,1,1,1"
			,	content: [{
					filename: this.images.standard_resolution.url
				,	caption: this.message
				}]
			};
			options.insertion.append(options.template({card:card}));
		})
	}

	$.ajax({
		dataType: "jsonp"
	,	url: request.url
	,	data: request.data
	,	success: tumblr_callback
	,	error:function(err){
			console.log(err)
		}
	});

};