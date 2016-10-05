jQuery(function($){ 

    SC.initialize({
      client_id: '43c06cb0c044139be1d46e4f91eb411d',
    });

    $.get(
      'http://api.soundcloud.com/resolve.json?url=https://soundcloud.com/serpentine-uk/saturday-talk-anthea-hamilton_24-aug-2013&client_id=43c06cb0c044139be1d46e4f91eb411d', 
      function (result) {
        console.log("jQuery: " + result.uri);
      }
    );
/*
    SC.get('/resolve.json?url=https://soundcloud.com/serpentine-uk/saturday-talk-anthea-hamilton_24-aug-2013&client_id=43c06cb0c044139be1d46e4f91eb411d').then(function(sound){
          console.log("SC: " + sound.uri);
    }).catch(function (error) {
      alert('There was an error ' + error.message);
    });*/


    /*SC.stream('/tracks/152450338').then(function(player){
      player.play();
    });*/

const path = document.querySelector('#wave');
const animation = document.querySelector('#moveTheWave');
const m = 0.512286623256592433;

function buildWave(w, h) {
  
  const a = h / 4;
  const y = h / 2;
  
  const pathData = [
    'M', w * 0, y + a / 2, 
    'c', 
      a * m, 0,
      -(1 - a) * m, -a, 
      a, -a,
    's', 
      -(1 - a) * m, a,
      a, a,
    's', 
      -(1 - a) * m, -a,
      a, -a,
    's', 
      -(1 - a) * m, a,
      a, a,
    's', 
      -(1 - a) * m, -a,
      a, -a,
    
    's', 
      -(1 - a) * m, a,
      a, a,
    's', 
      -(1 - a) * m, -a,
      a, -a,
    's', 
      -(1 - a) * m, a,
      a, a,
    's', 
      -(1 - a) * m, -a,
      a, -a,
    's', 
      -(1 - a) * m, a,
      a, a,
    's', 
      -(1 - a) * m, -a,
      a, -a,
    's', 
      -(1 - a) * m, a,
      a, a,
    's', 
      -(1 - a) * m, -a,
      a, -a,
    's', 
      -(1 - a) * m, a,
      a, a,
    's', 
      -(1 - a) * m, -a,
      a, -a
  ].join(' ');
  
  path.setAttribute('d', pathData);
}

buildWave(90, 60);

});
