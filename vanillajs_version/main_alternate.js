var app = angular.module('toeApp', []);

app.controller('gameCtrl', function($scope) {

});

// instantiate empty arrays for playerX and playerO
	var playerX = [];
	var playerO = [];

	// Define winning combos
	var winCombos = [[1,2,3],[4,5,6],[7,8,9],[1,4,7],[2,5,8],[3,6,9],[1,5,9],[3,5,7]];

	// function that resets each player's array and resets all the boxes to remove "X"'s and "O"'s'
	// var reset = function () {
	// 	playerX = [];
	// 	playerO = [];
	// 	for (i = 1; i < 10; i++) {
	// 		document.getElementById('box' + i).innerHTML = i;
	// 	};
	// };

	// check to see if the array of playerX's values includes one of the winning combo arrays
	var checkWinX = function () {
		for(var i = 0; i < winCombos.length; i++) {
		    if ( playerX.indexOf(winCombos[i][0]) >= 0 ) {
		        if ( playerX.indexOf(winCombos[i][1]) >= 0 ) {
		            if ( playerX.indexOf(winCombos[i][2]) >= 0 ) {
		            alert("Congrats, X wins!");
		        return true;
		            }
		       }
		    }
		}
	};

	// check to see if the array of playerO's values includes one of the winning combo arrays
	var checkWinO = function () {
		for(var i = 0; i < winCombos.length; i++) {
		    if ( playerO.indexOf(winCombos[i][0]) >= 0 ) {
		        if ( playerO.indexOf(winCombos[i][1]) >= 0 ) {
		            if ( playerO.indexOf(winCombos[i][2]) >= 0 ) {
		            alert("Congrats, O wins!");
		        return true;
		            }
		       }
		    }
		}
	};

	// run this function on any box that is clicked
	var boxClicked = function(i) {
		// if (number of clicks for playerX + number of clicks for playerO) is even, then it's playerX's turn
		if ((playerX.length + playerO.length) == 0 || (playerX.length + playerO.length) == 2 || (playerX.length + playerO.length) == 4 || (playerX.length + playerO.length) == 6) {
			var eachBox = document.getElementById('box' + i);
			var num = Number(eachBox.innerHTML);
			// Turn the innerHTML that's collected from playerX's clicked on box into an integer
			playerX.push(num);
			eachBox.innerHTML = "X";
			// change the style of the box to make it unclickable
			eachBox.style.pointerEvents = "none";
			// sort array of playerX clicks from lowest to highest
			playerX.sort();
			checkWinX();
		}
		// if (number of clicks for playerX + number of clicks for playerO) is odd, then it's playerO's turn
		else if ((playerX.length + playerO.length) % 2 == 1) {
			var eachBox = document.getElementById('box' + i);
			var num = Number(eachBox.innerHTML);
			// Turn the innerHTML that's collected from playerX's clicked on box into an integer
			playerO.push(num);
			eachBox.innerHTML = "O";
			// change the style of the box to make it unclickable
			eachBox.style.pointerEvents = "none";
			// sort array of playerO clicks from lowest to highest
			playerO.sort();
			checkWinO();
		}
		// if (number of clicks for playerX + number of clicks for playerO) is 8, then it's playerX's last turn
		else if ((playerX.length + playerO.length) == 8) {
			var eachBox = document.getElementById('box' + i);
			var num = Number(eachBox.innerHTML);
			// Turn the innerHTML that's collected from playerX's clicked on box into an integer
			playerX.push(num);
			eachBox.innerHTML = "X";
			// change the style of the box to make it unclickable
			eachBox.style.pointerEvents = "none";
			// sort array of playerX clicks from lowest to highest
			playerX.sort();
			checkWinX();
			// if X doesn't win on this turn, display the "Draw" alert
			alert("It's a Draw.");
		}
		else {
			console.log("Game Over");
		}
	};


