var canvas = document.getElementById("Game-Box");
var ctx = canvas.getContext("2d");

 var scoreSound = "score.wav" , stickSound = "pop.mp3" , collisionSound = "sidebar.ogg" , winSound = "win.ogg";
// var  X = 0,Y = 150,YR = 150 , XOfBall = 300,YOfBall = 200, ballDir = 1,ySpeedOfBall=0.5;

// var speedOfStick = 10 ,delayInMilliSecond = 10 , BallVelocity = 1;

// var xSpeedOfBall = Math.sqrt(BallVelocity*BallVelocity + ySpeedOfBall*ySpeedOfBall);

// var rightStick = [150,150+60]  , leftStick = [150,150+60] ;    // sticks end-position on y-axis

// var interval , scoreLeft = 0, scoreRight = 0;


// drawBall(300,200,8,"black");
var ballRadius = 4 ;
var jetSpeed = 0.50 , ballSpeed = 0.2 ;
var widthOfJet = 10 ;
var heightOfJetBody = 15 ;
var heightOfJetTip = 30 ;
var boosterLength = 10 ;
var boosterWidth = 10 ;
var armLength = 5 ;
var numberOfRounds = 5 ;
var densityOfBalls = 2 ;       // maans every cycle 2 cicrle evey 1000 cycle probablity

var defaultJet1 , defaultJet2 , Jet1 , Jet2 , scoreP1 = 0 , scoreP2 = 0 , gameTime = 0.1; // 10 s 
var gameRound = 1 , defaultGameTime = 0.1 , gameTimeLength = 100;

const setJetInitialPosition = () => {
    defaultJet1  = {
        x       : 150 ,
        y       : 500- heightOfJetBody - boosterWidth - 5
    }
    defaultJet2  = {
        x       : 450 ,
        y       : 500- heightOfJetBody - boosterWidth - 5
    }
    Jet1 = {
        x       : 150 ,
        y       : 500 - heightOfJetBody - boosterWidth - 5
    }
     Jet2 = {
        x       : 450 ,
        y       : 500- heightOfJetBody - boosterWidth - 5 
    }
}
setJetInitialPosition();
var ballMap = [] ; // to set position of moving balls , array of objects
var map = {}; // map used for button clicked or not

const resetGame = () =>{

    map = {};
    ballMap = [] ;
    jetSpeed = 0.50 ;
    scoreP1 = 0 ;
    scoreP2 = 0 ;
    gameTime = 0.1;
    gameRound = 1 ;
    defaultGameTime = 100 ;
    Jet1.x = defaultJet1.x ;
    Jet1.y = defaultJet1.y ;
    Jet2.x = defaultJet2.x ;
    Jet2.y = defaultJet2.y ;
    return ;
}

const customizeGame = (field , value) => {

    
    if(field == 'tip')
    {
        heightOfJetTip = (value) ;
        setJetInitialPosition();
    }
    else if(field == 'arm')
    {
        armLength = value/3
    }
    else if(field == 'bodyLength' )
    {
        heightOfJetBody = 1.5*value ;
        setJetInitialPosition(); 
    }
    else if(field == 'bodyWidth' )
    {
        widthOfJet = value/2;
    }
    else if(field == 'boosterLength' )
    {
        boosterLength = value/2 ;
        setJetInitialPosition();
    }
    else if(field == 'boosterWidth' )
    {
        boosterWidth = value/2 ;
        setJetInitialPosition();
    }
    else if(field == 'ballSpeed' )
    {
        
        
        ballSpeed = value/100
    }
    else if(field == 'ballRadius' )
    {
        ballRadius = 1.5*value/10 ;
    }
    else if(field == 'rocketSpeed' )
    {
        jetSpeed = 1.5*(value/80)
    }
    else if(field == 'gameTime' )
    {
        gameTime = value/100 + 0.01;
    }
    else if(field == 'difficulty' )
    {
        densityOfBalls = value/10 ;
    }
    else if(field == 'rounds' )
    {
        console.log(value)
        numberOfRounds =  parseInt(value/10) == 0 ? 1 : parseInt(value/10) ;
        overlayOn(numberOfRounds + ' Round Game')
        setTimeout(() => {
            overlayOff();
        }, 500);
    }
    else{}
    

    
    displayCanvas();
    

}



document.onkeydown = document.onkeyup =  (e) => {
    //  console.log(e.keyCode + ': key is '+ e.type , map)
    if (e.keyCode === 87 || e.keyCode === 83 || e.keyCode === 40 || e.keyCode === 38  )
    {
        e = e || event; // to deal with IE
        map[e.keyCode] = e.type == 'keydown';
        /* insert conditional here */
    }
}

