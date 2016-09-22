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
    
        <button type="button" id="down">Down</button>
        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
      </div>
    </div>
</div>-->

<div ng-controller="ModalDemoCtrl as $ctrl">
    <script type="text/ng-template" id="myModalContent.html">
        <div class="modal-header">
            <h3 class="modal-title" id="modal-title">Im a modal!</h3>
        </div>
        <div class="modal-body" id="modal-body">
          <div ng-controller="AudioCtrl">
              <button ng-click="songSelect('https://soundcloud.com/serpentine-uk/marcos-luytens-chromalalia')">Play</button>
              <button ng-click="audioPause()">Pause</button>
          </div>
        </div>
        <div class="modal-footer">
            <button class="btn btn-primary" type="button" ng-click="$ctrl.ok()">OK</button>
            <button class="btn btn-warning" type="button" ng-click="$ctrl.cancel()">Cancel</button>
        </div>
    </script>

    <button type="button" class="btn btn-default" ng-click="$ctrl.open()">Open me!</button>

</div>



<?php get_footer(); ?>


