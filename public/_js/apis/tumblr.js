module.exports = function(options){

	tumblr_callback = function(data){
		data = data.response.posts;
		$.each(data,function(i,v){
			var card = {
				id: this.object_id
			,	slug: this.slug
			,	columns: "1,1,1,1"
			,	content: []
			};
			if(this.photos && this.photos.length){
				$.each(this.photos,function(){
					card.content.push({
						filename: this.original_size.url
					,	caption: this.caption
					})
				})
			}
			if(this.caption){
				card.content.push({
					text: this.caption
				})
			}
			options.insertion.append(options.template({card:card}));
		})

	}

	$.ajax({
		type: "GET"
	,	url : "http://api.tumblr.com/v2/blog/"+options.client_id+"/posts"
	,	method:'get'
	,	dataType: "jsonp"
	,	data: {
			api_key : options.consumer_key
		,	jsonp : "tumblr_callback"
		}
	,	success: tumblr_callback
	});

}