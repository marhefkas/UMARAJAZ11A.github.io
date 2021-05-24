var canvas = document.getElementById("Game-Box");
var ctx = canvas.getContext("2d");

var scoreSound = "score.wav" , stickSound = "pop.mp3" , sidebarSound = "sidebar.ogg" , winSound = "win.ogg";
var  X = 0,Y = 150,YR = 150 , XOfBall = 300,YOfBall = 200, ballDir = 1,ySpeedOfBall=0.5;

var speedOfStick = 10 ,delayInMilliSecond = 10 , BallVelocity = 1;

var xSpeedOfBall = Math.sqrt(BallVelocity*BallVelocity + ySpeedOfBall*ySpeedOfBall);

var rightStick = [150,150+60]  , leftStick = [150,150+60] ;    // sticks end-position on y-axis

var interval , scoreLeft = 0, scoreRight = 0;


drawBall(300,200,8,"black");

ctx.fillStyle = "black";

ctx.fillRect(0,150,8,60);            // Draw Stick

ctx.fillRect(600-8,150,8,60);        // Draw Stick


document.addEventListener('keydown', e => {
    if (e.keyCode === 87)         // up arrow key for Right stick up
    {       if(Y>0)      {       Y = moveStick(Y,0,0,speedOfStick,0);
                            leftStick[0] = Y; leftStick[1]=Y+60;}       }


    else if(e.keyCode === 83)     // down arrow key for Right stick down
    {       if(Y<400-60) {       Y = moveStick(Y,0,400,-1*speedOfStick,1);
                            leftStick[0] = Y; leftStick[1]=Y+60;    }       }


    else if(e.keyCode === 40)       // s is pressed for Left stick down
    {       if(YR<400-60){       YR = moveStick(YR,600-8,400,-1*speedOfStick,1);
                            rightStick[0] = YR; rightStick[1]=YR+60;}       }


    else if(e.keyCode === 38)       // w is pressed for Left stick up
    {       if(YR>0)     {       YR = moveStick(YR,600-8,0,speedOfStick,0);
                            rightStick[0] = YR; rightStick[1]=YR+60;}     }


    else{}

});


function Start()
{
    if(interval!=null)
    clearInterval(interval);

   // console.log("sdfg");
    drawBall(XOfBall,YOfBall,9,"white");  // remove old ball

    ctx.fillStyle = "white";

    ctx.fillRect(0,0,8,400);            // remove old Stick

    ctx.fillRect(600-8,0,8,400);        // remove old Stick


    X = 0,Y = 150,YR = 150 , XOfBall = 300,YOfBall = 200, ballDir = 1,ySpeedOfBall=0.5;

    speedOfStick = 10 ,delayInMilliSecond = 10 , BallVelocity = 1;
    
    xSpeedOfBall = Math.sqrt(BallVelocity*BallVelocity + ySpeedOfBall*ySpeedOfBall);
    
    rightStick = [150,150+60]  , leftStick = [150,150+60] ;    // sticks end-position on y-axis
    
    scoreLeft = 0, scoreRight = 0;

    document.getElementById("Left-Player").innerHTML = scoreLeft ;

    document.getElementById("Right-Player").innerHTML = scoreRight ;


    drawBall(XOfBall,YOfBall,8,"black");

    ctx.fillStyle = "black";

    ctx.fillRect(0,150,8,60);            // Draw Stick

    ctx.fillRect(600-8,150,8,60);        // Draw Stick


    moveBall();
}

function changeSpeed(val)
{
    if(val==1)
    {
        if(BallVelocity>4.5)
        return ;
        BallVelocity+=0.5;
    }
    else
    {
        if(BallVelocity<1)
        return;
        BallVelocity-=0.5;
    }
    ySpeedOfBall = BallVelocity*Math.sin(Math.atan(ySpeedOfBall/xSpeedOfBall));
    xSpeedOfBall = Math.sqrt(BallVelocity*BallVelocity - ySpeedOfBall*ySpeedOfBall);
    document.getElementById("span").innerHTML = BallVelocity + "x";
    
}
function moveStick(YPosOfStick,XPosOfStick,Overflow,SpeedOfStick,chk)
{
    let a=YPosOfStick,b=YPosOfStick;
    ctx.fillStyle = "white";
    a+=SpeedOfStick;
    //ctx.fillStyle = "black";

    ctx.fillRect(XPosOfStick,a,8,60);
    b+=-SpeedOfStick;
    ctx.fillStyle = "black";
    ctx.fillRect(XPosOfStick,b,8,60);
    if(chk==0)
    {
        if(b>=Overflow)
        YPosOfStick = b;
        else
        YPosOfStick = Overflow;
    }
    else
    {
        if(b<=Overflow)
        YPosOfStick = b;
        else
        YPosOfStick = Overflow;
    }

    return YPosOfStick;
}


function drawBall(x,y,rad,color)
{
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x,y,rad,0,Math.PI*2,false);
    ctx.closePath();
    ctx.fill();
}

