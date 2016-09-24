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
					<a ui-sref="home" href="/">radio.Serpentine</a>
				</li>
				<li class="menu-item">
					<a ui-sref="about" href="/about/">About</a>
				</li>
			</ul>
		</div>
	</nav><!-- /Navigation -->


	<div ng-controller="PlayerModalCtrl as $ctrl">
	    <script type="text/ng-template" id="myModalContent.html">
	        <div class="modal-body" id="modal-body">
	        	<i ng-click="$ctrl.min()" id="playerMin" class="fa fa-compress round-border" aria-hidden="true"></i>
	   	          <div ng-controller="AudioCtrl">
	              	<button ng-click="songSelect('https://soundcloud.com/serpentine-uk/marcos-luytens-chromalalia')">Change Track</button>
	              	<button ng-click="audioPause()">Pause</button>
	              	<button ng-click="audioPlay()">Play</button>
	        	<i id="playerBack" class="fa fa-long-arrow-left round-border" aria-hidden="true"></i>
	        	<i id="playerNext" class="fa fa-long-arrow-right round-border" aria-hidden="true"></i>
	          </div>
	        </div>
	    </script>

	    <div id="playerToggle" class="wave-container" ng-click="$ctrl.open()">
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