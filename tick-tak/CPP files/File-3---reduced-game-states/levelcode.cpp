#include <bits/stdc++.h>
#include<iostream>
#include<vector>
#include<math.h>
#include<fstream>
using namespace std;
fstream fin,fin1;
int diagwin(vector<int> arr)
{
	int x=0,y=0,x1=0,y1=0;
	if(arr[0]==arr[4]&&arr[4]==arr[8]&&arr[0]!=0&&arr[4]!=0&&arr[8]!=0)
	{
		if(arr[0]==1)
		x=1;
		else 
		y=2;
	}
	if(arr[2]==arr[4]&&arr[4]==arr[6]&&arr[2]!=0&&arr[4]!=0&&arr[6]!=0)
	{
		if(arr[2]==1)
		x1=1;
		else 
		y1=2;
	}
	if(x==1&&x1==1)
	return -1;
	else if(y==2&&y1==2)
	return -1;
	else if(x==1||x1==1)
	return 1;
	else if(y==2||y1==2)
	return 2;
	else 
	return 3;
}
int columnwin(vector<int> arr)
{
	int x=0,y=0;
	for(int i=0;i<3;i++)
	{
		if(arr[i]==arr[i+3]&&arr[i+3]==arr[i+6]&&arr[i]!=0&&arr[i+3]!=0&&arr[i+6]!=0)
		{
			if(arr[i]==1)
			 x=1;
			else 
			y=2;
		}
	}
   	if(x==1&&y==2)
	return -1;
	else if(x==1)
	return x;
	else if(y==2)
	return y;
	else
	return 3;
}
int rowwin(vector<int> arr)
{
	int x=0,y=0;
	for(int i=0;i<7;i=i+3)
	{
		if(arr[i]==arr[i+1]&&arr[i+1]==arr[i+2]&&arr[i]!=0&&arr[i+1]!=0&&arr[i+2]!=0)
		{
			if(arr[i]==1)
			x=1;
			else 
			y=2;
    	}
	}
	if(x==1&&y==2)
	return -1;
	else if(x==1)
	return x;
	else if(y==2)
	return y;
	else
	return 3;
}	
int win(vector<int> arr)
{
	int r=rowwin(arr);
	if(r==-1)
	return r;
	int c=columnwin(arr);
	if(c==-1)
	return c;
	int d=diagwin(arr);
		if(d==-1)
		return -1;
		else if(r==1&&c==1)
		return -1;
    	else if(r==2&&c==2)
		return -1;
		else if(r==1&&d==1)
		return -1;
		else if(r==2&&d==2)
		return -1;			
		else if(c==1&&d==1)
		return -1;
		else if(c==2&&d==2)
		return -1;			
		else if(r==1||r==2)
		return r;
		else if(c==1||c==2)
		return c;
   		 else if(d==1||d==2)
		return d;
		else
		return 3;	
}
int check(vector<int> arr,int y)
{
	if(y==1)
	{
		int ctx=0,cto=0;
		for(int i=0;i<9;i++)
		{
			if(arr[i]==1)
			ctx++;
			else if(arr[i]==2)
			cto++;
		}
		if(ctx>cto)
		return 1;
		else 
		return 0;
	}
	else
	{
		int ctx=0,cto=0;
		for(int i=0;i<9;i++)
		{
			if(arr[i]==1)
			ctx++;
			else if(arr[i]==2)
			cto++;
		}
		if(ctx==cto)
		return 1;
		else 
		return 0;
	}
}
int main()
{
	
	int y;
	::fin.open("ALL-GAME-STATES",ios::out|ios::in|ios::app);
    ::fin1.open("NEW",ios::out|ios::in|ios::trunc);
	::fin.seekg(0); 
	int drr[849][11],pos=0,val;
	while(!::fin.eof())
	{
		for(int i=0;i<11;i++)
		{
			if(::fin.eof())
			break;
			::fin>>val;
			drr[pos][i]=val;
		}
    	if(::fin.eof())
		break;
		pos++;
		
	}
	int lev=5;
	int flag1=1,flag2=0;
    for(int i=0;i<849;i++)
    {
    	vector<int> arr;
    	
    	for(int j=0;j<11;j++)
    	{
    		arr.push_back(drr[i][j]);
		}
		if(i<162)
		{
			arr[10]=0;
			for(int j=0;j<11;j++)
			::fin1<<arr[j]<<" ";
			::fin1<<"\n";
		}
		else
		{
		
		
			int y=win(arr);
			if(y!=-1)
			{
					if(arr[9]==5)
					{
						if(y==1||y==3)
						{
							if(y==3)
							y=0;
							arr[10]=y;
							for(int j=0;j<11;j++)
							::fin1<<arr[j]<<" ";
							::fin1<<"\n";
						}
					}
				    else if(arr[9]==6)
					{
						if(y==2||y==3)
						{
							if(y==3)
							arr[10]=0;
							else
							arr[10]=-1;
							for(int j=0;j<11;j++)
							::fin1<<arr[j]<<" ";
							::fin1<<"\n";
						}
					}
					else if(arr[9]==7)
					{
						if(y==1||y==3)
						{
							if(y==3)
							y=0;
							arr[10]=y;
							for(int j=0;j<11;j++)
							::fin1<<arr[j]<<" ";
							::fin1<<"\n";
						}
					}
					else if(arr[9]==8)
					{
						if(y==2||y==3)
						{
							if(y==3)
							arr[10]=0;
							else
							arr[10]=-1;							
							for(int j=0;j<11;j++)
							::fin1<<arr[j]<<" ";
							::fin1<<"\n";
						}
					}
					else if(arr[9]==9)
					{
						if(y==3||y==1)
						{
							if(y==3)
							y=0;
							arr[10]=y;
							for(int j=0;j<11;j++)
							::fin1<<arr[j]<<" ";
							::fin1<<"\n";
						}
					}
					else
					{
									
					}				
			}
		}
	}
	return 0;
}
