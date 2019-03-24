// i = row | p = column
var lakeCoords = [];
var objImage = null;
var gridGrids = [];
function main(){
  objImage = document.getElementById("user");
  var main = document.getElementById("main");
  var grid = createArray(20,main);
  fillGrid(grid,main);
  gridGrids.push(grid);
  
  console.log(gridGrids);
  init();
}

function createArray(rows,main){
  main.style.width = rows*40 + "px";
  var arr = [];
  var p = 0;
  for (var i=0;i<rows;i++) {
    arr[i] = [];
  }

  for(var p = 0; p < rows; p++){
    for(var x = 0; x < rows; x++){
      if(p == 0 || p == rows-1){
        arr[p][x] = 1;
      } else if(x == 0 || x == rows-1){
        arr[p][x] = 1;
      } else {
        arr[p][x] = 0;
      }
    }
  }
  sides = getLakeSides();
  arr = generateLakes(setLakeCoords(sides,arr,20));
  arr = generateLakes(setLakeCoords(sides,arr,20));
  return arr;
}


function fillGrid(arr,main){
  var randPosX = Math.floor(Math.random() * 19) + 0;
  var randPosY = Math.floor(Math.random() * 19) + 0;
  for(var i = 0; i<arr.length; i++){
    var row = document.createElement("div");
    row.id = "row" + i;
    row.className = "row";
    main.appendChild(row);
    for(var x = 0; x<arr.length;x++){
      var column = document.createElement("div");
      column.id = 'l';
      if(arr[i][x] == 1){
        // column.style.background = "black";
        column.className = "ground";
      } else if(arr[i][x] == 4){
        column.style.background = "blue";
        column.className = "water";
      } else {
        column.className = "ground";
      }
      document.getElementById("row"+i).appendChild(column);
    }
  }
  console.log(arr);
}
// var objImage = null;
function init(){
  objImage.style.position='relative';
  objImage.style.left='0px';
  objImage.style.top='0px';
}

function getKeyAndMove(e){
	var key_code=e.which||e.keyCode;
  console.log(objImage);
	switch(key_code){
		case 37: //left arrow key
			moveLeft();
			break;
		case 38: //Up arrow key
			moveUp();
			break;
		case 39: //right arrow key
			moveRight();
			break;
		case 40: //down arrow key
			moveDown();
			break;
	}
}
function moveLeft(){
	objImage.style.left=parseInt(objImage.style.left)-10 +'px';
}
function moveUp(){
	objImage.style.top=parseInt(objImage.style.top)-10 +'px';
}
function moveRight(){
	objImage.style.left=parseInt(objImage.style.left)+10 +'px';
}
function moveDown(){
	objImage.style.top=parseInt(objImage.style.top)+10 +'px';
}

function getLakeSides(){
  var i = Math.floor(Math.random() * 19) + 0;
  var x;
  if(i != 0 && i != 19){
    x = Math.floor(Math.random() * 2) + 0;
    console.log(x);
    if(x == 1){
      x = 0;
    } else {
      x = 19
    }
  } else {
    x = Math.floor(Math.random() * 19) + 0;
  }
  return [i,x];
}

function setLakeCoords(sides,arr,span){
  for(var i = 0; i < span; i++){
    for(var x = 0; x < span; x++){
      if(arr[i][x] == 1){
        if(i == 0 || i == 19){
          if(x == sides[1] && i == sides[0]){
            arr[i][x] = 4
            lakeCoords.push([i,x]);
            break;
          }
        } else if(i == sides[0] && x == sides[1] && (x != 0 || x != 19)){
          arr[i][x] = 4
          lakeCoords.push([i,x]);
          break;
        }
      }
    }
  }
  return arr;
  }


  function generateLakes(arr){
    var sPoint = lakeCoords[0];
    var sI = sPoint[0];
    var sX = sPoint[1];
    var isteps = 0;
    var xsteps = 0;
    if(sX == 0){
    while((sI + isteps < 19 && sX + xsteps < 19) && (sI + isteps >= 0 && sX + xsteps >= 0)){
        var dir = Math.floor(Math.random() * 3) + 1;
        switch(dir){
          case 1:
            isteps++;
            arr[sI + isteps][sX + xsteps] = 4;
            break;
          case 2:
            xsteps++;
            arr[sI + isteps][sX + xsteps] = 4;
            break;
          case 3:
            isteps--;
            if(sI + isteps < 0){
              isteps++;
              break;
            }
            arr[sI + isteps][sX + xsteps] = 4;
            break;
        }
      }
    }
    if(sX == 19){
      while((sI + isteps > 0 && sX + xsteps > 0)){
        var dir = Math.floor(Math.random() * 3) + 1;
        switch(dir){
            case 1:
              isteps++;
              if(sI + isteps == 20){
                isteps--;
                break;
              }
              arr[sI + isteps][sX + xsteps] = 4;
              break;
            case 2:
              xsteps--;
              arr[sI + isteps][sX + xsteps] = 4;
              break;
            case 3:
              isteps--;
              if(sI + isteps < 0){
                isteps++;
                break;
              }
              arr[sI + isteps][sX + xsteps] = 4;
              break;
        }
      }
    }
    return arr;
  }
