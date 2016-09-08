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

    <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">

      <div class="circle-mask series">
        <% if(typeof thumbnail_images !== 'undefined') { %>
          <img src="<%= thumbnail_images.medium.url %>" alt="<%- title %>">
        <% } else { %>
          <img src="http://placehold.it/250x250" alt="<%- title %>">
        <% } %>
      </div>

      <div class="grid-item-description series">
        <h6>
          <%= custom_fields.title %>
        </h6>
        <h4>
          <%= title %>
        </h4>
      </div>


    </div>

  </a>
 
</script>


<?php get_footer(); ?>