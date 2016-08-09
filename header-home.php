<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
<meta charset="<?php bloginfo( 'charset' ); ?>">
<link rel="profile" href="http://gmpg.org/xfn/11">
<?php wp_head(); ?>
</head>
<body>

	<!-- Main navigation -->
	<?php 
	do_action( 'omega_before_header' );
	?>

	<!-- Featured post -->
	<div class="container">
		<div class="row">
			<div class="col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1 col-sm-12 col-xs-12">
				<div id="header-template">

				</div>
			</div>
		</div>
	</div>

	<script type='template' id='headerTemplate'>
		
		<a href="<%- url %>">

			<div class="header-feature">
				<div class="header-mask">

					<img class="header-mask-image" src="<%= thumbnail_images == 'undefined' ? 'http://placehold.it/350x150' : thumbnail_images.large.url %>" alt="<%- title %>">

				</div>

				<div class="header-feature-text">
			  		<h5>
						<%= custom_fields.participant %>
					</h5>
					<h1>
			    		<%= title %>
			  		</h1>
				</div>

			</div>

		</a>

	</script>




