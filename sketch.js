var globe;
var total = 75;

var offset = 0;

var m = 0;
var mchange = 0;

var a = 1;
var b = 1;






function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  background( 0);
  colorMode(HSB, 100);
  globe = new Array((total+1)*(total+1));
}





function supershape( theta, m, n1, n2, n3) {
  var t1 = abs((1/a)*cos(m * theta / 4));
  t1 = pow(t1, n2);
  var t2 = abs((1/b)*sin(m * theta/4));
  t2 = pow(t2, n3);
  var t3 = t1 + t2;
  var r = pow(t3, -1 / n1);
  return r;
}


function draw() {
  if (mouseIsPressed) {
    mchange = 0;
  } else {
    mchange += 0.03;
  }


  //m =7; // map(sin(mchange), -1, 1, 0, 7);
  mchange += 0.03;

  rotateX(mchange);


  m = map(mouseX, mouseY, 0, 0, 7);


  background(0);
  noStroke();
  //lights();
  var r = 200;
  for (var i = 0; i < total+1; i++) {
      var lat = map(i, 0, total, -HALF_PI, HALF_PI);
      var r2 = supershape(lat, m, 0.2, 1.7, 1.7);
      //float r2 = supershape(lat, 2, 10, 10, 10);
      for (var j = 0; j < total+1; j++) {
        var lon = map(j, 0, total, -PI, PI);
        var r1 = supershape(lon, m, 0.2, 1.7, 1.7);
        //float r1 = supershape(lon, 8, 60, 100, 30);
        var x = r * r1 * cos(lon) * r2 * cos(lat);
        var y = r * r1 * sin(lon) * r2 * cos(lat);
        var z = r * r2 * sin(lat);
        var index = i + j * (total + 1);
        globe[index] = createVector(x, y, z);

    }




  }


    //stroke(255);
    //fill(255);
    //noFill();
    offset += 5;
    for (var i = 0; i < total; i++) {
      var hu = map(i, 0, total, 0, 255*6);
      fill((hu + offset) % 255, 255, 255);
      beginShape(TRIANGLE_STRIP);
      for (var j = 0; j < total+1; j++) {
        var index1 = i + j * (total + 1);
        var v1 = globe[index1];
        vertex(v1.x, v1.y, v1.z);
        var index2 = (i + 1) + j * (total + 1);
        var v2 = globe[index2];
        push();
        translate(v1.x, v1.y, v1.z);
        //noFill(0);
        stroke(255);
        box(2);
        pop();
        vertex(v2.x, v2.y, v2.z);

    }
      endShape();
  }

}
