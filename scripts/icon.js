jQuery(function($){ 

setInterval(function(){
  $.ajax({
    type: "POST",
    format: "json",
    url: "/wp-content/themes/radio-serpentine/metadata.php",
    data: {
      streamurl: 'http://tx.sharp-stream.com/http_live.php?i=rsl7.mp3&device=website'
    },
    success: function success(msg) {
       console.log(msg);
       $('#live-metadata').html(msg);
    },
    error: function error(jqXHR, textStatus, errorThrown) {
      console.log(errorThrown);
    },
  });
}, 3000);

$.ajax({
  type: "POST",
  format: "json",
  url: "/wp-content/themes/radio-serpentine/metadata.php",
  data: {
    streamurl: 'http://tx.sharp-stream.com/http_live.php?i=rsl7.mp3&device=website'
  },
  success: function success(msg) {
     console.log(msg);
     $('#live-metadata').html(msg);
  },
  error: function error(jqXHR, textStatus, errorThrown) {
    console.log(errorThrown);
  },
});


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
