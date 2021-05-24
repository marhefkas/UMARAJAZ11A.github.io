var canvas = document.getElementById("Game-Box");
var ctx = canvas.getContext("2d");

ctx.fillStyle = "red";


var stickYgap = [140,140,140,140,140];
var stickXgap = 400 , speed = 20;
var stickXPos = [ 593 , 593 + stickXgap , 593 + 2*stickXgap , 593 + 3*stickXgap , 593 + 4*stickXgap];
var stickTop = [ Math.floor(Math.random()*(400-stickYgap[0])) , Math.floor(Math.random()*(400-stickYgap[1])) ,
                  Math.floor(Math.random()*(400-stickYgap[2])) , Math.floor(Math.random()*(400-stickYgap[3])),
                  Math.floor(Math.random()*(400-stickYgap[4]))];

var birdX = 50 , birdY = 175;
var stickBottom = [ 400 - stickTop[0] - stickYgap[0] , 400 - stickTop[1] - stickYgap[1] ,
                    400 - stickTop[2] - stickYgap[2] , 400 - stickTop[3] - stickYgap[3] ,
                    400 - stickTop[4] - stickYgap[4]];

var interval , birdDownSpeed = 1 , score = 0;

ctx.fillRect(birdX,birdY,15,20);  


function reStart()
{
    if(interval!=null)
    {
        clearInterval(interval);
    }
    stickYgap = [140,140,140,140,140];
    stickXgap = 400 , speed = 20;
    stickXPos = [ 593 , 593 + stickXgap , 593 + 2*stickXgap , 593 + 3*stickXgap , 593 + 4*stickXgap];
    stickTop = [ Math.floor(Math.random()*(400-stickYgap[0])) , Math.floor(Math.random()*(400-stickYgap[1])) ,
                  Math.floor(Math.random()*(400-stickYgap[2])) , Math.floor(Math.random()*(400-stickYgap[3])),
                  Math.floor(Math.random()*(400-stickYgap[4]))];

    birdX = 50 , birdY = 175;
    stickBottom = [ 400 - stickTop[0] - stickYgap[0] , 400 - stickTop[1] - stickYgap[1] ,
                    400 - stickTop[2] - stickYgap[2] , 400 - stickTop[3] - stickYgap[3] ,
                    400 - stickTop[4] - stickYgap[4]];

    
    birdDownSpeed = 1 , score = 0;

    document.getElementById("score").innerHTML = score;
    ctx.fillStyle = "white";
    ctx.fillRect(0,0,600,400);  
    ctx.fillStyle = "red";
    ctx.fillRect(birdX,birdY,15,20);  
    start();

}
function updateStick(indx)
{

        if(stickYgap[indx]>60)
        stickYgap[indx]-=3;
        if(stickXgap >150)
        stickXgap-=5;
        if(birdDownSpeed<3)
        birdDownSpeed+=0.05;
        if(speed>4)
        {
            clearInterval(interval);
            speed -=1 ;
            start();
        }
    stickTop[indx] = Math.floor(Math.random()*(400-stickYgap[indx]));
    stickBottom[indx] = 400 - stickTop[indx] - stickYgap[indx] ;
}


function start()
{

    interval =  setInterval(function(){


        ctx.fillStyle = "white";
        ctx.fillRect(birdX,0,15,400);  
        for(let i=0;i<5;i++)
        {
            if(stickXPos[i]<=593)
            {
                ctx.fillRect(stickXPos[i],0,10,stickTop[i]);                                // Draw Stick

                ctx.fillRect(stickXPos[i],stickTop[i]+stickYgap[i],10,stickBottom[i]);
            }
            if(stickXPos[i]<0)
            {
                if(i==0)
                stickXPos[i] = stickXPos[4] + stickXgap ;
                else
                stickXPos[i] = stickXPos[i-1] + stickXgap;
                updateStick(i);                                 // and game_speed
            }
        }

        //play('win.ogg');
        moveBird();

        ctx.fillStyle = "green";
        for(let i=0;i<5;i++)
        {
            if(stickXPos[i]<=593)
            {
                if(birdX + 15 >= stickXPos[i]&& birdX <= stickXPos[i])
                {
                    if(birdY<=stickTop[i]||birdY+15>=stickTop[i]+stickYgap[i])
                    {
                        play("win.ogg");
                        clearInterval(interval);
                        //return ;
                    }
                }
                if( birdX -1 == stickXPos[i])
                {
                    score++;
                    document.getElementById("score").innerHTML = score;
                    //difficultyLevel(1);
                }
               // play("win.ogg");
                ctx.fillRect(stickXPos[i],0,8,stickTop[i]);                         // Draw Stick

                ctx.fillRect(stickXPos[i],stickTop[i]+stickYgap[i],8,stickBottom[i]);        // Draw Stick
            }
            stickXPos[i]--;
        }

    },speed);
}

document.addEventListener('keydown', e => {
    if (e.keyCode === 38)         // up key
    {
        play("pop.mp3");
        if(birdDownSpeed>0)
        birdDownSpeed = -1*birdDownSpeed;
    }
    else if(e.keyCode === 40)    // down key
    {
        play("pop.mp3");
        if(birdDownSpeed<=0)
        birdDownSpeed = -1*birdDownSpeed;;

    }
    else
    {

    }

});

function moveBird()
{
    ctx.fillStyle = "red";
    
    birdY+=birdDownSpeed;
    if(birdY+20>=400)
    birdY = 400-20;
    else if(birdY<0)
    {
        birdY = 0 ;
    }
    else
    {

    }
    ctx.fillRect(birdX,birdY,15,20);  
}
    function play(sound) 
    {
      let audio = new Audio(sound);
      audio.play();
      
    }