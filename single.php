<?php
/**
 * The Template for displaying all single posts.
 *
 * @package Omega
 */

get_header(); ?>

<main>

	<div class="container">

		<?php
			do_action( 'omega_before_content' );
			do_action( 'omega_content' );
			do_action( 'omega_after_content' );			
		?>

		<!-- Button trigger modal -->
		<button type="button" id="playerModal" class="btn btn-primary btn-lg" data-toggle="modal" data-target="#player">
		  Launch demo modal
		</button>

		<button id="up">Up</button>

	</div>

</main><!-- .content -->



<?php get_footer(); ?>

<?php
// 'cat-1' and 'cat-2' are category slugs

if(has_term('tracks', 'category', $post)) {
  // use template file single-template-cat-1.php
  get_template_part('single-tracks');
}
?>


