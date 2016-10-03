jQuery(function($){ 

    SC.initialize({
      client_id: '43c06cb0c044139be1d46e4f91eb411d',
      redirect_uri: 'http://example.com/callback'
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
