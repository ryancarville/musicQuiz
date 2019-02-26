'use strict';
//user score counter
let userScore = 0;
//round counter
let roundNum = 1;
//API authorization key
const apiKey ='ZTk2YjY4MjMtMDAzYy00MTg4LWE2MjYtZDIzNjJmMmM0YTdm';
const apiKey2 = 'YTkxZTRhNzAtODdlNy00ZjMzLTg0MWItOTc0NmZmNjU4Yzk4';

//error message for catch
function failureCallback(errMessage) {
    $('.container').empty();
    console.log(errMessage)
    $('.container').append(
        `We are sorry but somthing went wrong.<br><br> ${errMessage}`)
}

//displays the final results for a round, different language loads dependant on the users final score
function finalResults() {
    if (userScore >=13) {
        $('.container').empty();
        $('.container').append(
            `<div class="finalResults">
            Well played! You know your music.<br><br>Your total score is<br>${userScore}<br>
            <button type="button" name="gameOver" class="gameOver" value="gameOver">Game Over</button>
            </div>`
        )
    }
    else if (userScore >= 6 && userScore <= 12) {
        $('.container').empty();
        $('.container').append(
            `<div class="finalResults">
            Not bad, but no Grammy's for you.<br><br>Your total score is<br>${userScore}<br>
            <button type="button" name="gameOver" class="gameOver" value="gameOver">Game Over</button>
            </div>`
        )
    }
    else {
        $('.container').empty();
        $('.container').append(
            `<div class="finalResults">
            Not so hot. Maybe listen to the radio more?<br><br>Your total score is<br>${userScore}<br>
            <button type="button" name="gameOver" class="gameOver" value="gameOver">Game Over</button>
            </div>`
        )
    }
    $('.container').on('click', '.gameOver', event => {
        reload();
    });
}

//checks the round number and directs to the next song or the final results page
function checkRoundNum(userAnswerArtist, userAnswerSong, correctAnswerArtist, correctAnswerSong, resultsArtistAndSong, genreNum) {
    if (roundNum <= 10) {
        console.log(`User Current Score: ${userScore}`);
        $('div').off('click').on('click', '#nextSong', event => {
            gameStart(genreNum);
        });
    }
    else{

        if (userAnswerArtist == correctAnswerArtist && userAnswerSong == correctAnswerSong){
            userScore++;
            userScore++;
            $('.container').empty();
            $('.container').append(
                `<div class="answerResult">
                Well Done!<br>You got it all right!<br>The answer was<br><br>${resultsArtistAndSong}<br><br>You get 2 point this round.
                <br><br>Current score is:<br> ${userScore}<br>
                <button type="button" name="fianlResults" class="fianlResultsBtn" value="fianlResults">Fianl Results</button>
            </div>`
            )
        }
        else if (userAnswerArtist == correctAnswerArtist  && userAnswerSong != correctAnswerSong) {
            userScore++;
            $('.container').empty();
            $('.container').append(
                `<div class="answerResult">
                Not Bad.<br>You got the artist right but missed the song.<br>The answer was<br><br>${resultsArtistAndSong}<br><br>You get 1 point this round.
                <br><br>Current score is:<br> ${userScore}<br>
                <button type="button" name="fianlResults" class="fianlResultsBtn" value="fianlResults">Fianl Results</button>
            </div>`
            )
        }
        else if (userAnswerArtist != correctAnswerArtist  && userAnswerSong == correctAnswerSong) {
            userScore++;
            $('.container').empty();
            $('.container').append(
                `<div class="answerResult">
                Not Bad.<br>You got the song right but missed the artist.<br>The answer was<br><br>${resultsArtistAndSong}<br><br>You get 1 point this round.
                <br><br>Current score is:<br> ${userScore}<br>
                <button type="button" name="fianlResults" class="fianlResultsBtn" value="fianlResults">Fianl Results</button>
            </div>`
            )
        }
        else {
            $('.container').empty();
            $('.container').append(
                `<div class="answerResult">
                Bummer! You answered incorrectly.<br>The answer was<br><br>${resultsArtistAndSong}<br><br>You get 0 points this round.
                <br><br>Current score is:<br> ${userScore}<br>
                <button type="button" name="fianlResults" class="fianlResultsBtn" value="fianlResults">Fianl Results</button>
                </div>`
            )
        }
        $('.container').on('click', '.fianlResultsBtn', event => {
            finalResults();
        });
    }
}

