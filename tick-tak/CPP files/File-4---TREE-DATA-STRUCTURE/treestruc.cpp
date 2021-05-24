#include <bits/stdc++.h>
#include<iostream>
#include<vector>
#include<math.h>
#include<fstream>
using namespace std;
fstream fin,fin1;
int checkrot(vector<int> arr,vector<int> brr)
{
        int count=0;
        for(int i=0;i<9;i++)
        {
        	if(arr[i]==brr[i])
        	count++;
		}
		if(count==8)
		return 1;
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
				}
				i++;
				
			}
			for(int j=0;j<9;j++)
			{
				brr[j]=crr[j];
			}
			count=0;
	        for(int i=0;i<9;i++)
       			 {
    		    	if(arr[i]==brr[i])
       			 	count++;
				}
			if(count==8)
			return 1;
		}
		return 0;
}
int match(vector<int> arr,vector<int> brr)
{
	int y=checkrot(arr,brr);
	if(y==1)
	return 1;
	   		int temp;
         	for(int i=0;i<7;i=i+3)                       //mirror;
       	 	{
       		  	temp=brr[i];
        	 	brr[i]=brr[i+2];
         		brr[i+2]=temp;
       		}
    y=checkrot(arr,brr);
	if(y==1)
	return 1;
	else 
	return 0;   		
}
int main()
{
	
	int y;
	::fin.open("NEW",ios::out|ios::in|ios::app);
    ::fin1.open("TREE-DATA-STRUCTURE",ios::out|ios::in|ios::trunc);
	::fin.seekg(0); 
	vector<int> drr[759];
	int pos=1,val;
	for(int i=0;i<11;i++)
    {
    	cout<<"s";
        drr[0].push_back(0);
		//::fin1<<drr[0][i]<<" ";	
	}
	cout<<"d";
	int xx=0;	
	while(!::fin.eof())
	{
		for(int i=0;i<11;i++)
		{
			cout<<xx++;
			if(::fin.eof())
			break;
			::fin>>val;
			drr[pos].push_back(val);
		}
    	if(::fin.eof())
		break;
		pos++;
		
	}
	cout<<"m";
	int c=0;
	//cout<<drr[21][9];
	for(int i=0;i<759;i++)
	{
		int lev=drr[i][9],j;
		for(j=i+1;j<759;j++)
		{
			if(drr[j][9]==(lev+1))
			break;
		}
		int count=0,beg,end;

		while(drr[j][9]==(lev+1))
		{
			count=0;
			vector<int> arr,brr;
			for(int k=0;k<11;k++)
			{
				arr.push_back(drr[i][k]);
				brr.push_back(drr[j][k]);
			}
			count=match(arr,brr);
			if(count==1)
			{
				drr[i].push_back(j);	            
			}
			j++;
		}
	
	}
	for(int i=0;i<759;i++)
	{
		for(int j=0;j<drr[i].size();j++)
		::fin1<<drr[i][j]<<" ";
		::fin1<<"\n";
	}
	return 0;
}
