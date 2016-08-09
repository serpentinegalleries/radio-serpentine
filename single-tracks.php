<div id="player">This is the player element.</div>


<script>

var player = document.getElementById('player');

SC.stream('/resolve.json?url=https://soundcloud.com/serpentine-uk/invocations-for-hilma-af-klint-zadie-xa-ride-the-chaktu-first-contact/tracks&client_id=43c06cb0c044139be1d46e4f91eb411d').then(function(player){
  player.play();
});

</script>

