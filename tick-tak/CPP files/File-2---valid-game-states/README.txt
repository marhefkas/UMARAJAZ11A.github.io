program finds the valid game states 

eg--

         X  |  X  |  X  |
        
         X  |  O  |  O  |
 
         X  |  O  |  O  |

invalid state---- >  two win of x not possible



         X  |  X  |  X  |
        
         X  |  X  |  O  |
 
         X  |  O  |  O  |

invalid state ---> no of X input is two more than number of O input


         X  |  X  |  X  |
        
            |     |  O  |
 
            |  O  |  O  |

invalid state---> X already won,therfore O input is not possible after player 1 won the game


Therefore all the states of these kind are invalid and is removes from the game states.
