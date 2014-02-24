module.exports = function(options){
	/// https://graph.facebook.com/oauth/access_token?client_id=169542825986&client_secret=03aa2945bd10b68297f1068c90497d72&grant_type=client_credentials
	var facebook_callback = function(data){
		data = data.data;
		$.each(data, function(i,v){
			if(this.from.name!="Orient 499" || !this.object_id){return;}
			var card = {
				title: this.name || false
			,	id: this.object_id
			,	slug: this.object_id
			,	columns: "1,1,1,1"
			,	content: []
			}
			if(this.type == 'photo'){
				card.content.push({
					filename:'http://graph.facebook.com/'+this.object_id+'/picture?type=normal'
				,	caption: this.message
				})
			}else{
				card.content.push(					{
					text: this.message
				})
			}
			options.insertion.append(options.template({card:card}));
		})
	}
	$.ajax({
		url:"https://graph.facebook.com/"+options.client_id+"/posts?access_token="+options.access_token
	,	success:facebook_callback
	,	error:function(err){
			console.log(err)
		}
	});
}