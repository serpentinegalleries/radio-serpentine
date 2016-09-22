<?php
/**
 * The template for displaying the front page.
 *
 *
 */

get_header( 'home' ); ?>

<!-- MAIN CONTENT -->
<div class="container">

    <!-- CONTENT INJECTION -->
    <div ui-view></div>

</div> 

<!-- PLAYER MODAL 
<div class="modal" id="player" role="dialog" aria-labelledby="playerModalLabel">
    <div class="modal-content">
      <div class="modal-body">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <p>
          <audio id="audioPlayer" controls></audio>
        </p>
        <button type="button" id="down">Down</button>
        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
      </div>
    </div>
</div>-->




<?php get_footer(); ?>


