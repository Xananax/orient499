module.exports = function($Wrapper){
	var go = function(currentSlide,$card,$slider,$dot){
		var	uid = $slider.data('slug')
		,	$nextImage
		,	$dots = $('.dot',$card)
		,	left = 0
		;
		$slider.data('currentSlide', currentSlide);
		$nextImage = $('#'+uid+'-'+currentSlide);
		$dot = $dot || $('#'+uid+'-dot-'+currentSlide);
		$dots.not($dot.addClass('active')).removeClass('active');
		left = $nextImage.position().left;
		left*=-1;
		$slider.css('left',left+'px');
	}

	var nextPrev = function($card,$slider, direction){
		var	currentSlide = $slider.data('currentSlide') || 0
		,	totalImages = $slider.data('images') -1
		;
		currentSlide = currentSlide + (1 * direction);
		if(currentSlide > totalImages){currentSlide = 0;}
		if(currentSlide < 0){currentSlide = totalImages;}
		go(currentSlide,$card,$slider)
	}

	$Wrapper.on('click','.slider-control',function(e){
		e.preventDefault();
		var $control = $(this)
		,	direction = $control.data('dir') == 'left' ? -1 : 1
		,	$card = $control.parent().parent()
		,	$slider = $card.children('.slides').first()
		;
		nextPrev($card,$slider,direction);
		return false;
	}).on('click','.dot',function(e){
		e.preventDefault();
		var $control = $(this)
		,	$card = $control.parent().parent()
		,	$slider = $card.children('.slides').first()
		,	currentSlide = $control.data('num')
		go(currentSlide,$card,$slider,$control)
		return false;
	}).on('movestart','.slides',function(e){
		if ((e.distX > e.distY && e.distX < -e.distY) || (e.distX < e.distY && e.distX > -e.distY)) {
		//	e.preventDefault();
		}
	}).on('swipeleft', '.slides',function(e) {
		var $slider = $(this)
		,	$card = $slider.parent()
		,	direction = 1
		;
		nextPrev($card,$slider,direction);
	}).on('swiperight', '.slides',function(e) {
		var $slider = $(this)
		,	$card = $slider.parent()
		,	direction = -1
		;
		nextPrev($card,$slider,direction);
	});

}