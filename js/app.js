$(document).ready(function() {

// VARIABLES
var sequence = [];
var userInput = [];
var playerTurn = false;
var strict = false;

var greenAudio = document.getElementById("greenAudio");
var redAudio = document.getElementById("redAudio");
var yellowAudio = document.getElementById("yellowAudio");
var blueAudio = document.getElementById("blueAudio");


// FUNCTIONS
function add() {
	playerTurn = false;
	if (sequence.length == 20) {

		$("#counter").html(":)");

		setTimeout(function() {
			$("section").fadeOut();
		}, 500);

		setTimeout(function() {
			$(".message").fadeIn();
		}, 1000);

		setTimeout(function() {
			$(".message").fadeOut();
		}, 4000);

		setTimeout(function() {
			$("section").fadeIn();
		}, 4500);

		sequence = [];

		setTimeout(function() {
			add();
		}, 5000);	
		
		
	} else {
		var random = Math.floor(Math.random() * 4);
		if (random == 0) {random = "green"}
		else if (random == 1) {random = "red"}
		else if (random == 2) {random = "yellow"}
		else if (random == 3) {random = "blue"}
		sequence.push(random);
		updateCounter();
		displaySequence();			
	}
}

function displaySequence() {
	console.log(sequence);
	playerTurn = false;
	var i = 0;

	var x = setInterval(function() {

		if (i >= sequence.length) { 
			clearInterval(x); 
			setTimeout(function() { // adds a delay before allowing user to click
				playerTurn = true;
				// console.log("player turn = true");
			}, (300));
		}

		interact(sequence[i]);
		i++;		
	}, 600);

	userInput = [];
}

function userClick(color) {
	if (playerTurn == true) {
		playerTurn = false;
		userInput.push(color);
		var sequenceStr = sequence.slice(0, userInput.length).join("");
		var userInputStr = userInput.join("");

		interact(color);

		if (sequenceStr == userInputStr) {
			// console.log("correct!");
			playerTurn = true;
			if (userInput.length == sequence.length) {
				setTimeout(function() {
					add();
				}, 1500);
			}
		} else {
			playerTurn = false;

			// console.log("sorry, wrong!");
			wrong.play();
			$("#counter").html("!!");
			$("#counter").addClass("wrong");

			if (strict == false) {
				setTimeout(function() {
					updateCounter();
					displaySequence();
				}, 600);
			} else {
				playerTurn = false;
				sequence = [];
				userInput = [];
				setTimeout(function() {
					updateCounter();
					add();
				}, 600);
			}

			userInput = [];
		}

	}
}

function interact(color) {
		switch (color) {
			case "green":
				greenAudio.play();
				break;
			case "red":
				redAudio.play();
				break;
			case "yellow":
				yellowAudio.play();
				break;
			case "blue":
				blueAudio.play();
				break;
		}

	var id = "#" + color;
	var cssClass = color + "-active";

	$(id).addClass(cssClass);
	setTimeout(function() { $(id).removeClass(cssClass); }, 300);		
}

function updateCounter() {
	$("#counter").removeClass("wrong");
	if (sequence.length < 10) {
		$("#counter").html("0" + sequence.length);
	} else {
		$("#counter").html(sequence.length);			
	}
}

// COLOR BUTTONS
$("#green").click(function() {
	userClick("green");
});

$("#red").click(function() {
	userClick("red");
});

$("#yellow").click(function() {
	userClick("yellow");
});

$("#blue").click(function() {
	userClick("blue");
});


// CONTROLS
$("#start").click(function() {
	sequence = [];
	$("#counter").html("00");
	add();
});

$("#strict").click(function() {
	if (strict == false) {
		strict = true;
		$("#strict").html("strict: ON");
	} else 
	if (strict == true) {
		strict = false;
		$("#strict").html("strict: OFF");
	}
});

});// end jquery