<div id="player">This is the player element.</div>


<script src="https://connect.soundcloud.com/sdk/sdk-3.1.2.js"></script>
<script>
SC.initialize({
  client_id: '43c06cb0c044139be1d46e4f91eb411d'
});

var player = document.getElementById('player');

SC.stream('/resolve.json?url='.<?php return get_post_meta( get_the_ID(), 'audio' ); ?>.'/tracks&client_id=43c06cb0c044139be1d46e4f91eb411d').then(function(player){
  player.play();
});



</script>

