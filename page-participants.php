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


<div class="container header-page">
	<div class="col-lg-8 col-lg-offset-1 col-md-9 col-sm-8 col-xs-7">
		<h2>
			<?php wp_title(''); ?>
		</h2>
	</div>
	<div class="col-lg-2 col-md-3 col-sm-4 col-xs-5">
		<p>
			Search X
		</p>
	</div>
</div>

<div id="grid-template" class="container">
	<div id="grid-images">
	</div>
</div>


<script type='template' id='gridTemplate'>

	<a href="<%- url %>">

	<div class="col-lg-3 col-md-3 col-sm-4 col-xs-6 grid-item">

		<div class="circle-wrapper">
			<div class="circle-border">
				<p>
					42
				</p>
			</div>
			<div class="circle-mask">
				<% if(typeof thumbnail_images !== 'undefined') { %>
				    <img src="<%= thumbnail_images.medium.url %>" alt="<%- title %>">
				<% } else { %>
					<img src="http://placehold.it/250x250" alt="<%- title %>">
				<% } %>
			</div>
			<div class="grid-item-description">
				<h4>
					<%= title %>
				</h4>
				<h6>
					<%= custom_fields.title %>
				</h6>
				<p>
					<%= custom_fields.country %>
				</p>
			</div>
		</div>

	</div>

    </a>
 
</script>


<?php get_footer(); ?>