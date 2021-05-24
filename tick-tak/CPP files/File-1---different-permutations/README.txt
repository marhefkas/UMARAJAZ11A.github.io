program finds all the possible permutation of the game set

we have array of 9 elements

possible inputs are 
0--> empty space
1--> X input
2--> O input

we need to find the permutations of following array states

array sates                                permutation

1--->  0 0 0 0 0 0 0 0 1                   (9!)/(8!*1!*0!)

2--->  0 0 0 0 0 0 0 2 1                   (9!)/(7!*1!*1!)

3--->  0 0 0 0 0 0 1 2 1                   (9!)/(6!*2!*1!)

4--->  0 0 0 0 0 2 1 2 1                   (9!)/(5!*2!*2!)
     
5--->  0 0 0 0 1 2 1 2 1                   (9!)/(4!*3!*2!)

6--->  0 0 0 2 1 2 1 2 1                   (9!)/(3!*3!*3!)

7--->  0 0 1 2 1 2 1 2 1                   (9!)/(2!*4!*3!)

8--->  0 2 1 2 1 2 1 2 1                   (9!)/(1!*4!*4!)

9--->  1 2 1 2 1 2 1 2 1                   (9!)/(0!*5!*4!)

total permutations are

T  =  (9!)/(8!*1!*0!) +  (9!)/(7!*1!*1!)  +  (9!)/(6!*2!*1!)  +  (9!)/(5!*2!*2!)  +  (9!)/(4!*3!*2!)  +  (9!)/(3!*3!*3!)
  
      +  (9!)/(2!*4!*3!)  +  (9!)/(1!*4!*4!)  +  (9!)/(0!*5!*4!)

T  =  6045   ---->  distinct permutation