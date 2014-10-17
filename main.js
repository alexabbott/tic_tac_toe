var app = angular.module('ToeApp', ["firebase"]);

  app.controller('GameController', function($scope,$firebase) {

  $scope.remoteGameContainer = 
  $firebase(new Firebase("https://aatictactoe.firebaseIO.com/databaseGameContainer")) ;
  // Don't forget to change "tttbyrichard" to your Firebase app name.


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

    // create 'movecounter' variable to keep track of how many moves have been made
    $scope.moveCounter = 0 ;

    // create empty arrays for playerX and playerO
    $scope.playerX = ['x'] ;
    $scope.playerO = ['o'] ;


    // create variables to keep track of how many wins each player has accumulated
    $scope.oWinCounter = 0 ;
    $scope.xWinCounter = 0 ;

    // used for the reset button
    $scope.gameCounter = 0;

    // create 'winner' variable to display winner on winner declaration
    $scope.winner = 0;

    // create array of all possible winning combo arrays
    $scope.winCombos = [[1,2,3],[4,5,6],[7,8,9],[1,4,7],[2,5,8],[3,6,9],[1,5,9],[3,5,7]];


    // This container object is what gets synced:
  $scope.gameContainer = {
    cellListArray: $scope.cellList,
    moveCount: $scope.moveCounter,
    playerXValues: $scope.playerX,
    playerOValues: $scope.playerO,
    xWinCounterValue: $scope.xWinCounter,
    oWinCounterValue: $scope.oWinCounter,
    gameCounterValue: $scope.gameCounter,
    winnerValue: $scope.winner,
    winCombosValues: $scope.winCombos
  } ;

  // Everywhere else in your program, use $scope.gameContainer.cellListArray instead of cellList.
  // Everywhere else in your program, use $scope.gameContainer.clickCounter instead of clickCount.
  // Make that change in your ng-repeat as well and anywhere in your index.html as needed.


  // remoteGameContainer: that is the name you gave the Firebase node (looks like a folder in Firebase).
  // The bind statement creates a connection between anything in your app and the Firebase connection we just created.
   
  $scope.remoteGameContainer.$bind($scope, "gameContainer") ;

 // The bind statement will automatically update your model, in this case cellList, whenever it 
  // changes on Firebase.  But this will not trigger an Angular update of the interface (index.html)
  // - we've been relying on the ng-click to wake up Angular and get the gameboard refreshed.
  // So we put a watch on cellList - this tells Angular to refresh the interface elements, ie ng-class,
  // whenever the model, in this case celList, changes.
  $scope.$watch('gameContainer', function() {
    console.log('gameCountainer changed!') ;
  }) ;


    // Audio files for clicking X, O, Reset and winner declaration
    $scope.xSound = new Audio('X.wav');

    $scope.oSound = new Audio('O.wav');

    $scope.resetSound = new Audio('reset.wav');

    $scope.xWinsSound = new Audio('xwins.wav');

    $scope.oWinsSound = new Audio('owins.wav');

    $scope.tieSound = new Audio('tie.wav');


    // check to see if the array of playerX's array includes one of the winning combo arrays
    $scope.checkWinX = function () {
      for(var i = 0; i < $scope.gameContainer.winCombosValues.length; i++) {
        if ( $scope.gameContainer.playerXValues.indexOf($scope.gameContainer.winCombosValues[i][0]) >= 0 ) {
          if ( $scope.gameContainer.playerXValues.indexOf($scope.gameContainer.winCombosValues[i][1]) >= 0 ) {
            if ( $scope.gameContainer.playerXValues.indexOf($scope.gameContainer.winCombosValues[i][2]) >= 0 ) {
              // Increase x's win counter by 1
              $scope.gameContainer.xWinCounterValue = $scope.gameContainer.xWinCounterValue + 1;
              // Define 'X' as the winner to be displayed in winner declaration
              $scope.gameContainer.winnerValue = "X";
              // Increase gamecounter by one to show hidden winner declaration div
              $scope.gameContainer.gameCounterValue = $scope.gameContainer.gameCounterValue + 1;
              $scope.xWinsSound.play();
              // alert("X wins! X has " + $scope.xwincounter + " wins and " + "O has " + $scope.owincounter + " wins");
              return true;
            }
          }
        }
      }
    };

    // check to see if the array of playerO's array includes one of the winning combo arrays
    $scope.checkWinO = function () {
      for(var i = 0; i < $scope.gameContainer.winCombosValues.length; i++) {
        if ( $scope.gameContainer.playerOValues.indexOf($scope.gameContainer.winCombosValues[i][0]) >= 0 ) {
          if ( $scope.gameContainer.playerOValues.indexOf($scope.gameContainer.winCombosValues[i][1]) >= 0 ) {
            if ( $scope.gameContainer.playerOValues.indexOf($scope.gameContainer.winCombosValues[i][2]) >= 0 ) {
              // Increase o's win counter by 1
              $scope.gameContainer.oWinCounterValue = $scope.gameContainer.oWinCounterValue + 1;
              // Define 'O' as the winner to be displayed in winner declaration
              $scope.gameContainer.winnerValue = "O";
              // Increase gamecounter by one to show hidden winner declaration div
              $scope.gameContainer.gameCounterValue = $scope.gameContainer.gameCounterValue + 1;
              $scope.oWinsSound.play();
              // alert("O wins! O has " + $scope.owincounter + " wins and " + "X has " + $scope.xwincounter + " wins");
              return true;
            }
          }
        }
      }
    };

    // on each click, increase movecounter by one, change cell status based on movecounter, and run the checkWin function
    $scope.playerPicks = function(thisCell) {
      $scope.gameContainer.moveCount = $scope.gameContainer.moveCount + 1 ;
      if (($scope.gameContainer.moveCount % 2) == 1) {
        $scope.gameContainer.playerXValues.push(thisCell.status);
        $scope.gameContainer.playerXValues.sort();
        // set the new status for the cell, which will trigger a change to the xbox class
        thisCell.status = "X" ;
        $scope.xSound.play();
        $scope.checkWinX();
        // show the 'draw' status if neither player has a winning combo after the 9 possible clicks
        if (($scope.gameContainer.moveCount == 9) && ($scope.gameContainer.winnerValue != "X")) {
          // Increase gamecounter by one to show hidden 'draw' declaration div
          $scope.gameContainer.gameCounterValue = $scope.gameContainer.gameCounterValue + 1;
          $scope.gameContainer.winnerValue = "NO ONE";
          $scope.tieSound.play();
          // alert("It's a draw");
        }  
      } 
      else {
        $scope.gameContainer.playerOValues.push(thisCell.status);
        $scope.gameContainer.playerOValues.sort();
        // set the new status for the cell, which will trigger a change to the obox class
        thisCell.status = "O" ;
        $scope.oSound.play();
        $scope.checkWinO();
      } 

    } ;

    // this function resets the player arrays and movecounter
    $scope.reset = function() {
      $scope.gameContainer.playerXValues = ["x"];
      $scope.gameContainer.playerOValues = ["o"];
      $scope.gameContainer.moveCount = 0;
      $scope.gameContainer.gameCounterValue = 0;
      $scope.gameContainer.winnerValue = 0;
      $scope.gameContainer.cellListArray = [
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
      $scope.resetSound.play();
    }

  });


