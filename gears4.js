jQuery(document).ready(function($) {


  var stage = new createjs.Stage('canvas');
  var canvas = document.getElementById("canvas");
  createjs.Ticker.addEventListener("tick", handleTick);
  createjs.Ticker.setFPS(60);


  var pointsAmt = 4;
  var lineChildren = 4;
  var degradeDistance = 10;
  var rgb = [Math.floor(Math.random() * 256),Math.floor(Math.random() * 256),Math.floor(Math.random() * 256)];
  var masterPointArray = [];




  for(var i=0; i<pointsAmt; i++){
    var singleLinePoint = new pointObj(_.random(0, canvas.width),_.random(0, canvas.height),lineChildren);
    masterPointArray.push(singleLinePoint);
  }




  function pointObj(px,py){
      this.x = px;
      this.y = py;
      this.XhistoryArray = [];
      this.YhistoryArray = [];
      this.dirX = _.random(.5,.5);
      this.dirY = _.random(.5,.5);
      this.lvDx = 0;
      this.lvDy = 0;
      return this;
    }



  var lineShape = new createjs.Shape();
  stage.addChild(lineShape);

  lineShape.graphics.beginStroke("white");





  console.log(masterPointArray)

  //createjs.Ticker.addEventListener("tick", handleTick);
  function handleTick(event) {
    lineShape.graphics.clear();
    lineShape.graphics.beginStroke("white");

    _.each(masterPointArray, function(idx, i){
        masterPointArray[i].x += 1;
        masterPointArray[i].y += 1;

        lineShape.graphics.lineTo(masterPointArray[i].x, masterPointArray[i].y);
        lineShape.graphics.lineTo(masterPointArray[i].x, masterPointArray[i].y);
        if(i == lineChildren - 1){
          lineShape.graphics.lineTo(masterPointArray[0].x, masterPointArray[0].y);

        }



        masterPointArray[i].XhistoryArray.push(masterPointArray[i].x);
        masterPointArray[i].XhistoryArray = masterPointArray[i].XhistoryArray.slice(0,5);
        masterPointArray[i].YhistoryArray.push(masterPointArray[i].y);
        masterPointArray[i].YhistoryArray = masterPointArray[i].YhistoryArray.slice(0,5);
    })



    stage.update();

  }


});