function overlayOn(message) {
    document.getElementById("overlay").style.display = "block";
    document.getElementById("overlay").innerHTML = message
  }
  
  function overlayOff() {
    document.getElementById("overlay").style.display = "none";
  }




const setJetPosition = (heightOfJetTip) => {

    
    if(map[87]==true && Jet1.y + heightOfJetTip > 0 )
    {
        Jet1.y = Jet1.y - jetSpeed
    }
    if(map[87]==true && Jet1.y + heightOfJetTip <= 0 )
    {
        Jet1.y = 500-30 ;
        scoreP1++;
        play(scoreSound);
    }
    if(map[83]==true && Jet1.y <= 500- heightOfJetBody - boosterWidth - 5)
    {
        Jet1.y = Jet1.y + jetSpeed
    }
    if(map[40]==true && Jet2.y < 500- heightOfJetBody - boosterWidth - 5)
    {
        Jet2.y = Jet2.y + jetSpeed
    }
    if(map[38]==true && Jet2.y + heightOfJetTip > 0 )
    {
        Jet2.y = Jet2.y - jetSpeed
    }
    if(map[38]==true && Jet2.y + heightOfJetTip <= 0)
    {
        Jet2.y = 500- heightOfJetBody - boosterWidth - 5 ;
        scoreP2++;
        play(scoreSound);
    }

}
const runTimer = () => {
    gameTimeLength += gameTime
    ctx.moveTo(300 , 500 );
    ctx.lineTo(300 ,  gameTimeLength);

    if(gameTimeLength>=500)
    {
        //alert('game-over');
        gameRound++ ;
        if(gameRound>numberOfRounds)
        {
            clearInterval(gameBoardInterval)



            if(scoreP1>scoreP2)
            {
                overlayOn('Player 1 Win')
                play(winSound)
                
            }
            else if(scoreP1>scoreP2)
            {
                overlayOn('Player 2 Win')
                play(winSound);
                
            }
            else {};
             overlayOn('Game Draw')

             setTimeout(()=>{
                overlayOff();
                // displayCanvas();
                // resetGame();
            },400)
            
            
            
        }
        else
        {
            Jet1.y = defaultJet1.y ;
            Jet2.y = defaultJet2.y ;
            // clearInterval(gameBoardInterval);
            gameTimeLength  = 100 ;
            gameTime += 0.05
            overlayOn('Round ' + gameRound)
            setTimeout(()=>{
                overlayOff();
            } , 200)
        }

        
    }
}


const displayJet = (Pos) => {



    // Setting up the Jet1 ,Jet2 Coordinates
    setJetPosition(heightOfJetTip);

    ctx.beginPath();

    // Draw Body => | | of the Jet 
    ctx.moveTo(Pos.x , Pos.y);
    ctx.lineTo(Pos.x  , Pos.y + heightOfJetBody);
    ctx.moveTo(Pos.x + widthOfJet , Pos.y);
    ctx.lineTo(Pos.x + widthOfJet , Pos.y + heightOfJetBody);

    // Draw Arms of Jet => -||-
    ctx.moveTo(Pos.x - armLength , Pos.y);
    ctx.lineTo(Pos.x , Pos.y );
    ctx.moveTo(Pos.x + widthOfJet , Pos.y);
    ctx.lineTo(Pos.x + widthOfJet + armLength , Pos.y );

    // Draw Tip of Jet => /\
    ctx.moveTo(Pos.x - armLength , Pos.y);
    ctx.lineTo(Pos.x + widthOfJet/2 , Pos.y - heightOfJetTip);
    ctx.moveTo(Pos.x + widthOfJet/2 , Pos.y - heightOfJetTip);
    ctx.lineTo(Pos.x + widthOfJet + armLength , Pos.y);

    // Draw Jet Boosters => /  \
    ctx.moveTo(Pos.x - boosterLength , Pos.y + heightOfJetBody + boosterWidth );
    ctx.lineTo(Pos.x  , Pos.y + heightOfJetBody);
    ctx.moveTo(Pos.x + widthOfJet  , Pos.y + heightOfJetBody  );
    ctx.lineTo(Pos.x + widthOfJet + boosterLength , Pos.y + heightOfJetBody + boosterWidth);

    // Draw Jet Bottom Line => _
    ctx.moveTo(Pos.x - boosterLength , Pos.y + heightOfJetBody + boosterWidth );
    ctx.lineTo(Pos.x + widthOfJet + boosterLength , Pos.y + heightOfJetBody + boosterWidth);


    // Draw Fule Fired By Jet => ! !
    ctx.fillStyle = "white";
    ctx.fillRect(Pos.x - boosterLength/2 , Pos.y + heightOfJetBody + boosterWidth , 2 , 5);
    ctx.fillRect(Pos.x + widthOfJet + boosterLength/2 - 2 , Pos.y + heightOfJetBody + boosterWidth , 2 , 5);


    ctx.lineWidth = 1;

    // set line color
    ctx.strokeStyle = 'white';
    ctx.stroke();

}


