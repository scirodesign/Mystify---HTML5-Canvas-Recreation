jQuery(document).ready(function($) {


  var stage = new createjs.Stage('canvas');
  var canvas = document.getElementById("canvas");
  createjs.Ticker.addEventListener("tick", handleTick);
  createjs.Ticker.setFPS(60);



  var pointsAmt = 4;
  var lineChildren = 6;
  var degradeDistance = 5;
  var masterPointArray = [];
  //var childrenArray = [];

  canvas.width = jQuery(document).width();
  canvas.height = jQuery(document).height();


  for(var i=0; i<pointsAmt; i++){
    var singleLinePoint = new pointObj(_.random(0, canvas.width),_.random(0, canvas.height),lineChildren);
    masterPointArray.push(singleLinePoint);
  }
  //masterPointArray.push(childrenArray);



  function pointObj(px,py){
      this.x = px;
      this.y = py;
      this.dir = [10,10];
      this.cDurX = 0;
      this.cDurY = 0;
      this.ldir = [{x:px,y:py}];
      return this;
    }



  var lineShape = new createjs.Shape();
  stage.addChild(lineShape);




  var inc = 0;
  //createjs.Ticker.addEventListener("tick", handleTick);
  function handleTick(event) {
    inc++;
    lineShape.graphics.clear();
    lineShape.graphics.beginStroke("white");

    _.each(masterPointArray, function(idx, i){

      //Take the last two position values store them in object to be put into array
      var ldirObj = {x:masterPointArray[i].x, y:masterPointArray[i].y + degradeDistance};

      //masterPointArray[i].cDurX = masterPointArray[i].x - (masterPointArray[i].x += masterPointArray[i].dir[0]);
      //masterPointArray[i].cDurY = masterPointArray[i].y - (masterPointArray[i].y += masterPointArray[i].dir[1]);

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
        lineShape.graphics.lineTo(masterPointArray[i].ldir[lC].x + i, masterPointArray[i].ldir[lC].y + i);
        if(i == masterPointArray.length -1) {
          lineShape.graphics.lineTo(masterPointArray[0].ldir[lC].x + i, masterPointArray[0].ldir[lC].y + i);
        }
      });
    }

    stage.update();

    if(inc % 130 ==0){
      console.log(masterPointArray)
    }

  }


});
