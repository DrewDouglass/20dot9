jQuery(document).ready(function($) {

	$('.navbar').sticky({
		topSpacing: 0
	});

	$('ul.nav a').smoothScroll({
		afterScroll: function(){
			$(this).parent().siblings().removeClass('active');
			$(this).parent().addClass('active');
		}
	});

	var $grid = $('.grid').isotope({
		itemSelector: '.grid-item'
	});
	$('.filters a').click(function(){
		filterValue = $(this).attr('data-filter');
		$grid.isotope({
			filter: filterValue
		});
		return false;
	});
});