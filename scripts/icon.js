jQuery(function($){ 

var $source = $(".container");
var $mediatype = $source.data("mediatype");
var $autoplay = $source.data("autoplay");
var $metarefresh = $source.data("metarefresh");
var $metatimeout = $source.data("metatimeout");
var showartwork = $source.data("showartwork");
var $src = $source.attr("src");
var options = {};

var isRunning = false;

function getmetadata() {

        if (!isRunning) {
            console.log('getmetadata executing')
            isRunning = true;
            $.ajax({
                type: "GET",
                format: "json",
                url: "//tx.sharp-stream.com/http_live.php?i=kissnational.mp3",
                data: {
                    src: $src
                },
                success: function success(msg) {
                    console.log('success');
                    isRunning = false;
                },
                error: function error(jqXHR, textStatus, errorThrown) {
                    if (textStatus === "timeout") {
                        isRunning = false;
                    }
                    console.log('error');
                },
            });
        }
    }


setInterval(function(){
  console.log('begin')
  $.ajax({
    type: "POST",
    format: "json",
    url: "/wp-content/themes/radio-serpentine/metadata.php",
    data: {
      streamurl: 'http://tx.sharp-stream.com/http_live.php?i=rsl7.mp3&device=website'
    },
    success: function success(msg) {
       console.log('success')
       console.log(msg);
    },
    error: function error(jqXHR, textStatus, errorThrown) {
      console.log(errorThrown);
    },
  });
}, 3000);



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