const displayBalls = () => {

    const ch = Math.floor(Math.random() * 1000);
    if(ch>1000 - densityOfBalls - 2*gameRound)
    {
        let direction = Math.floor(Math.random() * 2) == 1 ? 'left' : 'right' ;
        let coordinates = {
            x : direction == 'right' ? 0 : 600 ,
            y : Math.floor(Math.random() * (defaultJet1.y - heightOfJetTip - ballRadius - 11)) + 10 ,
            direction : direction 
        }
        ballMap.push(coordinates) ;

    }

    for(let i=0; i<ballMap.length ; i++)
    {
    
        let x = ballMap[i].x ;
        let y = ballMap[i].y ;
        ctx.beginPath();

             ctx.arc(x, y, ballRadius, 0, 2 * Math.PI);
            // ctx.fillRect(x , y  , 8 , 8);
            
            // ctx.arc(150, 310, 3, 0, 2 * Math.PI);
            
            ctx.fillStyle = 'while'
            ctx.fill();
        
        ctx.stroke();
        if(ballMap[i].direction == 'right')
        {
            ballMap[i].x += ballSpeed ;
        }
        else
        {
            ballMap[i].x -= ballSpeed;
        }
        if(x>600||x<0)
        {
            ballMap.splice(i, 1);
        }

    }

}

const isMinDistance = (m,c,xBall , yBall) => {

    let d = Math.abs(yBall - m*(xBall) - c)/Math.sqrt( 1 + m*m ) ;
    
    //  console.log( 'm = ' , m , 'c = ' , c,'dis = ' , d , 'xball = ' , xBall , 'yball = ' , yBall);
    if(d<=ballRadius)
    {
        
        return true ;
    }
    return false;
}

const checkBodyCollision = (xBall , yBall , Jet) =>{

    // check if collision happen at body => | | 
    if(yBall - ballRadius > Jet.y && yBall + ballRadius < Jet.y + heightOfJetBody)
    {
         console.log('body')
        if(Math.abs(xBall-Jet.x)<=4||Math.abs(xBall-(Jet.x + widthOfJet ))<=4)
        {
            
            return true ;
        }
        return ;
    }

    
    //Check for the collision of each line
    let  m , c ;
    
        if(yBall-ballRadius<=Jet.y&&yBall+ballRadius>=Jet.y-heightOfJetTip)
        {
            console.log('up/n')
            //checking upper slant line ( / ) collision y=mx + c
            m = -1*( heightOfJetTip/(armLength + widthOfJet/2 ) );
            //c = y - mx 
            c = Jet.y  - m*(Jet.x-armLength) ;

            // check min distance should be greater than 4
            if(isMinDistance(m,c,xBall,yBall))
            {
                return true ;
            }

            //checking upper slant line ( \ ) collision y=mx + c
            
            m = 1*( heightOfJetTip/(armLength + widthOfJet/2 ) );
            //c = y - mx 
            c = Jet.y   - m*(Jet.x + armLength + widthOfJet) ;
        
            // check min distance should be greater than 4
            if(isMinDistance(m,c,xBall,yBall))
            {
                return true ;
            }
            return false ;
        }
        //checking bottom slant line ( / ) collision y=mx + c

        console.log('down/n')
        m = -1*( boosterWidth/boosterLength );
        // console.log(m);
        //c = y - mx 
        c = Jet.y + heightOfJetBody - m*(Jet.x  ) ;
    
        // check min distance should be greater than 4
        if(isMinDistance(m,c,xBall,yBall))
        {
            return true ;
        }

        //checking bottom slant line ( \ ) collision y=mx + c

        m = 1*( boosterWidth/boosterLength );
        //c = y - mx 
        c = Jet.y + heightOfJetBody - m*(Jet.x + widthOfJet ) ;
    
        // check min distance should be greater than 4
        if(isMinDistance(m,c,xBall,yBall))
        {
            return true ;
        }

        if(yBall - ballRadius >= Jet.y + heightOfJetBody + boosterWidth)
        {
            if(isMinDistance(0 , Jet.y + heightOfJetBody + boosterWidth , xBall , yBall ))
            {
                
                return true ;
            }
        }

        return false ;


}

