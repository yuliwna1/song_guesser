$(function() {
	// Global Variable Declarations
	// LEVEL OBJECT //
	var levels = [
		// Level 1
		{
			albumCoverSrc: 'img/Adele.png',
			songSrc: 'songs/Adele-Hello.mp3',
			correctAnswer: 'Adele',
			allAnswers: [
				'Madonna', 
				'Jessie J',
				'Ariana Grande',
				'Adele'
			],
			songLength: 20000
		},
		// Level 2
		{
			albumCoverSrc: 'img/Drake.png',
			songSrc: 'songs/Drake-HotlineBling.mp3',
			correctAnswer: 'Drake',
			allAnswers: [
				'Justin Bieber', 
				'The Weeknd',
				'Justin Timberlake',
				'Drake'
			],
			songLength: 20000	
		},
		// Level 3
		{
			albumCoverSrc: 'img/JustinTimberlake.png',
			songSrc: 'songs/JustinTimberlake-CantStopTheFeeling.mp3',
			correctAnswer: 'Justin Timberlake',
			allAnswers: [
				'Adam Levine', 
				'Justin Bieber',
				'Sam Smith',
				'Justin Timberlake'
			],
			songLength: 20000
		},
		// Level 4
		{
			albumCoverSrc: 'img/CarlyRaeJepsen.png',
			songSrc: 'songs/CarlyRaeJepsen-CallMeMaybe.mp3',
			correctAnswer: 'Carly Rae Jepsen',
			allAnswers: [
				'Taylor Swift', 
				'Rebecca Black',
				'Regina Spektor',
				'Carly Rae Jepsen'
			],
			songLength: 20000
		},
		// Level 5
		{
			albumCoverSrc: 'img/Sia.png',
			songSrc: 'songs/Sia-Chandelier.mp3',
			correctAnswer: 'Sia',
			allAnswers: [
				'Rihanna', 
				'Jessie J',
				'Ariana Grande',
				'Sia'
			],
			songLength: 20000
		},
		// Level 6
		{
			albumCoverSrc: 'img/JustinBieber.png',
			songSrc: 'songs/JustinBieber-WhatDoYouMean.mp3',
			correctAnswer: 'Justin Bieber',
			allAnswers: [
				'Jason Derulo', 
				'Justin Bieber',
				'Jay Sean',
				'Justin Nozuka'
			],
			songLength: 15000
		},
		// Level 7
		{
			albumCoverSrc: 'img/Beyonce.png',
			songSrc: 'songs/Beyonce-DrunkInLove.mp3',
			correctAnswer: 'Beyonce',
			allAnswers: [
				'Rihanna', 
				'Jennifer Lopez',
				'Madonna',
				'Beyonce'
			],
			songLength: 15000
		},
		// Level 8
		{
			albumCoverSrc: 'img/Rihanna.png',
			songSrc: 'songs/Rihanna-Unfaithful.mp3',
			correctAnswer: 'Rihanna',
			allAnswers: [
				'Debbie Dobson', 
				'Jessie J',
				'Beyonce',
				'Rihanna'
			],
			songLength: 10000
		},
		// Level 9
		{
			albumCoverSrc: 'img/KylieMinogue.png',
			songSrc: 'songs/KylieMinogue-ConfideInMe.mp3',
			correctAnswer: 'Kylie Minogue',
			allAnswers: [
				'Britney Spears', 
				'Gwen Stefani',
				'Madonna',
				'Kylie Minogue'
			],
			songLength: 10000
		},
		// Level 10
		{
			albumCoverSrc: 'img/MarkRonson.png',
			songSrc: 'songs/MarkRonson-Daffodils.mp3',
			correctAnswer: 'Mark Ronson',
			allAnswers: [
				'Kevin Parker', 
				'Pharell Williams',
				'Anderson .Paak',
				'Mark Ronson'
			],
			songLength: 10000
		}
	]

	var albumArt = $('.album-art img');

	var musicPlayer = $('.music-player');
	var toggleBtn = $('.play-pause i');

	/* A function to re-order the numbers within a given array. */
	function shuffleArray(array) {
		var randInt;
		var temp;

		for (i = 0; i < array.length; i++) {
			// Swap two numbers with one another.
			randInt = Math.floor(Math.random() * (i + 1));
			temp = array[i];
			array[i] = array[randInt];
			array[randInt] = temp;
		}

		return array;
	}

	var answerNumbers = shuffleArray([0, 1, 2, 3]);

	var answerButton = $('.questions button');

	/* Create one button for each answer and propogate each button 
	with it's respective answer text. */
	function populateButtons(array, levelIndex) {
		for (i = 0; i < array.length; i++) {
			var buttonText = levels[levelIndex].allAnswers[array[i]];
			$('.questions').append(`<button>${buttonText}</button>`);
		}
	};

	var currentLevel = 0;
	var wrongAnswers = 0;
	var lastLevel = (levels.length - 1);

	/* Function to create a new level */
	function createLevel (levelNumber) {
		// Reset the wrong answers counter
		wrongAnswers = 0;
		
		// Remove all buttons from the previous level.
		$('.questions button').remove();

		// Reset audio and image sources.
		$(albumArt).attr('src', levels[levelNumber]['albumCoverSrc']);
		$(musicPlayer).attr('src', levels[levelNumber]['songSrc']);

		// Create new buttons
		populateButtons(answerNumbers, levelNumber);
	};

	// Create the first level.
	createLevel(currentLevel);

	//Create the event after the last level is completed.



	// When you click on an answer.
	$('.questions').on('click', 'button', function(e) {
		// Check if the answer is correct based on the current level.
		if (this.textContent === levels[currentLevel].correctAnswer) {
			// Shuffle the array to prepare for creation of new buttons.
			answerNumbers = shuffleArray([0, 1, 2, 3]);
			
			/* Make the correct answer button green and call the increment
			score function, passing a value of 500 points. */
			$(this).addClass('correct');
			incrementScore(500);
			
			// Wait 0.8seconds
			setTimeout(function() {
				// Increment the level counter and create a new level.
				currentLevel++;
				createLevel(currentLevel);

				//Adding pop up message after the last level is completed

				if (currentLevel === lastLevel) {
					var modalScore = $('.modal-score');

					$('.questions').on('click', function() {
					$('.app-content.game-screen .game-content .album-art').remove();
					var yourScore = $('.yourScore');
					var yourTotalScore = "Your total score " + newScore;
					$(yourScore).html(yourTotalScore);
					modalScore.fadeIn(300);
					$(modalScore).css('display', 'block');

					//if the user click on "yes"
					var positiveAnswer = $('.positiveAnswer');
					var negativeAnswer = $('.negativeAnswer');

					$(positiveAnswer).on('click', function () {
						window.location.reload();
						console.log('YESSSSSS');
					})

					$(negativeAnswer).on('click', function() {
						$(modalScore).remove();
					})
					console.log('FINISH!!!');
					})
				}

				
				// If the music player is paused when you move to the next level.
				if (musicPlayer.get(0).paused === true) {
					// Ensure the play button is displayed.
					toggleBtn.removeClass('fa-pause');
					toggleBtn.addClass('fa-play');
					// Reset the song timer.
					$("#container").html("");	
				}
        	}, 800);
		}
		else {
			// Make the wrong answer button red and add to the wrong answers counter.
			$(this).addClass('incorrect');
			wrongAnswers++;
		}
	});

	// Toggle music playback
	function togglePlay() {
		// Switch the play and pause icon.
		toggleBtn.toggleClass('fa-play fa-pause');

		// If the track isn't pause
		if (musicPlayer.get(0).paused === false) {
			// Pause it.
			musicPlayer.trigger('pause');
			// Reset the track to the beggining.
			musicPlayer.get(0).currentTime = 0;
			// Stop the pulsing anim.
			$('.album-art').removeClass('play-pulse');
			// Reset the song timer.
			$("#container").html("");	
		} else {
			// Play the track.
			musicPlayer.trigger('play');
			// Start the pulsing anim.
			$('.album-art').addClass('play-pulse');
			// Start the song timer.
			createBar();
			bar.animate(1);	
		}	
	};

	var score = 0;
	var newScore = 0;
	$('.score').html(score);

	// Calculate the score that should be added to the user's and add it.
	function incrementScore(addScore) {
		// Users current score + maximum additional score - 100 for each wrong answer.
		newScore = score + (addScore - (wrongAnswers * 100)); 

		// Count the current score up the new score.
		var scoreDelay = setInterval(function() {
			if (score === newScore) {
				clearInterval(this);
			} else {
				score = score + 10;
				$('.score').html(score);
			}
		}, 20);	
	}

	// MUSIC PLAYER //
	/* When the user clicks on the play/pause button,
	play or pause the audio file and change the icon to
	match the current state of the audio player. */
	$('.play-pause').on('click', function(e) {
		togglePlay();
	});

	/* When audio file has finished playing, change the
	icon to match the now paused state of the player. */
	$(musicPlayer).on('ended', function() {
	   toggleBtn.toggleClass('fa-play fa-pause');
	   	$('.album-art').removeClass('play-pulse');
	   $("#container").html("");
	});

	// Music timer (ProgressBar.js Plugin)
	var bar;

	function createBar() {
			bar = new ProgressBar.Circle(container, {
			strokeWidth: 2,
			easing: 'linear',
			duration: levels[currentLevel].songLength,
			color: '#5AC8FA',
			trailColor: 'transparent',
			trailWidth: 2
		});
	}

	// MODAL //
    var modal = $('.modal');
    var modalTrigger = $('.modal-trigger');
    
    // Open the Modal when its trigger button is clicked.
    modalTrigger.on('click', function() {
        modal.fadeIn(300);
        
        // Add the modal to the page.
        $(modal).css('display', 'block');
        $('.restart').on('click', function () {
			window.location.reload();
		})
		$('.resume').on('click', function () {
			$(modal).css('display', 'none');
		})
    });
   
    // Close the Modal when the user clicks anywhere outside of the Modal.
    window.onclick = function(event) {
        if (event.target === modal[0]) {
            modal.fadeOut(300);
            
            setTimeout(function() {
                // Remove the modal from the page and allow the user to scroll.
                $(modal).css('display', 'none');
            }, 300);
        }
    }; 
});