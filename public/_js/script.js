// TODO: refresh slider sizes on window resize
var mutnt = {};
//////////// FACEBOOK
/// https://graph.facebook.com/oauth/access_token?client_id=169542825986&client_secret=03aa2945bd10b68297f1068c90497d72&grant_type=client_credentials
mutnt.fb = function(){
	var fburl = "https://graph.facebook.com/orient499/feed?access_token=169542825986|Q8gHZ2lfxI0IOJ0SeO86q5U6bVY";
	var func = function(data){
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
				card.content.push(					{
					filename:'http://graph.facebook.com/'+this.object_id+'/picture?type=normal'
				,	caption: this.message
				})
			}else{
				card.content.push(					{
					text: this.message
				})
			}
		})
	}
	$.ajax({
		url:fburl
	,	success:func
	,	error:func
	})
}
//////////// SLIDERS
mutnt.sliders = function(){
	$('.slider')
	.each(function(){
		var $slider = $(this);
		var $sliderImages = $('.slides',$slider);
		var $images = $('.slide',$slider);
		var $dots = $('.dot',$slider);
		var $close = $('.close',$slider);
		var images = [];
		var fullLength = 0;
		$images.each(function(){
			var image = $(this);
			var width = image.outerWidth();
			images.push(fullLength);
			fullLength+=width
		});
		var currentSlide = 0;
		var goTo = function(){
			$sliderImages.css('left',(-images[currentSlide])+'px');
			console.log(currentSlide)
			var $dot = $dots.filter('.dot-'+currentSlide);
			console.log($dot[0])
			$dots.not($dot.addClass('active')).removeClass('active');
		}
		var next = function(evt){
			evt.preventDefault();
			currentSlide++;
			if(currentSlide>images.length-1){currentSlide=0;}
			goTo()
			return false;
		}
		var previous = function(evt){
			evt.preventDefault();
			currentSlide--;
			if(currentSlide<0){currentSlide=images.length-1;}
			goTo()
			return false;
		}
		var dot = function(evt){
			evt.preventDefault();
			currentSlide = $(this).data('num');
			goTo();
			return false
		}
		//$images.append($close).click(function(){$slider.toggleClass('active');})
		$('.slider-control-right',$slider).on('click',next)
		$('.slider-control-left',$slider).on('click',previous)
		$dots.on('click',dot)
		$('.slider').on('movestart',function(e){
			if ((e.distX > e.distY && e.distX < -e.distY) || (e.distX < e.distY && e.distX > -e.distY)) {
				e.preventDefault();
			}
		}).on('swipeleft', function(e) {
			previous();
		})
		.on('swiperight', function(e) {
			next();
		});

	})
}
//////////// INIT
$(function(){
	mutnt.sliders();
	//mutnt.fb();
	console.log(jade);
});
