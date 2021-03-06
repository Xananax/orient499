var $ = require('jquery-browserify')
,	jquery_swipe = require('./jquerypp.swipe.js')
,	sliders = require('./sliders.js')
,	api = {
		facebook: require('./apis/facebook.js')
	,	instagram: require('./apis/instagram.js')
	,	tumblr: require('./apis/tumblr')
	}
,	templates = {
		card: require('../_templates/card.jade')
	}
;

$(function(){
	var $Wrapper = $('#Wrapper');
	sliders($Wrapper);
	if(api.facebook){
		api.facebook({
			template: templates.card
		,	insertion: $Wrapper
		,	access_token: "169542825986|Q8gHZ2lfxI0IOJ0SeO86q5U6bVY"
		,	client_id: "orient499"
		});
	}
	if(api.instagram){
		api.instagram({
			template: templates.card
		,	insertion: $Wrapper
		,	hash: 'orient499'
		,	client_id: "024e4948027a4af49afe93968c9561d0"
		})
	}
	if(api.tumblr){
		api.tumblr({
			template: templates.card
		,	insertion: $Wrapper
		,	consumer_key: "UNZOrDbeSmRwNCMnKVTWYcowcujM2Tj8acfc84BRZhjR7tnuUv"
		,	client_id: "nationalpostsports.tumblr.com"
		})
	}
});
