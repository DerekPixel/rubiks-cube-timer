
const Scrambler = () => {

  const scramble = () => {
    var turns = 25;
    var movesArray = ['R', 'L', 'U', 'D', 'B', 'F'];
    var scramble = '';
    var dir = '';
    var rand, face;

    //below here is pretty much used code from http://www.cubetimer.com/

    var faces = {
      'R' : { 'allowed' : true, 'enables' : ['U', 'D', 'F', 'B'] },
      'L' : { 'allowed' : true, 'enables' : ['U', 'D', 'F', 'B'] },
      'U' : { 'allowed' : true, 'enables' : ['R', 'L', 'F', 'B'] },
      'D' : { 'allowed' : true, 'enables' : ['R', 'L', 'F', 'B'] },
      'F' : { 'allowed' : true, 'enables' : ['R', 'L', 'U', 'D'] },
      'B' : { 'allowed' : true, 'enables' : ['R', 'L', 'U', 'D'] }
    };

    for(var i = 0; i < turns; i++) {
      do {
        rand = Math.floor(Math.random() * (movesArray.length));
        face = movesArray[rand];
      } while(! faces[face]['allowed'])

      faces[face]['allowed'] = false;

      for(var f = 0; f < faces[face]['enables'].length; f++) {
        faces[faces[face]['enables'][f]]['allowed'] = true;
      }

      switch(Math.floor(Math.random() * 3)) {
        case 0: dir = "";  break;
        case 1: dir = "'"; break;
        case 2: dir = "2"; break;
        default: break;
      }

      scramble += ` ${face}${dir}`;
    }

    return scramble;

  }

  return (
    <div>
      Scramble: {scramble()}
    </div>
  )
}

export default Scrambler
