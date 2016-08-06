<?php
/**
 * The Template for displaying all single posts.
 *
 * @package Omega
 */

get_header(); ?>

<?php
// 'cat-1' and 'cat-2' are category slugs

if(has_term('tracks', 'category', $post)) {
  // use template file single-template-cat-1.php
  get_template_part('single-tracks');
}

?>


<main class="<?php echo omega_apply_atomic( 'main_class', 'content' );?>" <?php omega_attr( 'content' ); ?>>
	<?php
	do_action( 'omega_before_content' );
	do_action( 'omega_content' );
	do_action( 'omega_after_content' );
	?>
	<?php
	// 'cat-1' and 'cat-2' are category slugs

		if(has_term('tracks', 'category', $post)) {
		  // use template file single-template-cat-1.php
		  get_template_part('single-tracks');
		  get_post_custom_values();
		}

	?>
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

