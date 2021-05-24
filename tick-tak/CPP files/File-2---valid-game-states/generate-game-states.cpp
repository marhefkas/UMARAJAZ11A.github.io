#include <bits/stdc++.h>
#include<iostream>
#include<vector>
#include<math.h>
#include<fstream>
using namespace std;
fstream fin,fin1;
int checkdell(vector<int> arr,vector<int> brr)
{
//	cout<<"tt";
	for(int i=0;i<9;i++)
	{
		if(arr[i]!=brr[i])
		{
			return 1;
		}
	}
	return 0;
}
int checkrot(vector<int> arr,vector<int> brr)
{
//	cout<<"k";
	//cout<<brr[2];
		int i=0,ind=0,y;
		for(int k=0;k<3;k++)
		{
			vector<int> crr;
			i=0;
			ind=0;
			while(i<3)
			{
				for(int j=i+6;j>=i;j=j-3)
				{
					crr.push_back(brr[j]);
				//	cout<<crr[ind-1]<<" ";
				}
				i++;
				
			}
			for(int j=0;j<9;j++)
			{
			//	cout<<crr[j]<<" ";
				brr[j]=crr[j];
			}
		//	cout<<"\n";
			y=checkdell(arr,brr);
			if(y==0)
			return y;
		}
		return 1;
}
int check(vector<int> arr,vector<int> brr)
{
	int y;
	//cout<<"y";
	y=checkdell(arr,brr);
	if(y==0)
	return y;
	else
	{  //cout<<"er";
         y=checkrot(arr,brr);
         if(y==0)
         return y;
         {
         	int temp;
         	for(int i=0;i<7;i=i+3)
       	 	{
       		  	temp=brr[i];
        	 	brr[i]=brr[i+2];
         		brr[i+2]=temp;
       		}
          	
		 }
         y=checkdell(arr,brr);
         if(y==0)
         return y;
         y=checkrot(arr,brr);
         if(y==0)
         return y;
		
	}
	return 1;
	
}
int main()
{
	vector<int> arr;
	int val,y,count=0,pos=0;
	::fin.open("permutation",ios::out|ios::in|ios::app);
    ::fin1.open("ALL-GAME-STATES",ios::out|ios::in|ios::trunc);
	::fin.seekg(0); 
	int drr[6045][11];
			while(!::fin.eof())
		{
	    	for(int i=0;i<11;i++)
  				{
  					if(::fin.eof())
  					break;
   				 	::fin>>val;
   				 	drr[pos][i]=val;
   				 	
				}
				pos++;
    			if(::fin.eof())
  				break;
		} 
		int i=0;
    for(int s=1;s<10;s++)
	{
		while(drr[i][9]==s)
		{
			
			vector<int> arr;
			for(int j=0;j<11;j++)
			{
				arr.push_back(drr[i][j]);
			}
			int j=i+1;
			while(drr[j][9]==s)
			{
				
				vector<int> brr;
				int y,k;
				for( k=0;k<11;k++)
				{
					brr.push_back(drr[j][k]);	
				}
				y=check(arr,brr);
				if(y==0)
				{
					k--;
					drr[j][k]=-1;
				}
				j++;
			}
			i++;
		}
		i--;
        i++;
	}
		for(i=0;i<6045;i++)
		{
			if(drr[i][10]!=-1)
			{
				for(int j=0;j<11;j++)
				{
					::fin1<<drr[i][j]<<" ";
				}
				::fin1<<"\n";
			}
		}
	return 0;
}
