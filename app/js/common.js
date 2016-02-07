$(document).ready(function() {

	if($('input.data-inputmask').length > 0) {
		$('input.data-inputmask').mask("+7 (999) 999-99-99");
	}

	$('.section-1__down').click(function() {
		if($('section').is('.section-2')){
			var scrollLastForm = $('.section-2').offset().top-110;
			$('body,html').animate({scrollTop:scrollLastForm},800);
		}	
		return false;
	});

	var descriptions = $('.sync__descriptions').owlCarousel({
		loop: true,
		nav: false,
		mouseDrag: false,
		touchDrag: false,
		items: 1
	});

	var device = $('.divece__slider').owlCarousel({
		loop: true,
		nav: false,
		mouseDrag: false,
		touchDrag: false,
		items: 1
	});

	$('.sync__item').click(function (){
		$('.sync__item.active').removeClass('active');
		$(this).addClass('active');
		descriptions.trigger('to.owl.carousel', $(this).index());
		device.trigger('to.owl.carousel', $(this).index());
	});

	function number () {
		var date = new Date(),
				year = { begin: parseInt(date.getFullYear()), end: parseInt($('#year').data('end')), sum: 0},
				numone = { begin: parseInt($('#numone').text()), end: parseInt($('#numone').data('end')), sum: 0},
				numtwo = { begin: parseInt($('#numtwo').text()), end: parseInt($('#numtwo').data('end')), sum: 0},
				interval = 10000/numtwo;

		year.sum = (year.begin - year.end)/25; 
		numone.sum = numone.end/25; 
		numtwo.sum = numtwo.end/25; 

		

		var timer = setInterval(function(){
			numtwo.begin += numtwo.sum;
			numone.begin += numone.sum;
			year.begin -= year.sum;

			$('#year').text(Math.round(year.begin));
			$('#numone').text(Math.round(numone.begin));
			$('#numtwo').text(Math.round(numtwo.begin));

			if(Math.round(numtwo.begin) >= numtwo.end) clearInterval(timer);
		}, 60);

	}


	function animation_init() {
		move_el_init($('*[data-elmove="true"]'));

		setTimeout(function(){
			move_el_action($('*[data-elmove="true"]'));
		}, 1500)
	}

animation_init();

function move_el_init(el) {
	el.each(function(){
		var dur, posX, posY, transform_v, delay;

		if(!$(this).data('dur'))
			dur = 2;
		else
			dur = $(this).data('dur')

		posX = $(this).data('left')+'px';
		posY = $(this).data('top')+'px';

		if($(this).data('transform')) {
			transform_v = $(this).data('transform');
		} else {
			transform_v = '';
		}

		if($(this).data("delay")) {
			delay = $(this).data('delay');
		} else {
			delay = 0;
		}

		$(this).css({'transform': 'translate('+posX+', '+posY+') '+transform_v, opacity:0});
		var bll = $(this);
		setTimeout(function(){
			bll.css({transition:'all '+dur+'s ease', 'transition-delay': delay+'s'});
		}, 100)
	});
}

function move_el_action(el) {
	el.each(function(){
		if(check_pos($(this)) !== true || $(this).hasClass('animation_done__'))
			return;

		$(this).css({'transform':'translate(0,0) scale(1)', opacity:1}).addClass('animation_done__');
	})
}

function check_pos(bl) {

	if(bl.data('force-start') == true)
		return true;

	var offset = 0;
	if(bl.data('offset'))
		offset = bl.data('offset');

	var top_pos = bl.offset().top,
	wh = $(window).height(),
	wpos = $(window).scrollTop(),
	wbot = wh + wpos-wh*offset;

	if(wbot > top_pos) {
		return true;
	} else {
		return false; 
	}
}

var tech = [];

$(".tech-item-animate").each(function (i) {
	var top = $(this).offset().top,
		height = $(this).innerHeight(),
		dtop = $(this).data('top');
	tech[i] = { elm: $(this), top: top - dtop, bottom: top + height - dtop, height: height }
});

	$(window).scroll(function(){
		move_el_action($('*[data-elmove="true"]'));

		var wh = $(window).height(),
				wpos = $(window).scrollTop(),
				wtop = wh + wpos-wh*0.5,
				wnum = wh + wpos-wh*0.3;
		$('.tech-item__number.active').removeClass('active');
		tech.forEach(function(item, i) {
			if(item.top < wtop && item.bottom > wtop){
					item.elm.find('.tech-item__number').addClass('active');
				}
			//console.log(i + " - " + item.top + " - " + wtop + " - " + item.bottom+ " - " + item.height)
		});


		if($('.section-2__list').offset().top < wnum && !$('.section-2__list').hasClass('active')){
			$('.section-2__list').addClass('active');
			number();
		}

		/*$(".tech-item__number.active").removeClass('active');
		$(".tech-item__number").each(function () {
			if($(this).offset().top < wbot && $(this).offset().top > wtop) $(this).addClass('active');
		});*/
		

		if(wpos > 0){
			$('nav.nav-top').addClass('nav-fixed');
			$('nav.nav-top').removeClass('nav-in-up');
		}
		else{
			$('nav.nav-top').removeClass('nav-fixed');
			$('nav.nav-top').addClass('nav-in-up');
		}
	});


	


});

	//SVG Fallback
if (!Modernizr.svg) {
	// wrap this in a closure to not expose any conflicts
	(function() {
		// grab all images. getElementsByTagName works with IE5.5 and up
		var imgs = document.getElementsByTagName('img'),endsWithDotSvg = /.*\.svg$/,i = 0,l = imgs.length;
		// quick for loop
		for(; i < l; ++i) {
			if(imgs[i].src.match(endsWithDotSvg)) {
				// replace the png suffix with the svg one
				imgs[i].src = imgs[i].src.slice(0, -3) + 'png';
			}
		}
	})();
}