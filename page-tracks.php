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


<div id="tracks" class="container">
  <div class="row">
    <div class="col-lg-3">
      <h5>
        Title
      </h5>
    </div>
    <div class="col-lg-3">
      <h5>
        Participant
      </h5>
    </div>    
    <div class="col-lg-2">
      <h5>
        Series
      </h5>
    </div>
    <div class="col-lg-2">
      <h5>
        Theme
      </h5>
    </div>
    <div class="col-lg-1">
      <h5>
        Length
      </h5>
    </div>
    <div class="col-lg-1">
      <h5>
        Date
      </h5>
    </div>
  </div>

  <hr>

  <div id="grid-template">
    <div id="grid-images">
    </div>
  </div>

</div>

<script type='template' id='gridTemplate'>
  <div class="row">
    <div class="col-lg-3">
      <p>
        <%= title %>
      </p>
    </div>
    <div class="col-lg-3">
      <p>
        <%= custom_fields.participant %>
      </p>
    </div>    
    <div class="col-lg-2">
      <p>
        <%= custom_fields.series %>
      </p>
    </div>
    <div class="col-lg-2">
      <p>
        <%= custom_fields.theme %>
      </p>
    </div>
    <div class="col-lg-1">
      <p>
        Length
      </p>
    </div>
    <div class="col-lg-1">
      <p>
        <%= date %>
      </p>
    </div>
  </div>

  <hr>

</script>


<?php get_footer(); ?>

<script>
var toMmDdYy = function(input) {
    var ptrn = /(\d{4})\-(\d{2})\-(\d{2})/;
    if(!input || !input.match(ptrn)) {
        return null;
    }
    return input.replace(ptrn, '$2/$3/$1');
};

</script>