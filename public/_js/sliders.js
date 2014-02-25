module.exports = function($Wrapper){
	var go = function(nextSlide,$card,$slider,$dot,loop,totalImages,currentSlide){
		var	uid = $slider.data('slug')
		,	$nextImage
		,	$dots = $('.dot',$card)
		,	loop = loop || $slider.hasClass('slider-loop')
		,	totalImages = (!loop) ? totalImages || $slider.data('images') -1 : false
		,	currentSlide = (!loop) ? currentSlide || $slider.data('currentSlide') || 0 : false
		,	left = 0
		;
		$slider.data('currentSlide', nextSlide);
		$nextImage = $('#'+uid+'-'+nextSlide);
		$dot = $dot || $('#'+uid+'-dot-'+nextSlide);
		$dots.not($dot.addClass('active')).removeClass('active');
		left = $nextImage.position().left;
		left*=-1;
		$slider.css('left',left+'px');
		if(!loop){
			if(nextSlide==0){$card.addClass('position-first-page').removeClass('position-last-page');}
			else if(nextSlide==totalImages){$card.addClass('position-last-page').removeClass('position-first-page');}
			else{$card.removeClass('position-first-page').removeClass('position-last-page');}
		}
	}

	var nextPrev = function($card,$slider, direction){
		var	currentSlide = $slider.data('currentSlide') || 0
		,	nextSlide = currentSlide
		,	loop = $slider.hasClass('slider-loop')
		,	totalImages = $slider.data('images') -1
		;
		nextSlide = currentSlide + (1 * direction);
		if(nextSlide > totalImages){
			nextSlide = loop ? 0 : currentSlide;
		}
		else if(nextSlide < 0){
			nextSlide = loop ? totalImages : currentSlide;
		}
		go(nextSlide,$card,$slider,null,loop,totalImages,currentSlide)
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