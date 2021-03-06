<?php
/**
 * The template for displaying the front page.
 *
 *
 */

get_header( 'home' ); ?>

<div id="index-template">

  <div class="container" id="menu-nav">
    <ul class="list-inline">
      <li>
        <h4>
          <a class="menu-nav-item active" data-category="recent">
            Recent
          </a>
        </h4>
      </li>
      <li>
        <h4>
          <a class="menu-nav-item" data-category="participants">
            Participants
          </a>
        </h4>
      </li>
      <li>
        <h4>
          <a class="menu-nav-item" data-category="series">
            Series
          </a>
        </h4>
      </li>
      <li>
        <h4>
          <a class="menu-nav-item" data-category="themes">
            Themes
          </a>
        </h4>
      </li>
    </ul>
  </div>

  <!-- Track items -->
  <div id="menu-list" class="container">
    <div class="row">
      <div id="menu-images">
      </div>
    </div>
  </div>

</div>

<?php get_footer(); ?>

<!-- Template for track items -->
<script type='template' id='indexTemplate'>

  	<a href="<%- url %>">

    <div class="col-lg-1 col-md-2 col-sm-12 col-xs-12">

      <div class="menu-feature">

    		<div class="menu-mask">

    			<img class="menu-mask-image" src="<%= thumbnail_images == 'undefined' ? 'http://placehold.it/350x150' : thumbnail_images.medium.url %>" alt="<%- title %>">
          
    		</div>

    		<div class="menu-feature-text">
    			<h5>
            <%= title %>
          </h5>
          <h6>
    				<%= custom_fields.participant %>
    			</h6>
    		</div>

    	</div>

    </div>

    </a>
 
  </li>
</script>
