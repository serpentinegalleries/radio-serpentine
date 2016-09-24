jQuery(function($){ 

    SC.initialize({
      client_id: '43c06cb0c044139be1d46e4f91eb411d',
      redirect_uri: 'http://example.com/callback'
    });

    function changeTrack(audioUrl) {
      if(audioUrl.includes("soundcloud")) {
        SC.get('/resolve.json?url=' + audioUrl).then(function(sound){
          $("#audioPlayer").src(sound.uri +  '/stream?client_id=43c06cb0c044139be1d46e4f91eb411d');
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
        $("#player").css("z-index", 10000);
        $(".modal-backdrop").css("z-index",10);
        console.log("hello");
    });

    $("#playerModal").click(function(){
        console.log("hello");
    });


    $("#down").click(function(){
        $("#player").css("z-index",-10).addClass("blur");
        $(".modal-backdrop").css("z-index",-10);
        $('body').removeClass('modal-open');
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
