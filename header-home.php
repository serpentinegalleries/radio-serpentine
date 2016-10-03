<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
<meta charset="<?php bloginfo( 'charset' ); ?>">
<link rel="profile" href="http://gmpg.org/xfn/11">
<?php wp_head(); ?>

<base href="/">
</head>
<body ng-app="radioApp">

	<!-- Navigation -->
	<nav id="navigation" class="nav-primary" role="navigation" itemscope="itemscope" itemtype="http://schema.org/SiteNavigationElement">
		<div class="wrap">
			<ul id="menu-main-nav" class="menu omega-nav-menu menu-primary">
				<li class="menu-item">
					<a ui-sref="home">radio.Serpentine</a>
				</li>
				<li class="menu-item">
					<a ui-sref="about">About</a>
				</li>
			</ul>
		</div>
	</nav><!-- /Navigation -->


	<div ng-controller="WaveIconCtrl">

	    <div id="playerToggle" class="wave-container" ng-click="play()">
		  <svg xmlns="http://www.w3.org/2000/svg" 
		     width="42px" height="42px"
		     viewBox="20 4 40 50">
		    <path id="wave"
		        fill="none"
		        stroke="#262626"
		        stroke-width="2"
		        stroke-linecap="round">
		    </path>
		  </svg>
		</div>

	</div>