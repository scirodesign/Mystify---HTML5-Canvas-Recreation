jQuery(document).ready(function($) {


  var stage = new createjs.Stage('canvas');
  var canvas = document.getElementById("canvas");
  createjs.Ticker.addEventListener("tick", handleTick);
  createjs.Ticker.setFPS(60);


  var pointsAmt = 4;
  var lineChildren = 4;
  var degradeDistance = 20;
  var masterPointArray = [];
  var childrenArray = [];



  for(var i=0; i<pointsAmt; i++){
    var singleLinePoint = new pointObj(_.random(0, canvas.width),_.random(0, canvas.height),lineChildren);
    childrenArray.push(singleLinePoint);
  }
  masterPointArray.push(childrenArray);



  function pointObj(px,py){
      this.x = px;
      this.y = py;
      this.dirX = _.random(-2,-2);
      this.dirY = _.random(-2,-2);
      this.lvDx = 0;
      this.lvDy = 0;
      return this;
    }



  var lineShape = new createjs.Shape();
  stage.addChild(lineShape);

  lineShape.graphics.beginStroke("white");





  //createjs.Ticker.addEventListener("tick", handleTick);
  function handleTick(event) {
    lineShape.graphics.clear();
    lineShape.graphics.beginStroke("white");

    _.each(masterPointArray, function(idx, i){
      _.each(masterPointArray[i], function(idxC, iC){
      if(i == 0){
        masterPointArray[i][iC].x += masterPointArray[i][iC].dirX;
        masterPointArray[i][iC].y += masterPointArray[i][iC].dirY;
      }else{
        masterPointArray[i][iC].x = masterPointArray[0][iC].x;
        masterPointArray[i][iC].y = masterPointArray[0][iC].y;
      }

        if(masterPointArray[i][iC].x < 0){
          masterPointArray[i][iC].dirX *= -1;
          masterPointArray[i][iC].x *= -1;
        }if(masterPointArray[i][iC].x > canvas.width){
          masterPointArray[i][iC].dirX *= -1;
        }if(masterPointArray[i][iC].y < 0){
          masterPointArray[i][iC].dirY *= -1;
        }if(masterPointArray[i][iC].y > canvas.height){
          masterPointArray[i][iC].dirY *= -1;
        }
        lineShape.graphics.lineTo(masterPointArray[i][iC].x + (i * degradeDistance), masterPointArray[i][iC].y + (i *degradeDistance) );
        if(iC == lineChildren - 1){
          lineShape.graphics.lineTo(masterPointArray[i][0].x + (i * degradeDistance), masterPointArray[i][0].y + (i *degradeDistance) );
        }
      });
      var clonedArray = JSON.parse(JSON.stringify(childrenArray))
      masterPointArray.push(clonedArray);
      masterPointArray = masterPointArray.slice(0,lineChildren);

    });

    stage.update();

  }


});