//sets the users artist answer to a variable, coverts it to lowercase and removes all non char inputs
function getUserAnswerArtist() {
    const str = $('#userAnswerArtist').val();
    const userArtist = str.toLowerCase().replace(/\s/g, '').replace(/[.,\/#!$%@?+'\^&\*;:{}=\-_`~()]/g,"");
    return userArtist;
}

//sets the users song answer to a variable, coverts it to lowercase and removes all non char inputs
function getUserAnswerSong() {
    const str = $('#userAnswerSong').val();
    const userSong = str.toLowerCase().replace(/\s/g, '').replace(/[.,\/#!$%@?+'\^&\*;:{}=\-_`~()]/g,"");
    return userSong;
}

//sets the users artist answer to a variable for displaying users inoput of reuslts page
function getUserAnswerArtistDispaly() {
    const userArtistResult = $('#userAnswerArtist').val();
    return userArtistResult;
}

//sets the users song answer to a variable for displaying users inoput of reuslts page
function getUserAnswerSongDispaly() {
    const userSongResult = $('#userAnswerSong').val();
    return userSongResult;
}

//checks if the users answer matches the correct answer
function checkUserAnswer(correctAnswerArtist, correctAnswerSong, correctAnswerDisplay, genreNum) {
    const resultsArtistAndSong = correctAnswerDisplay;
    const userAnswerArtist = getUserAnswerArtist();
    const userAnswerSong = getUserAnswerSong();
    const userAnswerArtistDisplay = getUserAnswerArtistDispaly();
    const userAnswerSongDisplay = getUserAnswerSongDispaly();
    const userAnswerResults = `Your answer was<br>Artist: ${userAnswerArtistDisplay}<br>Song: ${userAnswerSongDisplay}`;
    console.log(`Users Answer: ${userAnswerSongDisplay} by ${userAnswerArtistDisplay}`);
    roundNum++;
    if (userAnswerArtist == correctAnswerArtist && userAnswerSong == correctAnswerSong){
        userScore++;
        userScore++;
        $('.container').empty();
        $('.container').append(
            `<div class="answerResult">
            Well Done!<br>You got it all right!<br><br>The answer was<br>${resultsArtistAndSong}<br><br>${userAnswerResults}<br><br>You get 2 point this round.
            <br><br>Current score is:<br> ${userScore}<br>
            <button type="button" name="nextSong" id ="nextSong" class="nextSong" value="next">Next Song</button>
        </div>`
        )
    }
    else if (userAnswerArtist == correctAnswerArtist  && userAnswerSong != correctAnswerSong) {
        userScore++;
        $('.container').empty();
        $('.container').append(
            `<div class="answerResult">
            Not Bad.<br>You got the artist right but missed the song.<br><br>The answer was<br>${resultsArtistAndSong}<br><br>${userAnswerResults}<br><br>You get 1 point this round.
            <br><br>Current score is:<br> ${userScore}<br>
            <button type="button" name="nextSong" id ="nextSong" class="nextSong" value="next">Next Song</button>
        </div>`
        )
    }
    else if (userAnswerArtist != correctAnswerArtist  && userAnswerSong == correctAnswerSong) {
        userScore++;
        $('.container').empty();
        $('.container').append(
            `<div class="answerResult">
            Not Bad.<br>You got the song right but missed the artist.<br><br>The answer was<br>${resultsArtistAndSong}<br><br>${userAnswerResults}<br><br>You get 1 point this round.
            <br><br>Current score is:<br> ${userScore}<br>
            <button type="button" name="nextSong" id ="nextSong" class="nextSong" value="next">Next Song</button>
        </div>`
        )
    }
    else {
        $('.container').empty();
        $('.container').append(
            `<div class="answerResult">
            Bummer! You answered incorrectly.<br><br>The answer was<br>${resultsArtistAndSong}<br><br>${userAnswerResults}<br><br>You get 0 points this round.
            <br><br>Current score is:<br> ${userScore}<br>
            <button type="button" name="nextSong" id ="nextSong" class="nextSong" value="next">Next Song</button>
            </div>`
        )
    }
    checkRoundNum(userAnswerArtist, userAnswerSong, correctAnswerArtist, correctAnswerSong, resultsArtistAndSong, genreNum);
}

//event lisener on the submit button for the user answer
function userSubmitAnswer (song, correctAnswerArtist, correctAnswerSong, correctAnswerDisplay, genreNum) {
    if (userAnswerBtn.addEventListener('click', event => {
        event.preventDefault();
        song.currentTime = 30;
        checkUserAnswer(correctAnswerArtist, correctAnswerSong, correctAnswerDisplay, genreNum);
    }));
    else if (userAnswerBtnSkip.addEventListener('click', event => {
        event.preventDefault();
        song.currentTime = 30;
        checkUserAnswer(correctAnswerArtist, correctAnswerSong, correctAnswerDisplay, genreNum);
    }));
}

//plays the song when play button clicked
function playSong(song) {
    $('.playSong').on('click', event => {
        $('.playSong').toggleClass('pauseSong');
        if(song.paused){
            song.play();
        }
        else{
            song.pause();
        }
    });
    song.onended = function() {
        $('.playSong').removeClass('pauseSong');
    }
}

//gets the preview song for the round
function getSongPreview(songObject, i) {
    const songPreview = new Audio (songObject.tracks[i].previewURL);
    return songPreview;
}

//generates a random number to use as a index for the Json Object from the API
function getRandomIndex() {
    const i = Math.floor((Math.random() * 199) + 0);
    return i;
}

//extracts all needed data from API object
function getSongInfo(songObject, genreNum) {
    const i = getRandomIndex();
    console.log(songObject);
    console.log(`Random Generated Index Number: ${i}`);
    const correctArtist = songObject.tracks[i].artistName;
    const correctSong = songObject.tracks[i].name;
    const correctAnswerDisplay = 'Artist: '+correctArtist+'<br>Song: '+correctSong;
    const correctAnswerArtist = correctArtist.toLowerCase().replace(/\s/g, '').replace(/[.,\/+#!$%?@'\^&\*;:{}=\-_`~()]/g,"");
    const correctAnswerSong = correctSong.toLowerCase().replace(/\s/g, '').replace(/[.,\/+#!$%?'\^&\*@;:{}=\-_`~()]/g,"");
    console.log(`Correct Answer: ${correctSong} by ${correctArtist}`);
    const song = getSongPreview(songObject, i);
    playSong(song);
    userSubmitAnswer(song, correctAnswerArtist, correctAnswerSong, correctAnswerDisplay, genreNum);
}

//fetches the API object
function getTrack (genreNum) {
    console.log(`Napster Genre Number: ${genreNum}`);
    let url = 'https://api.napster.com/v2.2/genres/'+genreNum+'/tracks/top?limit=200&apikey='+apiKey;
    console.log(url);
    fetch(url)
    .then(response => {
        if(!response.ok) {
            throw Error(response.statusText);
        }
        return response;
    })
    .then(response => response.json())
    .then(responseJson => getSongInfo(responseJson, genreNum))
    .catch(err => failureCallback(err))
}

//generates a random number to be plugged into the API url for the random game
function generateRandomGenreNum() {
    let num = Math.floor((Math.random() * 21) + 1);
    return num;
}

//gets the genre number from the genre API object
function getGenreId(genreObject) {
    console.log(genreObject);
    const i = generateRandomGenreNum();
    console.log(`Random Genre Index Num: ${i}`);
    const genreNum = genreObject.genres[i].id;
    gameStart(genreNum);
}

//fetches the genre API object for the random game
function getGenreNum() {
    let url = 'https://api.napster.com/v2.2/genres?apikey='+apiKey2;
    console.log(url);
    fetch(url)
    .then(response => {
        if(!response.ok) {
            throw Error(response.statusText);
        }
        return response;
    })
    .then(response => response.json())
    .then(responseJson => getGenreId(responseJson))
    .catch(err => failureCallback(err))
}

//load and initalized the selected game
function gameStart(genreNum) {
    $('.container').empty();
    $('.container').append(
        `<br>
        Current Score: ${userScore}<br>Round Number: ${roundNum}/10<br>
        <button type="button" name="play" id="playSong" class="playSong" value="play"></button>
        <a><br><br>Press play to start the song.<br></a>
        <form>
            <fieldset>
                <input type="text" name="userAnswerArtist" id="userAnswerArtist" class="userAnswer" placeholder="Enter Artist Here" required>
                <input type="text" name="userAnswerSong" id="userAnswerSong" class="userAnswer" placeholder="Enter Song Title Here" required>
                <button type="submit" name="userAnswerBtn" id="userAnswerBtn" class="userAnswerBtn" value="userAnswerBtn">Submit</button>
                <button type="submit" name="userAnswerBtn" id="userAnswerBtnSkip" class="userAnswerBtn" value="userAnswerBtnSkip">Skip</button>
            </fieldset>
        </form>
        <button type="button" name="quitGame" id="quitGame" value="quitGame" onclick="reload();">Quit Game</button>`
    );
    getTrack(genreNum);
}

//genre catagory menu with event listener
function selectGenre() {
    $('.container').empty();
    $('.container').append(
        `<h2>Choose a Genre</h2>
        <form id='genreMenu' method='post' action=''>
            <label for='genreMenu'>Select a genre.<br>Just click one to select.</label>
            <br><br><br>
                <select id="userSelectGenre" class="userSelectGenre" name='genres'>
                    <option value="">Please Select a Genre</option>
                    <option value="g.33">Alternative</option>
                    <option value="g.438">Blues</option>
                    <option value="g.470">Children</option>
                    <option value="g.75">Christian</option>
                    <option value="g.21">Classical</option>
                    <option value="g.407">Country</option>
                    <option value="g.71">Electronic</option>
                    <option value="g.446">Folk</option>
                    <option value="g.146">Hip-Hop</option>
                    <option value="g.299">Jazz</option>
                    <option value="g.510">Latin</option>
                    <option value="g.394">Metal</option>
                    <option value="g.453">New Age</option>
                    <option value="g.4">Oldies</option>
                    <option value="g.115">Pop</option>
                    <option value="g.146">Rap</option>
                    <option value="g.383">Reggae</option>
                    <option value="g.194">RnB</option>
                    <option value="g.5">Rock</option>
                    <option value="g.194">Soul</option>
                    <option value="g.246">Soundtracks</option>  
                    <option value="g.488">World</option>
                </select>
        </form>
        
        <button type="button" class="randomBtn" value="randomSongs" onclick="getGenreNum();">Roll the dice</option> 
        <button type="button" id="home" class="randomBtn" value="backToHome" onclick="start();">Back to Home</button>`
    )
    $('select').on('change', event => {
        const selectedGenre = $('select').val();
        gameStart(selectedGenre);
    });
}

//appends the contact page
function contact() {
    $('.container').empty();
    $('.container').append(
        `<h2>Email Us</h2>
        <p>We hope you are enjoying the game.  If you need help or have any sugguestions please let us know.<br>You can email us
        <a href='mailto:hello@beardystudios.com?Subject=Music%20Quiz%20Inquiry' target='_top'>here.</a><br>
        <button type="button" id="home" class="nextSong" value="backToHome" onclick="start();">Back to Home</button>`
    );
}

//appends the instructions page
function instructions() {
    $('.container').empty();
    $('.container').append(
        `<h2>Game Instructions</h2><br>
        1. Choose a catagory.<br><br>
        2. Press the play button to load the first song.  Song will play for 30 seconds.<br><br>
        3. Enter the Artist Name and Song Title into the designated input box.<br>They are not case-sensitive, but they do need to be the offical names and titles.<br><br> e.g. Artist = Billie Eilish<br>Song = Lovely (feat. Khalid)<br><i>Punctuation does not effect your answers.</i><br>To replay the song just click the play button again.<br><br>
        4. Click the submit button to enter you answer or you can skip the question if you don't know at least one of the answers.<br><br>
        5. You will be told what you got right or wrong and what your current score is.<br><br>
        6. Press the next song button to load the next song.<br><br>
        7. Repeat steps 2 thru 6 for the 10 rounds.<br><br>
        8. At the end of the 10 rounds you will be given your total score out of the possible 20 points.<br><br>
        Good luck at testing your musical knowledge!
        <button type="button" id="home" class="nextSong" value="backToHome" onclick="start();">Back to Home</button>`
        );
}

//resests the app
function start() {
    roundNum = 1;
    userScore = 0;
    $('.container').empty();
    $('.container').append(
        `<h2>Music Quiz</h2>
        <div class="home">
        <button type="button" id="homePlay" class="homeBtn" value="homePlayBtn" onclick="selectGenre();">Play Game</button>
        <button type="button" id="homeInstructions" class="homeBtn" value="homeInstructionsBtn" onclick="instructions();">Instructions</button>
        <button type="button" id="homeContact" class="homeBtn" value="homeContactBtn" onclick="contact();">Contact Us</button>
        </div>`)
}

//clears all API objects when home, quit game or game over clicked
function reload() {
    location.reload(true);
    start();
}

//calls the JS once DOM loaded
$(document).ready(function(){
    start(); 
})