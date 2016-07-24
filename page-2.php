<?php
/**
 * The template for displaying all pages.
 *
 * This is the template that displays all pages by default.
 * Please note that this is the WordPress construct of pages
 * and that other 'pages' on your WordPress site will use a
 * different template.
 *
 */

get_header( 'home' ); ?>


<div id="index-template">
</div>

<?php get_footer(); ?>

<script type='template' id='indexTemplate'>

	<a href="<%- url %>">
    <div class="menu-feature">

  		<div class="menu-mask">

  			<img class="menu-mask-image" src="<%= thumbnail_images == 'undefined' ? 'http://placehold.it/350x150' : thumbnail_images.medium.url %>" alt="<%- title %>">
  		</div>

  		<div class="menu-feature-text">
  			<h4>
          <%= title %>
        </h4>
        <h6>
  				<%= custom_fields.participant %>
  			</h6>
  		</div>

  	</div>
  </a>

</script>
