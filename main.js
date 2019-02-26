'use strict';
//user score counter
let userScore = 0;
//round counter
let roundNum = 1;
//API authorization key
const apiKey ='ZTk2YjY4MjMtMDAzYy00MTg4LWE2MjYtZDIzNjJmMmM0YTdm';
const apiKey2 = 'YTkxZTRhNzAtODdlNy00ZjMzLTg0MWItOTc0NmZmNjU4Yzk4';

//USED BY ALL GAMES - generates a random number to use as a index for the Json Object from the API
function getRandomIndex() {
    const i = Math.floor((Math.random() * 199) + 0);
    return i;
}

//USED BY ALL GAMES - error message for catch
function failureCallback(errMessage) {
    $('.container').empty();
    console.log(errMessage)
    $('.container').append(
        `We are sorry but somthing went wrong.<br><br> ${errMessage}`)
}

//USED BY ALL GAMES - sets the users answer to a variable, coverts it to lowercase
//and removes all non char inputs
function getUserAnswerArtist() {
    const artistStr = $('#userAnswerArtist').val();
    const userArtist = artistStr.toLowerCase().replace(/\s/g, '').replace(/[.,\/#!$%@?+'\^&\*;:{}=\-_`~()]/g,"");
    return userArtist;
}

function getUserAnswerSong() {
    const songStr = $('#userAnswerSong').val();
    const userSong = songStr.toLowerCase().replace(/\s/g, '').replace(/[.,\/#!$%@?+'\^&\*;:{}=\-_`~()]/g,"");
    return userSong;
}

//USED BY ALL GAMES - plays the song when play button clicked
function playSong(song) {
    $('.container').on('click', '.playSong', event => {
        $('button.playSong').toggleClass('pauseSong');
        if(song.paused){
            song.play();
        }
        else{
            song.pause();
        }
    });
    song.onended = function() {
        $('button.playSong').removeClass('pauseSong');
    }
    
}

//USED BY ALL GAMES - gets the preview song for the round
function getSongPreview(songObject, i) {
    const songPreview = new Audio (songObject.tracks[i].previewURL);
    return songPreview;
}

//USED BY ALL GAMES - displays the final results for a round, different pages
//load dependant on the users final score
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


//Top Hits functions section start

//checks the round number and directs to the next song or the final results
function checkTopRoundNum(userAnswerArtist, userAnswerSong, correctAnswerArtist, correctAnswerSong, resultsArtistAndSong) {
    if (roundNum <= 10) {
        console.log(`User Current Score: ${userScore}`);
        $('.container').off('click').on('click', '#nextSong', event => {
            getTopTracks();
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

//checks if the users answer matches the correct answer
function checkUserTopAnswer(correctAnswerArtist, correctAnswerSong, correctAnswerDisplay) {
    const resultsArtistAndSong = correctAnswerDisplay;
    const userAnswerArtist = getUserAnswerArtist();
    const userAnswerSong = getUserAnswerSong();
    console.log(`Users Answer: ${userAnswerSong} by ${userAnswerArtist}`);
    roundNum++;
    if (userAnswerArtist == correctAnswerArtist && userAnswerSong == correctAnswerSong){
        userScore++;
        userScore++;
        $('.container').empty();
        $('.container').append(
            `<div class="answerResult">
            Well Done!<br>You got it all right!<br>The answer was<br><br>${resultsArtistAndSong}<br><br>You get 2 point this round.
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
            Not Bad.<br>You got the artist right but missed the song.<br>The answer was<br><br>${resultsArtistAndSong}<br><br>You get 1 point this round.
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
            Not Bad.<br>You got the song right but missed the artist.<br>The answer was<br><br>${resultsArtistAndSong}<br><br>You get 1 point this round.
            <br><br>Current score is:<br> ${userScore}<br>
            <button type="button" name="nextSong" id ="nextSong" class="nextSong" value="next">Next Song</button>
        </div>`
        )
    }
    else {
        $('.container').empty();
        $('.container').append(
            `<div class="answerResult">
            Bummer! You answered incorrectly.<br>The answer was<br><br>${resultsArtistAndSong}<br><br>You get 0 points this round.
            <br><br>Current score is:<br> ${userScore}<br>
            <button type="button" name="nextSong" id ="nextSong" class="nextSong" value="next">Next Song</button>
            </div>`
        )
    }
    checkTopRoundNum(userAnswerArtist, userAnswerSong, correctAnswerArtist, correctAnswerSong, resultsArtistAndSong);
}

//event lisener for the submit button for the user answer
function userSubmitTopAnswer (song, correctAnswerArtist, correctAnswerSong, correctAnswerDisplay) {
    if (userAnswerBtn.addEventListener('click', event => {
        event.preventDefault();
        song.currentTime = 30;
        checkUserClassicAnswer(correctAnswerArtist, correctAnswerSong, correctAnswerDisplay);
    }));
    else if (userAnswerBtnSkip.addEventListener('click', event => {
        event.preventDefault();
        song.currentTime = 30;
        checkUserClassicAnswer(correctAnswerArtist, correctAnswerSong, correctAnswerDisplay);
    }));
}

//extracts all needed data from the top hits game Json API object
function getTopSongInfo(songObject) {
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
    userSubmitTopAnswer(song, correctAnswerArtist, correctAnswerSong, correctAnswerDisplay);
}

//gets the API object for top hits
function gameTopStart() {
    const url = 'https://api.napster.com/v2.2/tracks/top?limit=200&apikey='+apiKey;
    console.log(url);
    fetch(url)
    .then(response => {
        if(!response.ok) {
            throw Error(response.statusText);
        }
        return response;
    })
    .then(response => response.json())
    .then(responseJson => getTopSongInfo(responseJson))
    .catch(err => failureCallback(err))
}

//appends the user interface for the top hits game
function getTopTracks() {
    $('.container').empty();
    $('.container').append(
        `<br>
        Current Score: ${userScore}<br>Round Number: ${roundNum}/10<br>
        <button type="button" name="playSong" id="playSong" class="playSong" value="play"></button>
        <a><br><br>Press play to start the song.<br></a>
        <form>
            <fieldset>
                <input type="text" name="userAnswerArtist" id="userAnswerArtist" class="userAnswer" placeholder="Enter Artist Here" requierd>
                <input type="text" name="userAnswerSong" id="userAnswerSong" class="userAnswer" placeholder="Enter Song Title Here" requierd>
                <button type="submit" name="userAnswerBtn" id="userAnswerBtn" class="userAnswerBtn" value="userAnswerBtn">Submit</button>
                <button type="submit" name="userAnswerBtn" id="userAnswerBtnSkip" class="userAnswerBtn" value="userAnswerBtnSkip">Skip</button>
            </fieldset>
        </form>
        <button type="button" name="quitGame" id="quitGame" value="quitGame" onclick="reload();">Quit Game</button>`
    );
        gameTopStart();
}


//Classic Hits functions section start

//checks the classic hits game round number and directs to the next song or the final results
function checkClassicRoundNum(userAnswerArtist, userAnswerSong, correctAnswerArtist, correctAnswerSong, resultsArtistAndSong) {
    if (roundNum <= 10) {
        console.log(`User Current Score: ${userScore}`);
        $('.container').off('click').on('click', '#nextSong', event => {
            getClassicTracks();
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

//checks if the users classic hits game answer matches the correct answer
function checkUserClassicAnswer(correctAnswerArtist, correctAnswerSong, correctAnswerDisplay) {
    const resultsArtistAndSong = correctAnswerDisplay;
    const userAnswerArtist = getUserAnswerArtist();
    const userAnswerSong = getUserAnswerSong();
    console.log(`Users Answer: ${userAnswerSong} by ${userAnswerArtist}`);
    roundNum++;
    if (userAnswerArtist == correctAnswerArtist && userAnswerSong == correctAnswerSong){
        userScore++;
        userScore++;
        $('.container').empty();
        $('.container').append(
            `<div class="answerResult">
            Well Done!<br>You got it all right!<br>The answer was<br><br>${resultsArtistAndSong}<br><br>You get 2 point this round.
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
            Not Bad.<br>You got the artist right but missed the song.<br>The answer was<br><br>${resultsArtistAndSong}<br><br>You get 1 point this round.
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
            Not Bad.<br>You got the song right but missed the artist.<br>The answer was<br><br>${resultsArtistAndSong}<br><br>You get 1 point this round.
            <br><br>Current score is:<br> ${userScore}<br>
            <button type="button" name="nextSong" id ="nextSong" class="nextSong" value="next">Next Song</button>
        </div>`
        )
    }
    else {
        $('.container').empty();
        $('.container').append(
            `<div class="answerResult">
            Bummer! You answered incorrectly.<br>The answer was<br><br>${resultsArtistAndSong}<br><br>You get 0 points this round.
            <br><br>Current score is:<br> ${userScore}<br>
            <button type="button" name="nextSong" id ="nextSong" class="nextSong" value="next">Next Song</button>
            </div>`
        )
    }
    checkClassicRoundNum(userAnswerArtist, userAnswerSong, correctAnswerArtist, correctAnswerSong, resultsArtistAndSong);
}

//event lisener for the classic hits game submit button for the user answer
function userSubmitClassicAnswer (song, correctAnswerArtist, correctAnswerSong, correctAnswerDisplay) {
    if (userAnswerBtn.addEventListener('click', event => {
        event.preventDefault();
        song.currentTime = 30;
        checkUserClassicAnswer(correctAnswerArtist, correctAnswerSong, correctAnswerDisplay);
    }));
    else if (userAnswerBtnSkip.addEventListener('click', event => {
        event.preventDefault();
        song.currentTime = 30;
        checkUserClassicAnswer(correctAnswerArtist, correctAnswerSong, correctAnswerDisplay);
    }));
}

//extracts all needed data from the classic hits game Json API object
function getClassicSongInfo(songObject) {
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
    userSubmitClassicAnswer(song, correctAnswerArtist, correctAnswerSong, correctAnswerDisplay);
}

//gets the API object for classic hits
function gameClassicStart() {
    const url = 'https://api.napster.com/v2.2/genres/g.4/tracks/top?limit=200&apikey='+apiKey;
    console.log(url);
    fetch(url)
    .then(response => {
        if(!response.ok) {
            throw Error(response.statusText);
        }
        return response;
    })
    .then(response => response.json())
    .then(responseJson => getClassicSongInfo(responseJson))
    .catch(err => failureCallback(err))
}

//appends the user interface for the classic hits game
function getClassicTracks() {
    $('.container').empty();
    $('.container').append(
        `<br>
        Current Score: ${userScore}<br>Round Number: ${roundNum}/10<br>
        <button type="button" name="play" id="playSong" class="playSong" value="play"></button>
        <a><br><br>Press play to start the song.<br></a>
        <form>
            <fieldset>
                <input type="text" name="userAnswerArtist" id="userAnswerArtist" class="userAnswer" placeholder="Enter Artist Here" requierd>
                <input type="text" name="userAnswerSong" id="userAnswerSong" class="userAnswer" placeholder="Enter Song Title Here" requierd>
                <button type="submit" name="userAnswerBtn" id="userAnswerBtn" class="userAnswerBtn" value="userAnswerBtn">Submit</button>
                <button type="submit" name="userAnswerBtn" id="userAnswerBtnSkip" class="userAnswerBtn" value="userAnswerBtnSkip">Skip</button>
            </fieldset>
        </form>
        <button type="button" name="quitGame" id="quitGame" value="quitGame" onclick="reload();">Quit Game</button>`
    );
    gameClassicStart();
}


//RnB Hits functions section start

//checks the rnb hits game round number and directs to the next song or the final results
function checkRnbRoundNum(userAnswerArtist, userAnswerSong, correctAnswerArtist, correctAnswerSong, resultsArtistAndSong) {
    if (roundNum <= 10) {
        console.log(`User Current Score: ${userScore}`);
        $('.container').off('click').on('click', '#nextSong', event => {
            getRnbTracks();
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


//checks if the users rnb hits game answer matches the correct answer
function checkUserRnbAnswer(correctAnswerArtist, correctAnswerSong, correctAnswerDisplay) {
    const resultsArtistAndSong = correctAnswerDisplay;
    const userAnswerArtist = getUserAnswerArtist();
    const userAnswerSong = getUserAnswerSong();
    console.log(`Users Answer: ${userAnswerSong} by ${userAnswerArtist}`);
    roundNum++;
    if (userAnswerArtist == correctAnswerArtist && userAnswerSong == correctAnswerSong){
        userScore++;
        userScore++;
        $('.container').empty();
        $('.container').append(
            `<div class="answerResult">
            Well Done!<br>You got it all right!<br>The answer was<br><br>${resultsArtistAndSong}<br><br>You get 2 point this round.
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
            Not Bad.<br>You got the artist right but missed the song.<br>The answer was<br><br>${resultsArtistAndSong}<br><br>You get 1 point this round.
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
            Not Bad.<br>You got the song right but missed the artist.<br>The answer was<br><br>${resultsArtistAndSong}<br><br>You get 1 point this round.
            <br><br>Current score is:<br> ${userScore}<br>
            <button type="button" name="nextSong" id ="nextSong" class="nextSong" value="next">Next Song</button>
        </div>`
        )
    }
    else {
        $('.container').empty();
        $('.container').append(
            `<div class="answerResult">
            Bummer! You answered incorrectly.<br>The answer was<br><br>${resultsArtistAndSong}<br><br>You get 0 points this round.
            <br><br>Current score is:<br> ${userScore}<br>
            <button type="button" name="nextSong" id ="nextSong" class="nextSong" value="next">Next Song</button>
            </div>`
        )
    }
    checkRnbRoundNum(userAnswerArtist, userAnswerSong, correctAnswerArtist, correctAnswerSong, resultsArtistAndSong);
}

//event lisener for the rnb hits game submit button for the user answer
function userSubmitRnbAnswer (song, correctAnswerArtist, correctAnswerSong, correctAnswerDisplay) {
    if (userAnswerBtn.addEventListener('click', event => {
        event.preventDefault();
        song.currentTime = 30;
        checkUserRnbAnswer(correctAnswerArtist, correctAnswerSong, correctAnswerDisplay);
    }));
    else if (userAnswerBtnSkip.addEventListener('click', event => {
        event.preventDefault();
        song.currentTime = 30;
        checkUserRnbAnswer(correctAnswerArtist, correctAnswerSong, correctAnswerDisplay);
    }));
}

//extracts all needed data from the rnb hits game Json API object
function getRnbSongInfo(songObject) {
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
    userSubmitRnbAnswer(song, correctAnswerArtist, correctAnswerSong, correctAnswerDisplay);
}

//gets the API object for rnb hits
function gameRnbStart() {
    let url = 'https://api.napster.com/v2.2/genres/g.146/tracks/top?limit=200&apikey='+apiKey;
    console.log(url);
    fetch(url)
    .then(response => {
        if(!response.ok) {
            throw Error(response.statusText);
        }
        return response;
    })
    .then(response => response.json())
    .then(responseJson => getRnbSongInfo(responseJson))
    .catch(err => failureCallback(err))
}

//appends the user interface for the rnb hits game
function getRnbTracks() {
    $('.container').empty();
    $('.container').append(
        `<br>RnB Game<br><br>
        Current Score: ${userScore}<br>Round Number: ${roundNum}/10<br>
        <button type="button" name="play" id="playSong" class="playSong" value="play"></button>
        <a><br><br>Press play to start the song.<br></a>
        <form>
            <fieldset>
                <input type="text" name="userAnswerArtist" id="userAnswerArtist" class="userAnswer" placeholder="Enter Artist Here" requierd>
                <input type="text" name="userAnswerSong" id="userAnswerSong" class="userAnswer" placeholder="Enter Song Title Here" requierd>
                <button type="submit" name="userAnswerBtn" id="userAnswerBtn" class="userAnswerBtn" value="userAnswerBtn">Submit</button>
                <button type="submit" name="userAnswerBtn" id="userAnswerBtnSkip" class="userAnswerBtn" value="userAnswerBtnSkip">Skip</button>
            </fieldset>
        </form>
        <button type="button" name="quitGame" id="quitGame" value="quitGame" onclick="reload();">Quit Game</button>`
    );
    gameRnbStart();
}


//Random Hits functions section start

//checks the random game round number and directs to the next song or the final results
function checkRandomRoundNum(userAnswerArtist, userAnswerSong, correctAnswerArtist, correctAnswerSong, resultsArtistAndSong) {
    if (roundNum <= 10) {
        console.log(`User Current Score: ${userScore}`);
        $('.container').off('click').on('click', '#nextSong', event => {
            getRandomTracks();
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

//checks if the users random game answer matches the correct answer
function checkUserRandomAnswer(correctAnswerArtist, correctAnswerSong, correctAnswerDisplay) {
    const resultsArtistAndSong = correctAnswerDisplay;
    const userAnswerArtist = getUserAnswerArtist();
    const userAnswerSong = getUserAnswerSong();
    console.log(`Users Answer: ${userAnswerSong} by ${userAnswerArtist}`);
    roundNum++;
    if (userAnswerArtist == correctAnswerArtist && userAnswerSong == correctAnswerSong){
        userScore++;
        userScore++;
        $('.container').empty();
        $('.container').append(
            `<div class="answerResult">
            Well Done!<br>You got it all right!<br>The answer was<br><br>${resultsArtistAndSong}<br><br>You get 2 point this round.
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
            Not Bad.<br>You got the artist right but missed the song.<br>The answer was<br><br>${resultsArtistAndSong}<br><br>You get 1 point this round.
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
            Not Bad.<br>You got the song right but missed the artist.<br>The answer was<br><br>${resultsArtistAndSong}<br><br>You get 1 point this round.
            <br><br>Current score is:<br> ${userScore}<br>
            <button type="button" name="nextSong" id ="nextSong" class="nextSong" value="next">Next Song</button>
        </div>`
        )
    }
    else {
        $('.container').empty();
        $('.container').append(
            `<div class="answerResult">
            Bummer! You answered incorrectly.<br>The answer was<br><br>${resultsArtistAndSong}<br><br>You get 0 points this round.
            <br><br>Current score is:<br> ${userScore}<br>
            <button type="button" name="nextSong" id ="nextSong" class="nextSong" value="next">Next Song</button>
            </div>`
        )
    }
    checkRandomRoundNum(userAnswerArtist, userAnswerSong, correctAnswerArtist, correctAnswerSong, resultsArtistAndSong);
}

//event lisener for the submit random game button for the user answer
function userSubmitRandomAnswer (song, correctAnswerArtist, correctAnswerSong, correctAnswerDisplay) {
    if (userAnswerBtn.addEventListener('click', event => {
        event.preventDefault();
        song.currentTime = 30;
        checkUserRandomAnswer(correctAnswerArtist, correctAnswerSong, correctAnswerDisplay);
    }));
    else if (userAnswerBtnSkip.addEventListener('click', event => {
        event.preventDefault();
        song.currentTime = 30;
        checkUserRandomAnswer(correctAnswerArtist, correctAnswerSong, correctAnswerDisplay);
    }));
    
}

//extracts all needed data from the random game Json API object
function getRandomSongInfo(songObject) {
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
    userSubmitRandomAnswer(song, correctAnswerArtist, correctAnswerSong, correctAnswerDisplay);
}

//gets the API object for random songs
function gameRandomStart(gerneNum) {
    console.log(`Random Generated Genre Number: ${gerneNum}`);
    let url = 'https://api.napster.com/v2.2/genres/'+gerneNum+'/tracks/top?limit=200&apikey='+apiKey;
    console.log(url);
    fetch(url)
    .then(response => {
        if(!response.ok) {
            throw Error(response.statusText);
        }
        return response;
    })
    .then(response => response.json())
    .then(responseJson => getRandomSongInfo(responseJson))
    .catch(err => failureCallback(err))
}

//generates a random number for the gerne game to be plugged into the API url
function generateRandomGenreNum() {
    let num = Math.floor((Math.random() * 21) + 1);
    return num;
}

//gets the genre number from the genre API object
function getGenreId(genreObject) {
    console.log(genreObject);
    const i = generateRandomGenreNum();
    console.log(i);
    const genreNum = genreObject.genres[i].id;
    gameRandomStart(genreNum);
}

function getGenreNum() {
    let url = 'http://api.napster.com/v2.2/genres?apikey='+apiKey2;
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
//appends the user interface for the random song game
function getRandomTracks() {
    $('.container').empty();
    $('.container').append(
        `<br>
        Current Score: ${userScore}<br>Round Number: ${roundNum}/10<br>
        <button type="button" name="play" id="playSong" class="playSong" value="play"></button>
        <a><br><br>Press play to start the song.<br></a>
        <form>
            <fieldset>
                <input type="text" name="userAnswerArtist" id="userAnswerArtist" class="userAnswer" placeholder="Enter Artist Here" requierd>
                <input type="text" name="userAnswerSong" id="userAnswerSong" class="userAnswer" placeholder="Enter Song Title Here" requierd>
                <button type="submit" name="userAnswerBtn" id="userAnswerBtn" class="userAnswerBtn" value="userAnswerBtn">Submit</button>
                <button type="submit" name="userAnswerBtn" id="userAnswerBtnSkip" class="userAnswerBtn" value="userAnswerBtnSkip">Skip</button>
            </fieldset>
        </form>
        <button type="button" name="quitGame" id="quitGame" value="quitGame" onclick="reload();">Quit Game</button>`
    );
    getGenreNum();
}


//general functions

//event listeners for the game catagories
function startCatagoryGame() {
    $('.container').empty();
    $('.container').append(
        `<h2>Catagories</h2>
        <div class="gameCatagory">
            <button type="button" id="topTracks" class="gameStart" value="topTracksGame">Top Songs</button>
            <button type="button" id="classicTracks" class="gameStart" value="classicSongs">Classic Songs</button>
            <button type="button" id="RnbTracks" class="gameStart" value="RnBSongs">RnB Songs</button>
            <button type="button" id="randomTracks" class="gameStart" value="randomSongs">Random Songs</button>
            <button type="button" id="home" class="homeBtn" value="backToHome" onclick="reset();">Back to Home</button>
        </div>`);

    document.getElementById("topTracks").addEventListener("click", function() {
        event.preventDefault();
        getTopTracks();
      });
    document.getElementById("classicTracks").addEventListener("click", function() {
        event.preventDefault();
        getClassicTracks();
    });
    
    document.getElementById("RnbTracks").addEventListener("click", function() {
        event.preventDefault();
        getRnbTracks();
    });
    document.getElementById("randomTracks").addEventListener("click", function() {
        event.preventDefault();
        getRandomTracks();
    });
}

function contact() {
    $('.container').empty();
    $('.container').append(
        `<h2>Email Us</h2>
        <p>We hope you are enjoying the game.  If you need help or have any sugguestions please let us know.<br>You can email us
        <a href='mailto:hello@beardystudios.com?Subject=Music%20Quiz%20Inquiry' target='_top'>here.</a><br>
        <button type="button" id="home" class="nextSong" value="backToHome" onclick="reset();">Back to Home</button>`
    );
}

//appends the instructions page
function instructions() {
    $('.container').empty();
    $('.container').append(
        `<h2>Game Instructions</h2><br>
        1. Choose a catagory.<br><br>
        2. Press the play button to load the first song.  Song will play for 30 seconds.<br><br>
        3. Enter the Artist Name and Song Title into the designated input box. They are not case-sensitive, but they do need to be the offical names and titles.<br>To replay the song just click the play button again.<br><br>
        4. Click the submit button to enter you answer or you can skip the question if you don't know at least one of the answers.<br><br>
        5. You will be told what you got right or wrong and what your current score is.<br><br>
        6. Press the next song button to load the next song.<br><br>
        7. Repeat steps 2 thru 6 for the 10 rounds.<br><br>
        8. At the end of the 10 rounds you will be given your total score out of the possible 20 points.
        <button type="button" id="home" class="nextSong" value="backToHome" onclick="reset();">Back to Home</button>`
        );
}

//resests the app to the start page
function reset() {
    roundNum = 1;
    userScore = 0;
    $('.container').empty();
    $('.container').append(
        `<h2>Music Quiz</h2>
        <div class="home">
        <button type="button" id="homePlay" class="homeBtn" value="homePlayBtn" onclick="startCatagoryGame();">Play Game</button>
        <button type="button" id="homeInstructions" class="homeBtn" value="homeInstructionsBtn" onclick="instructions();">Instructions</button>
        <button type="button" id="homeContact" class="homeBtn" value="homeContactBtn" onclick="contact();">Contact Us</button>
        </div>`)
    
}

function reload() {
    location.reload(true);
    reset();
}

//calls the JS once page loaded
$(function(){
    reset(); 
})