function moveBall()
{
    interval = setInterval(function(){

        ctx.fillStyle = "black";
        ctx.fillRect(600-8,rightStick[0],8,60); 
        ctx.fillRect(0,leftStick[0],8,60); 
        if(ballDir == 1)
        {
            if(XOfBall<600-8)
            {
                if(XOfBall+8>=600-10&&(rightStick[0]-8<=YOfBall&&rightStick[1]+8>=YOfBall))
                {
                    play(stickSound);
                    ySpeedOfBall = Math.random()*BallVelocity;
                    xSpeedOfBall = Math.sqrt(BallVelocity*BallVelocity - ySpeedOfBall*ySpeedOfBall);
                    ballDir = -1 ;
                }
                drawBall(XOfBall,YOfBall,9,"white");
                XOfBall+=xSpeedOfBall;
                YOfBall+=ySpeedOfBall;
                if(YOfBall>400-8||YOfBall<0+8)
                {
                    play(sidebarSound);
                    ySpeedOfBall = -1*ySpeedOfBall;
                    if(YOfBall<8)
                    document.getElementById("Game-Box").style.borderTopColor = "green";
                    else
                    document.getElementById("Game-Box").style.borderBottomColor = "green";
                     setTimeout(function() {
                         document.getElementById("Game-Box").style.borderTopColor = "yellow";
                         document.getElementById("Game-Box").style.borderBottomColor = "yellow";
                     },200);
                }
                drawBall(XOfBall,YOfBall,8,"black");


            }
            else
            {

                    scoreLeft++;
                    document.getElementById("Left-Player").innerHTML = scoreLeft;
                    if(scoreLeft==7)
                    {
                        play(winSound);
                        overlayOn();
                        document.getElementById("overlay").innerHTML = "Left Won";
                        clearInterval(interval);
                        return ;

                    }
                    else
                    {
                        drawBall(XOfBall,YOfBall,9,"white");
                        XOfBall = 300;
                        YOfBall = 200;
                        drawBall(XOfBall,YOfBall,8,"black");
                    }
                    play(scoreSound);


                    document.getElementById("Left-Player").style.backgroundColor = "lightblue";
                    document.getElementById("Game-Box").style.borderRightColor = "red";

                    setTimeout(function() {
                        document.getElementById("Game-Box").style.borderRightColor = "blue";
                        document.getElementById("Left-Player").style.backgroundColor = "white";
                    },400);

                 ballDir = -1 ;
            }
        }
        else
        {
            if(XOfBall>8)
            {
                if(XOfBall-8<=9&&(leftStick[0]-8<=YOfBall&&leftStick[1]+8>=YOfBall))
                {
                    play(stickSound);
                    ySpeedOfBall = Math.random()*BallVelocity;
                    xSpeedOfBall = Math.sqrt(BallVelocity*BallVelocity - ySpeedOfBall*ySpeedOfBall);
                    ballDir = 1 ;
                }
                else
                {
                    drawBall(XOfBall,YOfBall,9,"white");
                    ctx.fillStyle = "black";
                    ctx.fillRect(0,leftStick[0],8,60); 

                    XOfBall-=xSpeedOfBall;
                    YOfBall+=ySpeedOfBall;
                    if(YOfBall>400-8||YOfBall<0+8)
                    {
                        play(sidebarSound);
                        ySpeedOfBall = -1*ySpeedOfBall;
                        if(YOfBall<8)
                        document.getElementById("Game-Box").style.borderTopColor = "green";
                        else
                        document.getElementById("Game-Box").style.borderBottomColor = "green";
                        setTimeout(function() {
                            document.getElementById("Game-Box").style.borderTopColor = "yellow";
                            document.getElementById("Game-Box").style.borderBottomColor = "yellow";
                        },200);
                    }
                    drawBall(XOfBall,YOfBall,8,"black");
                }
            }
            else
            {
                    scoreRight++;
                    document.getElementById("Right-Player").innerHTML = scoreRight;
                    if(scoreRight==7)
                    {
                        play(winSound);
                        overlayOn();
                        document.getElementById("overlay").innerHTML = "Right Won";
                        clearInterval(interval);
                        return ;

                    }
                    else
                    {
                        drawBall(XOfBall,YOfBall,9,"white");
                        XOfBall = 300;
                        YOfBall = 200;
                        drawBall(XOfBall,YOfBall,8,"black");
                    }
                    play(scoreSound);

                    document.getElementById("Right-Player").style.backgroundColor = "lightblue";
                    document.getElementById("Game-Box").style.borderLeftColor = "red";

                    setTimeout(function() {
                        document.getElementById("Game-Box").style.borderLeftColor = "blue";
                        document.getElementById("Right-Player").style.backgroundColor = "white";
                        
                    },400);
                    
                ballDir = 1 ;
            }

        }


    },delayInMilliSecond);
}


function overlayOn() {
    document.getElementById("overlay").style.display = "block";
  }
  
  function overlayOff() {
    document.getElementById("overlay").style.display = "none";
  }


 
function play(sound) 
{
  let audio = new Audio(sound);
  audio.play();
  
}

// http://codeskulptor-demos.commondatastorage.googleapis.com/GalaxyInvaders/pause.wav