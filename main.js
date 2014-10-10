var app = angular.module('toeApp', []);

  app.controller('GameController', function($scope) {

    // create empty arrays for playerX and playerO
    $scope.playerX = [] ;
    $scope.playerO = [] ;

    // keep track of how many moves have been made
    $scope.movecounter = 0 ;

    // keep track of how many wins each player has accumulated
    $scope.xwincounter = 0 ;
    $scope.owincounter = 0 ;

    // create array of all possible winning combo arrays
    $scope.winCombos = [[1,2,3],[4,5,6],[7,8,9],[1,4,7],[2,5,8],[3,6,9],[1,5,9],[3,5,7]];

    // use cellList object to assist with changing class
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

    // increment this value when a win happens, reset button will bring this button back to 0
    $scope.gamecounter = 0;

    $scope.winner;

    // check to see if the array of playerX's array includes one of the winning combo arrays
    $scope.checkWinX = function () {
      for(var i = 0; i < $scope.winCombos.length; i++) {
        if ( $scope.playerX.indexOf($scope.winCombos[i][0]) >= 0 ) {
          if ( $scope.playerX.indexOf($scope.winCombos[i][1]) >= 0 ) {
            if ( $scope.playerX.indexOf($scope.winCombos[i][2]) >= 0 ) {
              $scope.xwincounter = $scope.xwincounter + 1;
              $scope.winner = "X";
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
              $scope.owincounter = $scope.owincounter + 1;
              $scope.winner = "O";
              $scope.gamecounter = $scope.gamecounter + 1;
              // alert("O wins! O has " + $scope.owincounter + " wins and " + "X has " + $scope.xwincounter + " wins");
              return true;
            }
          }
        }
      }
    };

    // on each click, incrase movecounter by one, change cell status and check for a winner
    $scope.playerPicks = function(thisCell) {
      $scope.movecounter = $scope.movecounter + 1 ;
      if (($scope.movecounter % 2) == 1) {
        $scope.playerX.push(thisCell.status);
        $scope.playerX.sort();
        thisCell.status = "X" ;
        $scope.checkWinX();
        if ($scope.movecounter == 9) {
          $scope.checkWinX();
          $scope.gamecounter = $scope.gamecounter + 1;
          $scope.winner = "NO ONE";
          // alert("It's a draw");
        }  
      } 
      else {
        $scope.playerO.push(thisCell.status);
        $scope.playerO.sort();
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
      $scope.winner;
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


