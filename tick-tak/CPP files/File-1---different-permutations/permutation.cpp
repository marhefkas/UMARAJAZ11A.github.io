#include <bits/stdc++.h>
#include<iostream>
#include<vector>
#include<math.h>
#include<fstream>
using namespace std;
	    fstream fin;
	    int count=0;
void  perm(int arr[],int lb,int ub)
{
	if(lb>ub)
	{   
		for(int i=0;i<9;i++)
		{
			cout<<arr[i];
			::fin<<arr[i]<<" ";
		}
		::fin<<arr[9]<<" "<<arr[10];
		::fin<<"\n";
		cout<<"\n";
		return ;
	}
	else
	{
		int i,j,chk[9];
		chk[lb]=0;
		for( i=lb+1;i<=ub;i++)
		{
			for( j=lb;j<i;j++)
			{
			     if(arr[j]==arr[i])
				 {
				 	break;
			    	}	
			}
			if(j==i)
			chk[i]=0;
			else
			chk[i]=1;
		}
		for(int i=lb;i<=ub;i++)
		{
		
	             		int temp;
	             		if(chk[i]==0)
	             		{
						 {
						 
                  			temp=arr[i];
			     			arr[i]=arr[lb];
				    		arr[lb]=temp;
						perm(arr,lb+1,ub);
			
			      			temp=arr[i];
			     			arr[i]=arr[lb];
			     			arr[lb]=temp; 
					    }
					}
		}
	}
}

int main()
{

	int flag1=1,flag2=0;
	::fin.open("permutation",ios::out|ios::in|ios::app);
	::fin.seekg(0);
 	int arr[]={0,0,0,0,0,0,0,0,0,0,0};
    for(int i=1;i<10;i++)   	
	{
		if(flag1==1)
		{
			arr[i-1]=1;
			flag1=0;
			flag2=1;
		}
		else
		{
			arr[i-1]=2;
			flag2=0;
			flag1=1;
		}
	    arr[9]=i;
       	perm(arr,0,8);
   }
  
	return 0;
}
