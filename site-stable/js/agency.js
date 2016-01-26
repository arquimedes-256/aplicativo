/*!
 * Start Bootstrap - Agency Bootstrap Theme (http://startbootstrap.com)
 * Code licensed under the Apache License v2.0.
 * For details, see http://www.apache.org/licenses/LICENSE-2.0.
 */

// jQuery for page scrolling feature - requires jQuery Easing plugin
$(function() {
	$('a.page-scroll').bind('click', function(event) {
		var $anchor = $(this);
		$('html, body').stop().animate({
			scrollTop: $($anchor.attr('href')).offset().top
		}, 1500, 'easeInOutExpo');
		event.preventDefault();
	});
});

// Highlight the top nav as scrolling occurs
$('body').scrollspy({
	target: '.navbar-fixed-top'
})

// Closes the Responsive Menu on Menu Item Click
$('.navbar-collapse ul li a').click(function() {
	$('.navbar-toggle:visible').click();
});


var PHI = 1.618033988749894848204586834;
//custom
// When the DOM is ready
$(document).ready(function() {
	var scrollMagicController = new ScrollMagic();
	var numScenes = 5;

	for (var i = 1; i <= 5; i++) {

		var tween = TweenMax.to('#animation-' + i, 1 * PHI, {
			opacity: 1,
		});
		var scene1 = new ScrollScene({
				triggerElement: '#scene-' + i,
				offset: 0
			})
			.setTween(tween)
			.addTo(scrollMagicController);
		//scene1.addIndicators();
	}

	//init lens
	setTimeout(function() {
		$("#animation-5").imageLens({
			imageSrc: "imgs/gerencial.png",
			lensSize: 600 * PHI
		});
	}, 3000)
});