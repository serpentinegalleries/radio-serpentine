<?php
/**
 * The template for displaying the front page.
 *
 *
 */

get_header( 'home' ); ?>

<!-- MAIN CONTENT -->
<div class="container">

    <!-- CONTENT INJECTION -->
    <div class="main" ui-view></div>


</div> 

<?php get_footer(); ?>


