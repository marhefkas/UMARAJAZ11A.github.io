var drr;
$.get("data.txt", function(data) {
      drr = data.split("\r\n").map(function(el){ return el.split(" ");});
      arr=[];
      arr=JSON.parse(JSON.stringify(drr[0]));
  });

    var arr=[];
    var val="X";
    var minflag=-1;
    var maxflag=1;
    var valpc="O";
    var indx=-1;
    var level=6;
    var put1=1;
    var put2=2;
 
        function printR()
        {
            var i;
            for(i=1;i<10;i++)
            {
                if(arr[i-1]==1)
                    {
                        document.getElementById(i).innerHTML="X";
                        document.getElementById(i).disabled=true;
            
                    }
                else if(arr[i-1]==2)
                    {
                        document.getElementById(i).innerHTML="O";
                        document.getElementById(i).disabled=true; 
                    }
                else
                    {
                        document.getElementById(i).innerHTML=" ";
                        document.getElementById(i).disabled=false;
                    }
                }   
        };
 
    function checkwin()
        {
            var i=0;
            var pl;
            for(i=1;i<8;i=i+3)
                    if(arr[i-1]==arr[i]&&arr[i]==arr[i+1]&&arr[i]!=0)
                        pl=arr[i]; 
            for(i=1;i<4;i=i+1)
                    if(arr[i-1]==arr[i+2]&&arr[i+2]==arr[i+5]&&arr[i+2]!=0)
                        pl=arr[i-1];
            if(arr[0]==arr[4]&&arr[4]==arr[8]&&arr[0]!=0)
                    pl=arr[0];
            if(arr[2]==arr[4]&&arr[4]==arr[6]&&arr[2]!=0)
                    pl=arr[2];
            if(arr[9]==9)
                    pl=-1;
            if(pl==1||pl==2||pl==-1)
            {
                document.getElementById("overlay").innerHTML;
                document.getElementById("overlay").style.display="block";
                if(pl==1)
                document.getElementById("text").innerHTML="X WIN'S!";
                else if(pl==2)
                document.getElementById("text").innerHTML="O WIN'S!";
                else
                document.getElementById("text").innerHTML="GAME DRAW!";
                return 1;
            }
            return ;        
        };
    function hint()
        {
            if(val=="X")
                {
                    var x=level;
                    level=9;
                    if(put1==1)
                        minmax(arr,maxflag,-10,10);   
                    else
                        minmax(arr,minflag,-10,10);  
                    var krr=JSON.parse(JSON.stringify(drr[parseInt(arr[indx],10)]));
                    var brr=match(krr,8);
                    var i;
                    level=x;
                    for(i=0;i<9;i++)
                        {
                           if(arr[i]!=brr[i])
                                {
                                    break;
                                }
                        }
                    i++;
                    if(put1==1)
                   document.getElementById(i).innerHTML="X";
                   else
                   document.getElementById(i).innerHTML="O";
                        delay(i);
                }
            else
                {
                    var x=level;
                    level=9;
                    if(put2==1)
                        minmax(arr,maxflag,-10,10);  
                    else
                        minmax(arr,minflag,-10,10); 
                    var krr=JSON.parse(JSON.stringify(drr[parseInt(arr[indx],10)]));
                    var brr=match(krr,8);
                    var i;
                    level=x;
                    for(i=0;i<9;i++)
                        {
                            if(arr[i]!=brr[i])
                                {
                                    break;
                                }
                        }
                    i++;
                    if(put2==1)
                    document.getElementById(i).innerHTML="X";
                    else
                    document.getElementById(i).innerHTML="O";
                    delay(i);
                }
        };
