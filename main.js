var app = angular.module('toeApp', []);

  app.controller('GameController', function($scope) {

    // create empty arrays for playerX and playerO
    $scope.playerX = [] ;
    $scope.playerO = [] ;

    // create 'movecounter' variable to keep track of how many moves have been made
    $scope.movecounter = 0 ;

    // create variables to keep track of how many wins each player has accumulated
    $scope.xwincounter = 0 ;
    $scope.owincounter = 0 ;

    // create array of all possible winning combo arrays
    $scope.winCombos = [[1,2,3],[4,5,6],[7,8,9],[1,4,7],[2,5,8],[3,6,9],[1,5,9],[3,5,7]];

    // use cellList object to assist with changing class and assigning values to player arrays
    $scope.cellList = [
      {status: 1}, 
      {status: 2}, 
      {status: 3}, 
      {status: 4}, 
      {status: 5}, 
      {status: 6}, 
      {status: 7}, 
      {status: 8}, 
      {status: 9}
      ]  ;

    // used for the reset button
    $scope.gamecounter = 0;

    // create 'winner' variable to display winner on winner declaration
    $scope.winner = 0;

    // check to see if the array of playerX's array includes one of the winning combo arrays
    $scope.checkWinX = function () {
      for(var i = 0; i < $scope.winCombos.length; i++) {
        if ( $scope.playerX.indexOf($scope.winCombos[i][0]) >= 0 ) {
          if ( $scope.playerX.indexOf($scope.winCombos[i][1]) >= 0 ) {
            if ( $scope.playerX.indexOf($scope.winCombos[i][2]) >= 0 ) {
              // Increase x's win counter by 1
              $scope.xwincounter = $scope.xwincounter + 1;
              // Define 'X' as the winner to be displayed in winner declaration
              $scope.winner = "X";
              // Increase gamecounter by one to show hidden winner declaration div
              $scope.gamecounter = $scope.gamecounter + 1;
              // alert("X wins! X has " + $scope.xwincounter + " wins and " + "O has " + $scope.owincounter + " wins");
              return true;
            }
          }
        }
      }
    };

    // check to see if the array of playerO's array includes one of the winning combo arrays
    $scope.checkWinO = function () {
      for(var i = 0; i < $scope.winCombos.length; i++) {
        if ( $scope.playerO.indexOf($scope.winCombos[i][0]) >= 0 ) {
          if ( $scope.playerO.indexOf($scope.winCombos[i][1]) >= 0 ) {
            if ( $scope.playerO.indexOf($scope.winCombos[i][2]) >= 0 ) {
              // Increase o's win counter by 1
              $scope.owincounter = $scope.owincounter + 1;
              // Define 'O' as the winner to be displayed in winner declaration
              $scope.winner = "O";
              // Increase gamecounter by one to show hidden winner declaration div
              $scope.gamecounter = $scope.gamecounter + 1;
              // alert("O wins! O has " + $scope.owincounter + " wins and " + "X has " + $scope.xwincounter + " wins");
              return true;
            }
          }
        }
      }
    };

    // on each click, increase movecounter by one, change cell status based on movecounter, and run the checkWin function
    $scope.playerPicks = function(thisCell) {
      $scope.movecounter = $scope.movecounter + 1 ;
      if (($scope.movecounter % 2) == 1) {
        $scope.playerX.push(thisCell.status);
        $scope.playerX.sort();
        // set the new status for the cell, which will trigger a change to the xbox class
        thisCell.status = "X" ;
        $scope.checkWinX();
        // show the 'draw' status if neither player has a winning combo after the 9 possible clicks
        if (($scope.movecounter == 9) && ($scope.winner != "X")) {
          // Increase gamecounter by one to show hidden 'draw' declaration div
          $scope.gamecounter = $scope.gamecounter + 1;
          $scope.winner = "NO ONE";
          // alert("It's a draw");
        }  
      } 
      else {
        $scope.playerO.push(thisCell.status);
        $scope.playerO.sort();
        // set the new status for the cell, which will trigger a change to the obox class
        thisCell.status = "O" ;
        $scope.checkWinO();
      } 

    } ;

    // this function resets the player arrays and movecounter
    $scope.reset = function() {
      $scope.playerX = [];
      $scope.playerO = [];
      $scope.movecounter = 0;
      $scope.gamecounter = 0;
      $scope.winner = 0;
      $scope.cellList = [
      {status: 1}, 
      {status: 2}, 
      {status: 3}, 
      {status: 4}, 
      {status: 5}, 
      {status: 6}, 
      {status: 7}, 
      {status: 8}, 
      {status: 9}
      ]  ;
    }

  });


