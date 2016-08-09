<?php
/**
 * The template for displaying the footer.
 *
 * Contains the closing of the class=site-inner div and all content after
 *
 */
?>


<?php wp_footer(); ?>

<script type="text/javascript">
SC.initialize({
  client_id: '43c06cb0c044139be1d46e4f91eb411d'
});

jQuery(function($){ 

	var cw = $('.circle img').width();
	$('.circle img').css({
	    'height': cw + 'px'
	});

	$(window).resize(function(){
		$('.circle').each(function(){
		        $(this).height($(this).width());
		});
	});
	$(window).load(function(){
		$('.circle').each(function(){
		        $(this).height($(this).width());
		});
	});


});
</script>

</body>
</html>