function delay(i)
{
    setTimeout(function(){
        document.getElementById(i).innerHTML=" ";},200);
};
function clickedINDEX(clicked_id)
    {
        if(valpc=="O")
            {
                if(put1==1&&level==-10)
                    document.getElementById("turn").innerHTML = "turn="+"O";
                if(put1==2&&level==-10)
                    document.getElementById("turn").innerHTML = "turn="+"X";
                var indxclk=parseInt(clicked_id,10);
                indxclk--;
                arr[indxclk]=put1;
                arr=search();
                printR();
                var z= checkwin();
                if(z==1)
                    return;
                if(level>0)
                    {
                        minmax(arr,minflag,-10,10); 
                        var krr=JSON.parse(JSON.stringify(drr[parseInt(arr[indx],10)]));
                        arr=match(krr,8);
                    }
                else
                    {
                        if(put1==1)
                            {
                                put1=2;
                            }
                        else
                            {
                                put1=1;
                            }
                    }  
                printR();
                var z= checkwin();
                if(z==1)
                return;
     
            }
        else
            {
                var indxclk=parseInt(clicked_id,10);
                indxclk--;
                arr[indxclk]=put2;
                document.getElementById(clicked_id).innerHTML=val;
                arr=search();
                var z= checkwin();
                if(z==1)
                return;
                if(level>0)
                    {
                        minmax(arr,maxflag,-10,10); 
                        var krr=JSON.parse(JSON.stringify(drr[parseInt(arr[indx],10)]));
                        arr=match(krr,8);
                    }
                else
                    {
                        if(put2==2)
                            {
                                put2=1;
                            }
                        else
                            {
                                put2=2;
                            }  
                    }
                printR();
                var z= checkwin();
                if(z==1)
                return;         
            }
    };

    function startGame()
        {
            var i;
            for(i=1;i<10;i++)
                {      
                    document.getElementById(i).disabled=false;
                    document.getElementById(i).remove.innerHTML;
                    document.getElementById(i).innerHTML=" ";
                }
            arr=[];
            arr=JSON.parse(JSON.stringify(drr[0]));
            val="X"; 
            valpc="O";
            if(level==-10)
            document.getElementById("turn").innerHTML = "turn="+"X";
        };
        
    function player(clicked_id)
        {
            if(clicked_id=="O")
                {
                    val="O";
                    valpc="X";
                    if(level>0)
                        {   
                            var x=Math.floor(Math.random() * (+9 - +0) + +0);
                            arr[x]=1;
                            arr=search();
                        }
                    printR();
                }
            else
                {
                    val="X"; 
                    valpc="O";  
                }
        };


 function match(brr,count)
 {
     var c=0;
     var i;
       for(i=0;i<4;i++)                                        
           {
                 c=0;
                 var j;
                for(j=0;j<9;j++)                          
                    {
                        if(arr[j]==brr[j])
                        c++;                                
                    }
                if(c==count)                                    
                    {
                        return brr;                            
                    }
                else
                brr=rot(brr);	                                
            }
        var temp;
        for(i=0;i<7;i=i+3)                                 
            {
               temp=brr[i];
               brr[i]=brr[i+2];
               brr[i+2]=temp;
            }   
        for(i=0;i<4;i++)                                 
            {
               c=0;
               var j;
                for(j=0;j<9;j++)
                {
                    if(arr[j]==brr[j])
                    c++;
                }
                if(c==count) 
                {
                    return brr;
                }
                else
                    brr=rot(brr);	
           }   		      		
    var crr=[];                                    
    return crr;
 };

 function rot(brr)
 {
     var i=0;                              
     var crr=[];                                  
     while(i<3)
         {
             var j;
             for(j=i+6;j>=i;j=j-3)                 
                 {
                     crr.push(brr[j]);              
                 }
             i++;			
         }
      
     for(i=9;i<brr.length;i++)                     
         crr.push(brr[i]);	
         
     return crr;                                      
 };


 function search()
 {
         var brr=[];
         var i;
         for(i=11;i<arr.length;i++)
            {
                    var krr=JSON.parse(JSON.stringify(drr[parseInt(arr[i],10)]));
                    brr=match(krr,9);
                    if(brr.length!=0)
                    {
                        return brr;
                    }
            }  
 }; 

 
 function minmax(krr,flag,alpha,beta)
 {
         if(krr.length==11||krr[9]>=level)                               
             {
                 if(krr.length>11)
                 indx=11;
                 return krr[10];                          
             }
         else
             {                
                 var i;
                 if(flag==1)
                 {
                     var best=-10;
                     var i,ind;
                    for(i=11;i<krr.length;i++)           
                     {
                         var val;
                         val=(minmax(drr[parseInt(krr[i],10)],-1,alpha,beta));
                         if(val>best)
                         {
                             best=val;
                             ind=i;
                         }
                         if(best>alpha)
                         alpha=best;
                         if(beta<=alpha)
                         {
                             break;
                         }
                     }
                     indx=ind;
                     return best;
                }
                else
                {
                    var best=10;
                    var i,ind;
                   for(i=11;i<krr.length;i++)           
                    {
                        var val;
                        val=(minmax(drr[parseInt(krr[i],10)],1,alpha,beta));
                        if(val<best)
                        {
                            best=val;
                            ind=i;
                        }
                        if(best<beta)
                        beta=best;
                        if(beta<=alpha)
                        {
                            break;
                        }
                    }
                    indx=ind;
                    return best;
                }                          
             }                                            
 };

 function selectDifficulty() 
 {
    selectElement=document.querySelector('#opt');
    var output=selectElement.options[selectElement.selectedIndex].value;
    minflag=-1;
    maxflag=1;
    put1=1;
    put2=2;
    if(output=="nov")
    {
        level=6;
        minflag=1;
        maxflag=-1;
    }
    else if(output=="beg")
        level=5;
    else if(output=="int")
        level=6;
    else if(output=="exp")
        level=7;
    else if(output=="unb")
        level=9;
    else if(output=="two")
    {
        level=-10;
        document.getElementById("turn").innerHTML = "turn="+"X";
    }
    else
    {

    }
  };
function overlayOFF(){
    document.getElementById("overlay").style.display="none";
};