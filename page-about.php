<?php
/**
 * The template for displaying all pages.
 *
 * This is the template that displays all pages by default.
 * Please note that this is the WordPress construct of pages
 * and that other 'pages' on your WordPress site will use a
 * different template.
 *
 * @package Omega
 */

get_header(); ?>
<main  class="<?php echo omega_apply_atomic( 'main_class', 'content' );?>" <?php omega_attr( 'content' ); ?>>
	<?php 
	do_action( 'omega_before_content' ); 
	do_action( 'omega_content' ); 
	do_action( 'omega_after_content' ); 
	?>
	<div id="player">This is the player element.</div>
</main><!-- .content -->
<?php get_footer(); ?>

<script src="https://connect.soundcloud.com/sdk/sdk-3.1.2.js"></script>
<script>
SC.initialize({
  client_id: '43c06cb0c044139be1d46e4f91eb411d'
});

var player = document.getElementById('player');

SC.stream('/resolve.json?url=https://soundcloud.com/serpentine-uk/invocations-for-hilma-af-klint-zadie-xa-ride-the-chaktu-first-contact/tracks&client_id=43c06cb0c044139be1d46e4f91eb411d').then(function(player){
  player.play();
});
</script>

