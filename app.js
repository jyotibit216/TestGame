(function() {

  var app = angular.module("HangmanGame", []);

  app.controller("MainController", function($scope) {
    var words = ["3dhubs", "marvin", "print", "filament", "order", "layer"];
    $scope.guesses = 5;
    $scope.displayWord = '';
    $scope.score = 0;
    $scope.highScore = 0;
    $scope.input = '';
    $scope.message = '';

    /* Select a random word from the words array */
    var selectAWord = function() {
      var index = Math.round(Math.random() * (words.length - 1));
      return words[index];
    };


    /* Start a new game. Initialize all variables */
    var newGame = function() {
      $scope.guesses = 5;
      $scope.displayWord = '';
      $scope.score = 0;
      $scope.message = '';

      selectedWord = selectAWord();
      console.log(selectedWord);
      var tempDisplayWord = '';
      for (var i = 0; i < selectedWord.length; i++) {
        tempDisplayWord += '_ ';
      }
      $scope.displayWord = tempDisplayWord;
    };

    /* Logic to evaluate the input word : If correct then set the display letter, if correct 
       and scores, otherwise decrement number of guesses. 
       Show the message 'Win/Lose' at the end & Show/Hide button to start a new game.
    */
    $scope.inputLetter = function() {
      var correct = false;
      var gameOver = false;
      var firstInputLetter = '';

      /* Incase of more than one letter entered by the user,use the first letter as input*/
      firstInputLetter = $scope.input[0];

      for (var k = 0; k < selectedWord.length; k++) {
        if (selectedWord[k].toLowerCase() == firstInputLetter.toLowerCase()) {
          $scope.displayWord = $scope.displayWord.slice(0, 2 * k) + firstInputLetter.toLowerCase() + $scope.displayWord.slice(2 * k + 1);
          correct = true;
        }
      }

      if (correct) {
        $scope.score = $scope.score + 10;
      } else {
        $scope.guesses--;
        $scope.score = $scope.score - 10;
      }

      $scope.input = '';

      if ($scope.guesses === 0) {
        $scope.message = "Sorry,You lost. Please try again!!";
        gameOver = true;
      }
      if ($scope.displayWord.indexOf("_") == -1) {
        $scope.message = "You won!!! Your score is " + $scope.score;
        gameOver = true;
      }

      if (gameOver) {
        $scope.ShowBtn = true; // Show the button to start a new game
        $scope.inputBtn = true;
        if ($scope.score > $scope.highScore) {
          $scope.highScore = $scope.score;
        }
      }
    };

    $scope.startNewGame = function() {
      newGame();
      $scope.inputBtn = false;
      $scope.ShowBtn = false;
    };

    newGame();
  });

}());