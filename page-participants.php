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


<div id="grid-template" class="container">
	<div id="grid-images">
	</div>
</div>


<script type='template' id='gridTemplate'>

  	<a href="<%- url %>">

    <div class="col-lg-3 col-md-3 col-sm-4 col-xs-6">

        <div class="circle">
    			<img src="<%= thumbnail_images == 'undefined' ? 'http://placehold.it/350x150' : thumbnail_images.medium.url %>" alt="<%- title %>">
        </div>
    			<h5>
            		<%= custom_fields.participant %>
          		</h5>
          		<h6>
    				<%= title %>
    			</h6>

    	</div>

    </div>

    </a>
 
</script>


<?php get_footer(); ?>