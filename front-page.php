<?php
/**
 * The template for displaying the front page.
 *
 *
 */

get_header( 'home' ); ?>


  <div id="menu-nav">
    <ul class="list-inline">
      <li>
        <h4>
          <a href="#recent" class="menu-nav-item active">
            Recent
          </a>
        </h4>
      </li>
      <li>
        <h4>
          <a href="#participants" class="menu-nav-item">
            Participants
          </a>
        </h4>
      </li>
      <li>
        <h4>
          <a href="#series" class="menu-nav-item">
            Series
          </a>
        </h4>
      </li>
      <li>
        <h4>
          <a href="#themes" class="menu-nav-item">
            Themes
          </a>
        </h4>
      </li>
    </ul>

  </div>


  <ul id="index-template" class="list-inline">
  </ul>

<?php get_footer(); ?>

<script type='template' id='indexTemplate'>

  <li>    

  	<a href="<%- url %>">

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

    </a>
 
  </li>
</script>
