Program generates  all the childerens of the perticular states

Childerens of the perticular states are the index of the array after 11th index


array ---->     {                                                   }

index ---->       0  1  2  3  4  5  6  7  8  9  10  11  12  13 ....

                |      0-8 GAME BOARD      |       | CHILDERENS    |

index-9---> defines the level of the tree.

index->10--> defines the currrent state of the game  (1,0,-1)

1-->X won
-1->O won
0--> no outcome.



                                                                    |     |     |
          game state t the begning
                                                                    |     |     |
 
                                                                    |     |     |





                       
                             |  X  |     |                        X |     |     |                     |     |     |
       distinct   
       childerens            |     |     |                          |     |     |                     |  X  |     |
 
                             |     |     |                          |     |     |                     |     |     |




Therefore programs assign all the childerens index to the current state..