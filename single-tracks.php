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

});

</script>

