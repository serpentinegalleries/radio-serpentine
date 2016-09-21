
<!-- Modal -->
<div class="modal" id="player" role="dialog" aria-labelledby="playerModalLabel">
    <div class="modal-content">
      <div class="modal-body">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <p>
        	<audio id="audioPlayer" controls></audio>
        </p>
        <button id="down">Down</button>
        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
      </div>
    </div>
</div>


<script type="text/javascript">

	jQuery(function($){ 

		function changeTrack(audioUrl) {
			if(audioUrl.includes("soundcloud")) {
				SC.get('/resolve.json?url=' + audioUrl).then(function(sound){
					$("#audioPlayer").attr("src", sound.uri +  '/stream?client_id=43c06cb0c044139be1d46e4f91eb411d');
				});
			}
			else {
				$("#audioPlayer").attr("src", audioUrl);
			}
		}

		changeTrack('https://soundcloud.com/serpentine-uk/invocations-for-hilma-af-klint-zadie-xa-ride-the-chaktu-first-contact/');

		/*setInterval(function(){
			var music = document.getElementById('audioPlayer');
			console.log(music.currentTime);
		/* if(SCstream !== undefined) {
		 	var num = Number(SCstream.currentTime());
			var seconds = Math.floor(num / 1000);
			var minutes = Math.floor(seconds / 60);
			var seconds = seconds - (minutes * 60);
			var format = minutes + ':' + seconds;
			console.log(format)
		 }
		}, 1000);*/

		// if track ends, pick next in array

		$("#up").click(function(){
	    	$("#player").css("z-index", 10);
		});

		function changeZIndex(){
			$("#player").css("z-index", 10);
		};

		$("#down").click(function(){
		    $("#player-template").css("z-index",-10);
		    $("#player").css("z-index",-10).addClass("blur");
		    $(".modal-backdrop").css("z-index",-10);
		    $('body').removeClass('modal-open');
		});

	});

</script>
