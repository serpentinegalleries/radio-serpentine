<div id="player-template">
</div>


<script type='template' id='playerTemplate'>
<!-- Modal -->
<div class="modal" id="player" role="dialog" aria-labelledby="playerModalLabel">
    <div class="modal-content">
      <div class="modal-body">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
		<%= custom_fields.audio %>

        <button id="down">Down</button>
        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
      </div>
    </div>
</div>
</script>


<script type="text/javascript">

	jQuery(function($){ 

		var SCstream;
		$("#play").on("click", function(){
			if(SCstream == undefined) {
				SC.stream('/resolve.json?url=https://soundcloud.com/serpentine-uk/invocations-for-hilma-af-klint-zadie-xa-ride-the-chaktu-first-contact/').then(function(sound){
					SCstream = sound;
					SCstream.play();
				});
			} else {
				SCstream.play();
			}
		});
		$("#pause").on("click", function(){
			if(SCstream) {
				SCstream.pause();
			}
		});

		$("#up").click(function(){
	    	$("#player").css("z-index", 10);
		});

		$("#down").click(function(){
		    $("#player-template").css("z-index",-10);
		    $("#player").css("z-index",-10);
		    $(".modal-backdrop").css("z-index",-10);
		    $('body').removeClass('modal-open');
		});

	});

</script>
