jQuery(document).ready(function($) {


  var stage = new createjs.Stage('canvas');
  var canvas = document.getElementById("canvas");
  var pointsAmt = 5;
  var lineChildren = 6;
  var degradeDistance = 5;
  var frequency = .3;
  var masterPointArray = [];
  createjs.Ticker.addEventListener("tick", handleTick);
  createjs.Ticker.setFPS(60);
  canvas.width = jQuery(window).width();
  canvas.height = jQuery(window).height();
  jQuery(window).on("resize", resizeBrow);
  var phase = 1;
  var lineShape = new createjs.Shape();
  stage.addChild(lineShape);

  //setup points for one line obj
  for(var i=0; i<pointsAmt; i++){
    var singleLinePoint = new pointObj(_.random(0, canvas.width),_.random(0, canvas.height),lineChildren);
    masterPointArray.push(singleLinePoint);
  }

  //the point object
  function pointObj(px,py){
      this.x = px;
      this.y = py;
      this.dir = [_.random(8,10),_.random(8,10)];
      this.cDurX = 0;
      this.cDurY = 0;
      this.ldir = [{x:px,y:py}];
      return this;
    }

  //sine color incrementer
  function colorText(phase)
  {
    var center = 128;
    var width = 127;
    red   = Math.floor(Math.sin(frequency*i+2+phase) * width + center);
    green = Math.floor(Math.sin(frequency*i+0+phase) * width + center);
    blue  = Math.floor(Math.sin(frequency*i+4+phase) * width + center);
    return red +"," + green  + "," + blue;
  }

  //on browser resize change canvas dims
  function resizeBrow(){
    canvas.width = jQuery(window).width();
    canvas.height = jQuery(window).height();
  }

  function handleTick(event) {
    //increase phase gently for color change of sine
    phase+=.01;

    lineShape.graphics.clear();
    lineShape.graphics.beginStroke("rgb(" + colorText(phase) + ")");

    _.each(masterPointArray, function(idx, i){

      //Take the last x/y position values store them in object to be put into array
      var ldirObj = {x:masterPointArray[i].x, y:masterPointArray[i].y + degradeDistance};

      //take that object and add it to array of length (determined by lineChildren)
      masterPointArray[i].ldir.unshift(ldirObj);
      masterPointArray[i].ldir = masterPointArray[i].ldir.slice(0,lineChildren);

      //update the x/y pos after storing old values
      masterPointArray[i].x += masterPointArray[i].dir[0];
      masterPointArray[i].y += masterPointArray[i].dir[1];

      //Screen Pos Logic
      if(masterPointArray[i].x < 0){
        masterPointArray[i].dir[0] *= -1;
      }if(masterPointArray[i].x > canvas.width){
        masterPointArray[i].dir[0] *= -1;
      }if(masterPointArray[i].y < 0){
        masterPointArray[i].dir[1] *= -1;
      }if(masterPointArray[i].y > canvas.height){
        masterPointArray[i].dir[1] *= -1;
      }
    });
    for(var lC = 0; lC < lineChildren; lC++){
      _.each(masterPointArray, function(idx, i){
        if(masterPointArray[0].ldir.length == lineChildren){
          if(i === 0) {
            lineShape.graphics.moveTo(masterPointArray[0].ldir[lC].x + i, masterPointArray[0].ldir[lC].y + i);
          }
          lineShape.graphics.lineTo(masterPointArray[i].ldir[lC].x + i, masterPointArray[i].ldir[lC].y + i);
          if(i == masterPointArray.length -1) {
            lineShape.graphics.lineTo(masterPointArray[0].ldir[lC].x, masterPointArray[0].ldir[lC].y);
          }
        }
      });
    }
    stage.update();
  }
});
