Grid = new Array(20);
var headPosX = 0,headPosY = 0,tailPosX=0,tailPosY=0,horMove =1,verMove = 0,len = 3,FirstTimeGameLoad = 1;
var tailhorMove = 1,tailverMove = 0;
var delayInMilliseconds =100;  
function makeDivElement()
{
    let x = document.getElementById("Game_box");
    for(let i=0;i<20;i++)
    {
        Grid[i] = new Array(40);
        let y = document.createElement("DIV");
        y.setAttribute("id", "row" + i);
        for(let j=0;j<40;j++)
        {
            Grid[i][j] = 0;
            let z = document.createElement("DIV");
            z.setAttribute("id","row"+ i+"-"+j);

                    {z.style.display = "inline-block";
                    z.style.width = "20px";
                    z.style.height = "20px";
                    z.style.margin = "0px";
                    z.style.padding= "0px";
                    z.style.textAlign = "center";}
            y.appendChild(z);
        }
        y.style.margin = "0px";
        y.style.height = "20px";
        y.style.margin = "0px";
        y.style.padding= "0px";
        y.style.textAlign="center";
        x.appendChild(y);
    }
    headPosX = Math.floor(Math.random() * 14)+3; 
    headPosY = Math.floor(Math.random() * 15)+10;
    tailPosX = headPosX;
    tailPosY = headPosY;
    Grid[headPosX][headPosY] =1;
    Grid[headPosX][++headPosY] =2;
    Grid[headPosX][++headPosY] =3;
} 
function speed(spd)
{
    if(spd==0)
    delayInMilliseconds = 400;
    else if(spd==1)
    delayInMilliseconds = 250;
    else if(spd==2)
    delayInMilliseconds = 100;
    else
    delayInMilliseconds = 50;
}
function reStart()
{
    clearInterval(interval);
    for(let i=0;i<20;i++)
    {
        for(let j = 0;j<40;j++)
        {
            Grid[i][j] = 0;
            displayDot(i,j,"teal");
        }
        //displayDot(i,j,"teal");
    }
    headPosX = 0,headPosY = 0,tailPosX=0,tailPosY=0,horMove =1,verMove = 0,len = 3;

    headPosX = Math.floor(Math.random() * 14)+3; 
    headPosY = Math.floor(Math.random() * 15)+10;
    tailPosX = headPosX;
    tailPosY = headPosY;
    Grid[headPosX][headPosY] =1;
    Grid[headPosX][++headPosY] =2;
    Grid[headPosX][++headPosY] =3;
    
    
        
}
function makeGrid()
{
    if(FirstTimeGameLoad==1)
    {
        makeDivElement();
        FirstTimeGameLoad = 0;
    }
    else
    {
        reStart();
    }
}

function snakeGame()
{
    makeGrid();

    display();

    console.log(Grid);
};


function display()
{  
    for(let i=0;i<20;i++)
    {
        for(let j=0;j<40;j++)
        {
            if(Grid[i][j]>0)
            {
                displayDot(i,j,"red");
            }
        }
    }
    
    setPointPosition();

    gamePlay();
}

