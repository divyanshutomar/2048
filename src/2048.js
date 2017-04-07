

function game(){

var boxes = document.querySelectorAll('#gamebox>div');
var score,count;
var bestScore;

function Create2DArray(rows) {
  var arr = [];

  for (var i=0;i<rows;i++) {
     arr[i] = [0,0,0,0];
  }

  return arr;
}

var gameMat = Create2DArray(4);
function setScore(){
    document.getElementById("score").innerHTML = "Score : " + score;
    if(bestScore<=score)
        bestScore=score;
    document.getElementById("best").innerHTML = "Best : " + bestScore;
    

}
function resetGame(){
    if (score>=bestScore)
    bestScore=score;                   window.localStorage.setItem('bestscore',bestScore);
    for (i=0;i<4;i++)
        for(j=0;j<4;j++)
            gameMat[i][j]=0;
    score=0;
    setScore();
    setRandomEmpty();
    setRandomEmpty();
    
}

function getVal24(){
    //Probability of 2 is 85%.
    return (Math.random()<0.85)?2:4;    
}

function setGamemat(){
    for (var i=0;i<4;++i)
        for(var j=0;j<4;++j)
            if (gameMat[i][j]!=0)
                boxes[(i*4)+j].innerHTML=gameMat[i][j];
            else
                boxes[(i*4)+j].innerHTML="";
}

function getEmptyBox(){
    var arrEmpty = [];
    var size=0;
    for (var i=0;i<4;++i)
        for(var j=0;j<4;++j)
            if (gameMat[i][j]==0)
            {
                arrEmpty[size] = (i*4)+j;
                ++size;
            }

    return arrEmpty;
}

function setRandomEmpty(){
    var arr = getEmptyBox();
    var index = Math.floor(Math.random()*arr.length);
    indexGamemat = arr[index];
    //converting 1D index to 2D
    var x = Math.floor(indexGamemat/4);
    var y = Math.floor(indexGamemat%4);
    gameMat[x][y] = getVal24();
    setGamemat();
}

function moveUp(){
//Moving Non Empty Cells    
    for (var j=0;j<4;j++)
    {
        i=0;
        if(gameMat[i][j]!=0||gameMat[i+1][j]!=0||gameMat[i+2][j]!=0||gameMat[i+3][j]!=0)
        {
            if(gameMat[i][j]==0)
                while(gameMat[i][j]==0)
                {
                    gameMat[i][j]=gameMat[i+1][j];
                    gameMat[i+1][j]=gameMat[i+2][j];
                    gameMat[i+2][j]=gameMat[i+3][j];
                    gameMat[i+3][j]=0;
                }
            if((gameMat[i+1][j]==0) && (gameMat[i+2][j]!=0 || gameMat[i+3][j]!=0))
                while(gameMat[i+1][j]==0)
                {
                    gameMat[i+1][j]=gameMat[i+2][j];
                    gameMat[i+2][j]=gameMat[i+3][j];
                    gameMat[i+3][j]=0;
                }
            if((gameMat[i+2][j]==0) && (gameMat[i+3][j]!=0))
                while(gameMat[i+2][j]==0)
                {
                    gameMat[i+2][j]=gameMat[i+3][j];
                    gameMat[i+3][j]=0;
                }
          
        }
    }

//Adding and Merging
    for (var j=0;j<4;j++)
    {
        i=0;
        
        if(gameMat[i][j]==gameMat[i+1][j])
        {
            gameMat[i][j]*=2;
            score+=gameMat[i][j]*2;
            gameMat[i+1][j]=gameMat[i+2][j];
            gameMat[i+2][j]=gameMat[i+3][j];
            gameMat[i+3][j]=0;
        }
        if(gameMat[i+1][j]==gameMat[i+2][j])
        {
            gameMat[i+1][j]*=2;
            score+=gameMat[i+1][j]*2;
            gameMat[i+2][j]=gameMat[i+3][j];
            gameMat[i+3][j]=0;
        }
        if(gameMat[i+2][j]==gameMat[i+3][j])
        {
            gameMat[i+2][j]*=2;
            score+=gameMat[i+2][j]*2;
            gameMat[i+3][j]=0;
        }
        
    }
    
setGamemat();
setScore();
setRandomEmpty();    
end2048();    

}

function moveDown(){
//Moving Non Empty Cells    
    for (var j=0;j<4;j++)
    {
        i=3;
        if(gameMat[i][j]!=0||gameMat[i-1][j]!=0||gameMat[i-2][j]!=0||gameMat[i-3][j]!=0)
        {
            if(gameMat[i][j]==0)
                while(gameMat[i][j]==0)
                {
                    gameMat[i][j]=gameMat[i-1][j];
                    gameMat[i-1][j]=gameMat[i-2][j];
                    gameMat[i-2][j]=gameMat[i-3][j];
                    gameMat[i-3][j]=0;
                }
            if((gameMat[i-1][j]==0) && (gameMat[i-2][j]!=0 || gameMat[i-3][j]!=0))
                while(gameMat[i-1][j]==0)
                {
                    gameMat[i-1][j]=gameMat[i-2][j];
                    gameMat[i-2][j]=gameMat[i-3][j];
                    gameMat[i-3][j]=0;
                }
            if((gameMat[i-2][j]==0) && (gameMat[i-3][j]!=0))
                while(gameMat[i-2][j]==0)
                {
                    gameMat[i-2][j]=gameMat[i-3][j];
                    gameMat[i-3][j]=0;
                }
          
        }
    }

//Adding and Merging
    for (var j=0;j<4;j++)
    {
        i=3;
        
        if(gameMat[i][j]==gameMat[i-1][j])
        {
            gameMat[i][j]*=2;
            score+=gameMat[i][j]*2;
            gameMat[i-1][j]=gameMat[i-2][j];
            gameMat[i-2][j]=gameMat[i-3][j];
            gameMat[i-3][j]=0;
        }
        if(gameMat[i-1][j]==gameMat[i-2][j])
        {
            gameMat[i-1][j]*=2;
            score+=gameMat[i-1][j]*2;
            gameMat[i-2][j]=gameMat[i-3][j];
            gameMat[i-3][j]=0;
        }
        if(gameMat[i-2][j]==gameMat[i-3][j])
        {
            gameMat[i-2][j]*=2;
            score+=gameMat[i-2][j]*2;
            gameMat[i-3][j]=0;
        }
        
    }
    
setGamemat();
setScore();
setRandomEmpty();   
end2048();    

}

function moveLeft(){
//Moving Non Empty Cells    
    for (var i=0;i<4;i++)
    {
        j=0;
        if(gameMat[i][j]!=0||gameMat[i][j+1]!=0||gameMat[i][j+2]!=0||gameMat[i][j+3]!=0)
        {
            if(gameMat[i][j]==0)
                while(gameMat[i][j]==0)
                {
                    gameMat[i][j]=gameMat[i][j+1];
                    gameMat[i][j+1]=gameMat[i][j+2];
                    gameMat[i][j+2]=gameMat[i][j+3];
                    gameMat[i][j+3]=0;
                }
            if((gameMat[i][j+1]==0) && (gameMat[i][j+2]!=0 || gameMat[i][j+3]!=0))
                while(gameMat[i][j+1]==0)
                {
                    gameMat[i][j+1]=gameMat[i][j+2];
                    gameMat[i][j+2]=gameMat[i][j+3];
                    gameMat[i][j+3]=0;
                }
            if((gameMat[i][j+2]==0) && (gameMat[i][j+3]!=0))
                while(gameMat[i][j+2]==0)
                {
                    gameMat[i][j+2]=gameMat[i][j+3];
                    gameMat[i][j+3]=0;
                }
          
        }
    }

//Adding and Merging
    for (var i=0;i<4;i++)
    {
        j=0;
        
        if(gameMat[i][j]==gameMat[i][j+1])
        {
            gameMat[i][j]*=2;
            score+=gameMat[i][j]*2;
            gameMat[i][j+1]=gameMat[i][j+2];
            gameMat[i][j+2]=gameMat[i][j+3];
            gameMat[i][j+3]=0;
        }
        if(gameMat[i][j+1]==gameMat[i][j+2])
        {
            gameMat[i][j+1]*=2;
            score+=gameMat[i][j+1]*2;
            gameMat[i][j+2]=gameMat[i][j+3];
            gameMat[i][j+3]=0;
        }
        if(gameMat[i][j+2]==gameMat[i][j+3])
        {
            gameMat[i][j+2]*=2;
            score+=gameMat[i][j+2]*2;
            gameMat[i][j+3]=0;
        }
        
    }
    
setGamemat();
setScore();
setRandomEmpty();       
end2048();
}

function moveRight(){
//Moving Non Empty Cells    
    for (var i=0;i<4;i++)
    {
        j=3;
        if(gameMat[i][j]!=0||gameMat[i][j-1]!=0||gameMat[i][j-2]!=0||gameMat[i][j-3]!=0)
        {
            if(gameMat[i][j]==0)
                while(gameMat[i][j]==0)
                {
                    gameMat[i][j]=gameMat[i][j-1];
                    gameMat[i][j-1]=gameMat[i][j-2];
                    gameMat[i][j-2]=gameMat[i][j-3];
                    gameMat[i][j-3]=0;
                }
            if((gameMat[i][j-1]==0) && (gameMat[i][j-2]!=0 || gameMat[i][j-3]!=0))
                while(gameMat[i][j-1]==0)
                {
                    gameMat[i][j-1]=gameMat[i][j-2];
                    gameMat[i][j-2]=gameMat[i][j-3];
                    gameMat[i][j-3]=0;
                }
            if((gameMat[i][j-2]==0) && (gameMat[i][j-3]!=0))
                while(gameMat[i][j-2]==0)
                {
                    gameMat[i][j-2]=gameMat[i][j-3];
                    gameMat[i][j-3]=0;
                }
          
        }
    }

//Adding and Merging
    for (var i=0;i<4;i++)
    {
        j=3;
        
        if(gameMat[i][j]==gameMat[i][j-1])
        {
            gameMat[i][j]*=2;
            score+=gameMat[i][j]*2;
            gameMat[i][j-1]=gameMat[i][j-2];
            gameMat[i][j-2]=gameMat[i][j-3];
            gameMat[i][j-3]=0;
        }
        if(gameMat[i][j-1]==gameMat[i][j-2])
        {
            gameMat[i][j-1]*=2;
            score+=gameMat[i][j-1]*2;
            gameMat[i][j-2]=gameMat[i][j-3];
            gameMat[i][j-3]=0;
        }
        if(gameMat[i][j-2]==gameMat[i][j-3])
        {
            gameMat[i][j-2]*=2;
            score+=gameMat[i][j-2]*2;
            gameMat[i][j-3]=0;
        }
        
    }
    
setGamemat();
setScore();
setRandomEmpty();       
end2048();
}

function end2048(){
    count=0;
    for (i=0;i<4;i++)
        for(j=0;j<4;j++)
        { if(gameMat[i][j]==2048)
            {   setTimeout(
                alert("You Won ! 2048 Found"),3000);
                if(confirm("Play Again ? "))
                    resetGame();
                
            }
            
         if (gameMat[i][j]!=0)
             count++;
        }
    if(count==16)
    {
        var response=confirm("Game Over ! Try Again");
        if(response)
            resetGame();
    }
    
}

 return{
 initialise : function(){
    score=0;
    bestScore=0; 
    if(window.localStorage.getItem('bestscore')) 
        bestScore=window.localStorage.getItem('bestscore');
     else
         bestScore=0;
     setRandomEmpty();
     setRandomEmpty();
     document.addEventListener('keydown',function(e){
     
        if (e.keyCode==40)
            moveDown();
         else if (e.keyCode==39)
            moveRight();
         else if (e.keyCode==38)
            moveUp();
         else if(e.keyCode==37)
            moveLeft(); 
     });     
    document.getElementById("reset").addEventListener('click',resetGame);
 }   
}
}
var game2048=new game();
game2048.initialise();