const checkCollision = () => {


    for(let i=0; i<ballMap.length ; i++)
    {
    
        let x = ballMap[i].x ;
        let y = ballMap[i].y ;
        

        // // check Jet1 collision with wings
        // let leftWing = Math.sqrt(Math.pow(Math.abs(x - Jet1.x),2) + Math.pow(Math.abs(y - Jet1.y),2)) ;
        // let rightWing = Math.sqrt(Math.pow(Math.abs(x - Jet1.x),2) + Math.pow(Math.abs(y - Jet1.y),2)) ;
        
        // if(y < Jet1.y)
        // {}

            // Draw Jet Bottom Line => _
    // ctx.moveTo(Pos.x - boosterLength , Pos.y + heightOfJetBody + boosterWidth );
    // ctx.lineTo(Pos.x + widthOfJet + boosterLength , Pos.y + heightOfJetBody + boosterWidth);

    // 4 corrdinates of the rectangle box (Jet1 inside box)
    let cord1 = {
        x1 : Jet1.x - boosterLength ,
        y1 : Jet1.y - heightOfJetTip ,
        x2 : Jet1 + widthOfJet + boosterLength ,
        y2 : Jet1.y - heightOfJetTip ,
        x3 : Jet1.x - boosterLength ,
        y3 : Jet1.y + heightOfJetBody + boosterWidth ,
        x4 : Jet1.x + widthOfJet + boosterLength ,
        y4 : Jet1.y + heightOfJetBody + boosterWidth ,                
    }
    let cord2 = {
        x1 : Jet2.x - boosterLength ,
        y1 : Jet2.y - heightOfJetTip ,
        x2 : Jet2 + widthOfJet + boosterLength ,
        y2 : Jet2.y - heightOfJetTip ,
        x3 : Jet2.x - boosterLength ,
        y3 : Jet2.y + heightOfJetBody + boosterWidth ,
        x4 : Jet2.x + widthOfJet + boosterLength ,
        y4 : Jet2.y + heightOfJetBody + boosterWidth ,                
    }
    
        if( x + ballRadius >= cord1.x1 && x-ballRadius<= cord1.x4  && y+ballRadius >= cord1.y1 
            && y-ballRadius <= cord1.y4 )
        {
            //Means Ball is nar to Jet1
            if(checkBodyCollision(x,y,Jet1) )
            {
                Jet1.y = defaultJet1.y ;
                Jet1.x = defaultJet1.x ;
                play(collisionSound);
            }

        }
        else if( x + ballRadius >= cord2.x1 && x-ballRadius<= cord2.x4  
                && y+ballRadius >= cord2.y1 && y-ballRadius <= cord2.y4 )
        {
            //Means Ball is nar to Jet2 
            if(checkBodyCollision(x,y ,Jet2))
            {
                Jet2.y = defaultJet2.y ;
                Jet2.x = defaultJet2.x ;
                play(collisionSound);
            }

        }
        else
        {}

     }



}


const displayCanvas = () => {

    ctx.fillStyle = "black";
    ctx.fillRect(0,0,window.innerWidth,window.innerHeight);
    displayJet(Jet1) ;
    displayJet(Jet2) ;

    ctx.beginPath();
        // run Game Timer Line
        runTimer();

        // Draw Score of P1
        ctx.font = "40px Arial";
        ctx.fillText(scoreP1, 20, 490);
    
        // Draw Score of P2
        ctx.font = "40px Arial";
        ctx.fillText(scoreP2, 320, 490);
        ctx.lineWidth = 1;

        

        // set line color
        ctx.strokeStyle = 'white';
    ctx.stroke();
    

    displayBalls();


    checkCollision();

    return ;



}




var gameBoardInterval  ;


const game = (reset) => {

    if(reset)
    {
        clearInterval(gameBoardInterval)
        resetGame();
        overlayOn( numberOfRounds +' Round Game')
        setTimeout(() => {
            overlayOff();
            gameBoardInterval = setInterval(() => {
            
                displayCanvas();
                // console.log(map)
                
            }, 1) ;
            
        }, 1000);
    }
    else
    {                    
        gameBoardInterval = setInterval(() => {
            
            displayCanvas();
            // console.log(map)
            
        }, 1) ;
    }     
    console.log(gameBoardInterval, 'int')
    



}
displayCanvas();
// game();


function play(sound) 
{
  let audio = new Audio(sound);
  audio.play();
  
}