function gamePlay()
{
    
     //1 second =1000ms
    interval = setInterval(function() {
        
        document.addEventListener('keydown', e => {
            if(e.keyCode === 37) 
            {
                if(horMove!=1)
                {
                    horMove = -1;
                    verMove = 0;
                }
            } else if (e.keyCode === 38) 
            {
                if(verMove!=1)
                {
                    horMove = 0;
                    verMove = -1;
                }
            }
            else if(e.keyCode === 39)
            {
                if(horMove!=-1)
                {
                    horMove = 1;
                    verMove = 0;
                }
            }
            else if(e.keyCode === 40)
            {
                if(verMove!=-1)
                {
                    horMove = 0;
                    verMove = 1;
                }
            }
            else
            {
    
            }
        });
         displayDot(headPosX,headPosY,"red");
        

        if(len>2){  len--;  }
        else
        {   
            removeTail();
        }

        addHead();
        
        
    }, delayInMilliseconds);
    
    
}

    function displayDot(posI,posJ,color)
    {
        document.getElementById("row" + posI + "-" + posJ).style.backgroundColor = color;
    }


    function callalert()
    {
        displayDot(tailPosX,tailPosY,"teal");
                setTimeout(function(){
                    alert("Game_Over");
                    return ;
                },300)
    }


    function addHead()
    {
        if(horMove==1)
            {
                headPosY++;
                if(headPosY>39||isBodyTouch()==true)
                {
                    callalert();
                    clearInterval(interval);
                    return;
                }
                if(Grid[headPosX][headPosY]==-1)
                {
                    displayDot(headPosX,headPosY,"red");
                    Grid[headPosX][headPosY] = 1+Grid[headPosX][headPosY-1];
                    headPosY++;
                    setPointPosition();
                }
                Grid[headPosX][headPosY] = 1+Grid[headPosX][headPosY-1];
            }
            else if(horMove == -1)
            {
                headPosY--;
                if(headPosY<0||isBodyTouch()==true)
                {
                    callalert();
                    clearInterval(interval);
                    return;
                    
                }
                if(Grid[headPosX][headPosY]==-1)
                {
                    displayDot(headPosX,headPosY,"red");
                    Grid[headPosX][headPosY] = 1+Grid[headPosX][headPosY+1];
                    headPosY--;
                    setPointPosition();
                }
                Grid[headPosX][headPosY] = 1+Grid[headPosX][headPosY+1];
            }
            else if(verMove==1)
            {
                headPosX++;
                if(headPosX>19||isBodyTouch()==true)
                {
                    callalert();
                    clearInterval(interval);
                    return;
                }
                if(Grid[headPosX][headPosY]==-1)
                {
                    displayDot(headPosX,headPosY,"red");
                    Grid[headPosX][headPosY] = 1+Grid[headPosX-1][headPosY];
                    headPosX++;
                    setPointPosition();
                }
                Grid[headPosX][headPosY] = 1+Grid[headPosX-1][headPosY];
            }
            else
            {
                headPosX--;
                if(headPosX<0||isBodyTouch()==true)
                {
                    callalert();
                    clearInterval(interval);
                    return; 
                }
                if(Grid[headPosX][headPosY]==-1)
                {
                    displayDot(headPosX,headPosY,"red");
                    Grid[headPosX][headPosY] = 1+Grid[headPosX+1][headPosY];
                    headPosX--;
                    setPointPosition();
                }
                Grid[headPosX][headPosY] = 1+Grid[headPosX+1][headPosY];
            }
    }



    function removeTail()
    {
        displayDot(tailPosX,tailPosY,"teal");
        
                if((tailPosY<40 )&&(tailPosY>-1)&&Grid[tailPosX][tailPosY+1]==Grid[tailPosX][tailPosY]+1)
                {
                    Grid[tailPosX][tailPosY] = 0;
                    tailPosY++;
                }
                else if((tailPosY>=0 )&&(tailPosY>-1)&&Grid[tailPosX][tailPosY-1]==1+Grid[tailPosX][tailPosY])
                {
                    Grid[tailPosX][tailPosY] = 0;
                    tailPosY--;
                }
                else if(tailPosX<19&&tailPosX>-1&&Grid[tailPosX + 1][tailPosY]==1+Grid[tailPosX][tailPosY])
                {
                    Grid[tailPosX][tailPosY] = 0;
                    tailPosX++;
                }
                else
                {
                    Grid[tailPosX][tailPosY] = 0;
                    tailPosX--;
                }
    }
function setPointPosition()
{   
    var arr = [] ,brr = [];
    for(let i=0;i<20;i++)
    {
        for(let j=0;j<40;j++)
        {
            if(Grid[i][j]==0)
            {
                arr.push(i);
                brr.push(j);
            }
        }
    }
    let pos = Math.floor(Math.random() * arr.length); 
    Grid[arr[pos]][brr[pos]] = -1;
    displayDot(arr[pos],brr[pos],"red");  
}

function isBodyTouch()
{
    if(Grid[headPosX][headPosY]>0)
    return true;
    else
    return false;
}