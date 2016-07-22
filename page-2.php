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

get_header(); ?>


<div id="carousel-example-generic" class="carousel slide" data-ride="carousel">
  <ol class="carousel-indicators">
    <li data-target="carousel-example-generic" data-slide-to="0" class="active"></li>
    <li data-target="carousel-example-generic" data-slide-to="1"></li>
    <li data-target="carousel-example-generic" data-slide-to="2"></li>
  </ol>
  <div class="carousel-inner" role="listbox">
    <div class="carousel-item active">
      <img data-src="..." alt="First slide">
    </div>
    <div class="carousel-item">
      <img data-src="..." alt="Second slide">
    </div>
    <div class="carousel-item">
      <img data-src="..." alt="Third slide">
    </div>
  </div>
  <a class="left carousel-control" role="button" data-slide="prev">
    <span class="icon-prev" aria-hidden="true"></span>
    <span class="sr-only">Previous</span>
  </a>
  <a class="right carousel-control" role="button" data-slide="next">
    <span class="icon-next" aria-hidden="true"></span>
    <span class="sr-only">Next</span>
  </a>
</div>


<div id="index-template">
</div>


<?php get_footer(); ?>

<script type='template' id='indexTemplate'>

	<div class="menu-feature col-sm-12">

		<div class="menu-mask">
			<img class="menu-mask-image" src="<%- thumbnail_images.medium.url %>" alt="<%- title %>">
		</div>

		<div class="menu-feature-text">
			<h4>
				<%- title %>
			</h4>
		</div>

	</div>

</script>
