'use strict';
//user score counter - BOTH GAMES USE THIS
let userScore = 0;
//round counter - BOTH GAMES USE THIS
let roundNum = 1;
//API authorization key - BOTH GAMES USE THIS
const apiKey ='ZTk2YjY4MjMtMDAzYy00MTg4LWE2MjYtZDIzNjJmMmM0YTdm';
const apiKey2 = 'YTkxZTRhNzAtODdlNy00ZjMzLTg0MWItOTc0NmZmNjU4Yzk4';
//global variable for album cover image - BOTH GAMES USE THIS
let albumCover = '';

//error message for catch - BOTH GAMES USE THIS
function failureCallback(errMessage) {
    $('.container').empty();
    console.log(errMessage)
    $('.container').append(
        `We are sorry but somthing went wrong.<br><br> ${errMessage}`)
}

//displays the final results for a round, different language loads dependant on the users final score - BOTH GAMES USE THIS
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

//sets the users artist answer to a variable, coverts it to lowercase and removes all non char inputs - BOTH GAMES USE THIS
function getUserAnswerArtist() {
    let userArtist = '';
    const str = $('#userAnswerArtist').val();
    if(str == ''){
        userArtist = null;
    }
    else{
        userArtist = str.toLowerCase().replace(/\s/g, '').replace(/[.,\/#!$%@?+'\^&\*;:{}=\-_`~()]/g,"");
    }
    return userArtist;
}

//sets the users song answer to a variable, coverts it to lowercase and removes all non char inputs - BOTH GAMES USE THIS
function getUserAnswerSong() {
    let userSong = '';
    const str = $('#userAnswerSong').val();
    if(str == ''){
        userSong = null;
    }
    else{
        userSong = str.toLowerCase().replace(/\s/g, '').replace(/[.,\/#!$%@?+'\^&\*;:{}=\-_`~()]/g,"");
    }
    return userSong;
}

//sets the users artist answer to a variable for displaying users inoput of reuslts page - BOTH GAMES USE THIS
function getUserAnswerArtistDispaly() {
    const userArtistResult = $('#userAnswerArtist').val();
    return userArtistResult;
}

//sets the users song answer to a variable for displaying users inoput of reuslts page - BOTH GAMES USE THIS
function getUserAnswerSongDispaly() {
    const userSongResult = $('#userAnswerSong').val();
    return userSongResult;
}

//plays the song when play button clicked - BOTH GAMES USE THIS
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


//CATAGORY GAME FUNCTIONS BELOW

//checks the round number and directs to the next song or the final results page - catagory game
function checkRoundNum(userArtistAnswer, userSongAnswer, correctArtistAnswer, correctSongAnswer, correctArtistAndSongResults, userAnswerResults, genreNum) {
    if (roundNum <= 10) {
        console.log(`User Current Score: ${userScore}`);
        $('#nextSong').off('click').on('click', event => {
            gameStart(genreNum);
        });
    }
    else{
        if (userArtistAnswer == correctArtistAnswer && userSongAnswer == correctSongAnswer){
            userScore++;
            userScore++;
            $('.container').empty();
            $('.container').append(
                `<div class="answerResult">
                Well Done!<br>You got it all right!<br><br><img src='${albumCover}' alt='albumCoverImage' class='albumCoverImg'><br><br>${correctArtistAndSongResults}<br><br>${userAnswerResults}<br><br>You get 2 points this round.
                <br><br>Current score is:<br> ${userScore}<br>
                <button type="button" name="finalResults" class="finalResultsBtn" value="finalResults">Final Results</button>
            </div>`
            )
        }
        else if (userArtistAnswer == correctArtistAnswer  && userSongAnswer != correctSongAnswer) {
            userScore++;
            $('.container').empty();
            $('.container').append(
                `<div class="answerResult">
                Not Bad.<br>You got the artist right but missed the song.<br><br><img src='${albumCover}' alt='albumCoverImage' class='albumCoverImg'><br><br>${correctArtistAndSongResults}<br><br>${userAnswerResults}<br><br>You get 1 point this round.
                <br><br>Current score is:<br> ${userScore}<br>
                <button type="button" name="finalResults" class="finalResultsBtn" value="finalResults">Final Results</button>
            </div>`
            )
        }
        else if (userArtistAnswer != correctArtistAnswer  && userSongAnswer == correctSongAnswer) {
            userScore++;
            $('.container').empty();
            $('.container').append(
                `<div class="answerResult">
                Not Bad.<br>You got the song right but missed the artist.<br><br><img src='${albumCover}' alt='albumCoverImage' class='albumCoverImg'><br><br>${correctArtistAndSongResults}<br><br>${userAnswerResults}<br><br>You get 1 point this round.
                <br><br>Current score is:<br> ${userScore}<br>
                <button type="button" name="finalResults" class="finalResultsBtn" value="finalResults">Final Results</button>
            </div>`
            )
        }
        else if(userArtistAnswer == null  && userSongAnswer == null) {
            $('.container').empty();
            $('.container').append(
                `<div class="answerResult">
                Bummer! You gave up.<br><br><img src='${albumCover}' alt='albumCoverImage' class='albumCoverImg'><br><br>${correctArtistAndSongResults}<br><br>You get 0 points this round.
                <br><br>Current score is:<br> ${userScore}<br>
                <button type="button" name="finalResults" class="finalResultsBtn" value="finalResults">Final Results</button>
                </div>`
            )
        }
        else if(userArtistAnswer != correctArtistAnswer  && userSongAnswer != correctSongAnswer) {
            $('.container').empty();
            $('.container').append(
                `<div class="answerResult">
                Bummer! You answered incorrectly.<br><br><img src='${albumCover}' alt='albumCoverImage' class='albumCoverImg'><br><br>${correctArtistAndSongResults}<br><br>${userAnswerResults}<br><br>You get 0 points this round.
                <br><br>Current score is:<br> ${userScore}<br>
                <button type="button" name="finalResults" class="finalResultsBtn" value="finalResults">Final Results</button>
                </div>`
            )
        }
        $('.finalResultsBtn').on('click', event => {
            finalResults();
        });
    }
}

//checks if the users answer matches the correct answer - catagory game
function checkUserAnswer(correctArtistAnswer, correctSongAnswer, correctAnswerDisplay, genreNum) {
    const correctArtistAndSongResults = `The answer was<br></br>${correctAnswerDisplay}`;
    const userArtistAnswer = getUserAnswerArtist();
    const userSongAnswer = getUserAnswerSong();
    const userArtistDisplayAnswer = getUserAnswerArtistDispaly();
    const userSongDisplayAnswer = getUserAnswerSongDispaly();
    const userAnswerResults = `Your answer was<br>Artist: ${userArtistDisplayAnswer}<br>Song: ${userSongDisplayAnswer}`;
    console.log(`Users Answer: ${userSongDisplayAnswer} by ${userArtistDisplayAnswer}`);
    roundNum++;
    if (userArtistAnswer == correctArtistAnswer && userSongAnswer == correctSongAnswer){
        userScore++;
        userScore++;
        $('.container').empty();
        $('.container').append(
            `<div class="answerResult">
            Well Done!<br>You got it all right!<br><br><img src='${albumCover}' alt='albumCoverImage' class='albumCoverImg'><br><br>${correctArtistAndSongResults}<br><br>${userAnswerResults}<br><br>You get 2 point this round.
            <br><br>Current score is:<br> ${userScore}<br>
            <button type="button" name="nextSong" id ="nextSong" class="nextSong" value="next">Next Song</button><br>
            <button type="button" name="quitGame" id="quitGame" value="quitGame" onclick="reload();">Quit Game</button>
        </div>`
        )
    }
    else if (userArtistAnswer == correctArtistAnswer  && userSongAnswer != correctSongAnswer) {
        userScore++;
        $('.container').empty();
        $('.container').append(
            `<div class="answerResult">
            Not Bad.<br>You got the artist right but missed the song.<br><br><img src='${albumCover}' alt='albumCoverImage' class='albumCoverImg'><br><br>${correctArtistAndSongResults}<br><br>${userAnswerResults}<br><br>You get 1 point this round.
            <br><br>Current score is:<br> ${userScore}<br>
            <button type="button" name="nextSong" id ="nextSong" class="nextSong" value="next">Next Song</button><br>
            <button type="button" name="quitGame" id="quitGame" value="quitGame" onclick="reload();">Quit Game</button>
        </div>`
        )
    }
    else if (userArtistAnswer != correctArtistAnswer  && userSongAnswer == correctSongAnswer) {
        userScore++;
        $('.container').empty();
        $('.container').append(
            `<div class="answerResult">
            Not Bad.<br>You got the song right but missed the artist.<br><br><img src='${albumCover}' alt='albumCoverImage' class='albumCoverImg'><br><br>${correctArtistAndSongResults}<br><br>${userAnswerResults}<br><br>You get 1 point this round.
            <br><br>Current score is:<br> ${userScore}<br>
            <button type="button" name="nextSong" id ="nextSong" class="nextSong" value="next">Next Song</button><br>
            <button type="button" name="quitGame" id="quitGame" value="quitGame" onclick="reload();">Quit Game</button>
        </div>`
        )
    }
    else {
        $('.container').empty();
        $('.container').append(
            `<div class="answerResult">
            Bummer! You answered incorrectly.<br><br><img src='${albumCover}' alt='albumCoverImage' class='albumCoverImg'><br><br>${correctArtistAndSongResults}<br><br>${userAnswerResults}<br><br>You get 0 points this round.
            <br><br>Current score is:<br> ${userScore}<br>
            <button type="button" name="nextSong" id ="nextSong" class="nextSong" value="next">Next Song</button><br>
            <button type="button" name="quitGame" id="quitGame" value="quitGame" onclick="reload();">Quit Game</button>
            </div>`
        )
    }
    checkRoundNum(userArtistAnswer, userSongAnswer, correctArtistAnswer, correctSongAnswer, correctArtistAndSongResults, userAnswerResults, genreNum);
}

//if user skips a round this appends the correct reulsts - catagory game
function userSkippedAnswer(correctArtistAnswer, correctSongAnswer, correctAnswerDisplay, genreNum){
    const correctArtistAndSongResults = `The answer was<br></br>${correctAnswerDisplay}`;
    const userArtistAnswer = getUserAnswerArtist();
    const userSongAnswer = getUserAnswerSong();
    const userArtistDisplayAnswer = getUserAnswerArtistDispaly();
    const userSongDisplayAnswer = getUserAnswerSongDispaly();
    const userAnswerResults = `Your answer was<br>Artist: ${userArtistDisplayAnswer}<br>Song: ${userSongDisplayAnswer}`;
    console.log(`Users Skipped Round`);
    console.log(userArtistAnswer);
    console.log(userSongAnswer);
    roundNum++;
    $('.container').empty();
    $('.container').append(
        `<div class="answerResult">
        Bummer! You gave up.<br><br><img src='${albumCover}' alt='albumCoverImage' class='albumCoverImg'><br><br>${correctArtistAndSongResults}<br><br>You get 0 points this round.
        <br><br>Current score is:<br> ${userScore}<br>
        <button type="button" name="nextSong" id ="nextSong" class="nextSong" value="next">Next Song</button><br>
        <button type="button" name="quitGame" id="quitGame" value="quitGame" onclick="reload();">Quit Game</button>
        </div>`
    )
    checkRoundNum(userArtistAnswer, userSongAnswer, correctArtistAnswer, correctSongAnswer, correctArtistAndSongResults, userAnswerResults, genreNum);
}

//event lisener on the submit button for the user answer - catagory game
function userSubmitAnswer (song, correctArtistAnswer, correctSongAnswer, correctAnswerDisplay, genreNum) {
    if (userAnswerBtn.addEventListener('click', event => {
        event.preventDefault();
        song.currentTime = 30;
        checkUserAnswer(correctArtistAnswer, correctSongAnswer, correctAnswerDisplay, genreNum);
    }));
    else if (userAnswerBtnSkip.addEventListener('click', event => {
        event.preventDefault();
        song.currentTime = 30;
        userSkippedAnswer(correctArtistAnswer, correctSongAnswer, correctAnswerDisplay, genreNum);
    }));
    
}

//final function for the album cover image - catagory game
function getAlbumCoverImageJpg(songObject) {
    albumCover = songObject.images[2].url
    console.log('Album Cover Link: '+albumCover);
}

//second function for the album cover image from different API - catagory game
function getAlbumCoverImage (songObject) {
    console.log(songObject);
    const getImageLink = songObject.albums[0].links.images.href
    const url = getImageLink+'?apikey='+apiKey2;
    console.log('Second Album Cover fetch: '+url);
    fetch(url)
    .then(response => {
        if(!response.ok) {
            throw Error(response.statusText);
        }
        return response;
    })
    .then(response => response.json())
    .then(responseJson => getAlbumCoverImageJpg(responseJson))
    .catch(err => failureCallback(err))
}

//inital function for the album cover image API - catagory game
function getAlbumCover(songObject, i) {
    const getUrl = songObject.tracks[i].links.albums.href
    const url = getUrl+'?apikey='+apiKey2;
    console.log('Intial Album Cover Fetch: '+url);
    fetch(url)
    .then(response => {
        if(!response.ok) {
            throw Error(response.statusText);
        }
        return response;
    })
    .then(response => response.json())
    .then(responseJson => getAlbumCoverImage(responseJson))
    .catch(err => failureCallback(err))
}

//gets the preview song - catagory game
function getSongPreview(songObject, i) {
    const songPreview = new Audio (songObject.tracks[i].previewURL);
    return songPreview;
}

//generates a random number to use as a index for Json Object from the API - catagory game
function getRandomIndex() {
    const i = Math.floor((Math.random() * 199) + 0);
    return i;
}

//extracts all needed data from API object - catagory game
function getSongInfo(songObject, genreNum) {
    console.log(songObject);
    const i = getRandomIndex();
    console.log(`Random Generated Index Number: ${i}`);
    const artist = songObject.tracks[i].artistName;
    const track = songObject.tracks[i].name;
    const correctArtist = artist.split('(')[0]||artist.split('[')[0];
    const correctSong = track.split('(')[0]||track.split('[')[0];
    const correctAnswerDisplay = 'Artist: '+correctArtist+'<br>Song: '+correctSong;
    console.log(`Correct Artist: ${correctArtist}`);
    console.log(`Correct Song: ${correctSong}`);
    const correctArtistAnswer = correctArtist.toLowerCase().replace(/\s/g, '').replace(/[.,\/+#!$%?@'\^&\*;:{}=\-_`~()]/g,"");
    const correctSongAnswer = correctSong.toLowerCase().replace(/\s/g, '').replace(/[.,\/+#!$%?'\^&\*@;:{}=\-_`~()]/g,"");
    console.log('Correct Answer after char uniformity is:');
    console.log(`Artist = ${correctArtistAnswer}`);
    console.log(`Song = ${correctSongAnswer}`);
    const song = getSongPreview(songObject, i);
    playSong(song);
    getAlbumCover (songObject, i);
    userSubmitAnswer(song, correctArtistAnswer, correctSongAnswer, correctAnswerDisplay, genreNum);
}

//fetches the song API object - catagory game
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

//load and initalized - catagory game
function gameStart(genreNum) {
    $('.container').empty();
    $('.container').append(
        `<br>
        Current Score: ${userScore}<br>Round Number: ${roundNum}/10<br>
        <button type="button" name="play" id="playSong" class="playSong" value="play" onload="playSong()"></button>
        <a><br><br>Press play to start the song.<br></a>
        <form autocomplete="off">
            <fieldset>
                <input type="text" name="userAnswerArtist" id="userAnswerArtist" class="userAnswer" placeholder="Enter Artist Here" required>
                <input type="text" name="userAnswerSong" id="userAnswerSong" class="userAnswer" placeholder="Enter Song Title Here" required>
                <button type="submit" name="userAnswerBtn" id="userAnswerBtn" class="userAnswerBtn" value="userAnswerBtn">Submit</button>
                <button type="submit" name="userAnswerBtn" id="userAnswerBtnSkip" class="userAnswerBtn" value="userAnswerBtnSkip">Skip</button>
            </fieldset>
        </form>`
    );
    getTrack(genreNum);
}


//ROLL THE DICE FUNCTIONS BELOW

//generates a random number to be plugged into the API url - roll the dice
function generateRandomGenreNum() {
    let num = Math.floor((Math.random() * 21) + 1);
    return num;
}

//gets the genre number from the genre API object - roll the dice
function getGenreId(genreObject) {
    console.log(genreObject);
    const i = generateRandomGenreNum();
    console.log(`Random Genre Index Num: ${i}`);
    const genreNum = genreObject.genres[i].id;
    gameStart(genreNum);
}

//fetches the genre API object - roll the dice
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


//KEYWORD GAME FUNCTIONS BELOW

//checks the round number and directs to the next song or the final results page - keyword game
function checkKeywordRoundNum(userArtistAnswer, userSongAnswer, correctArtistAnswer, correctSongAnswer, correctArtistAndSongResults, userAnswerResults, keyword) {
    if (roundNum <= 10) {
        console.log(`User Current Score: ${userScore}`);
        $('#nextSong').off('click').on('click', event => {
            loadKeywordSpace(keyword);
        });
    }
    else{
        if (userArtistAnswer == correctArtistAnswer && userSongAnswer == correctSongAnswer){
            userScore++;
            userScore++;
            $('.container').empty();
            $('.container').append(
                `<div class="answerResult">
                Well Done!<br>You got it all right!<br><br><img src='${albumCover}' alt='albumCoverImage' class='albumCoverImg'><br><br>${correctArtistAndSongResults}<br><br>${userAnswerResults}<br><br>You get 2 points this round.
                <br><br>Current score is:<br> ${userScore}<br>
                <button type="button" name="finalResults" class="finalResultsBtn" value="finalResults">Final Results</button>
            </div>`
            )
        }
        else if (userArtistAnswer == correctArtistAnswer  && userSongAnswer != correctSongAnswer) {
            userScore++;
            $('.container').empty();
            $('.container').append(
                `<div class="answerResult">
                Not Bad.<br>You got the artist right but missed the song.<br><br><img src='${albumCover}' alt='albumCoverImage' class='albumCoverImg'><br><br>${correctArtistAndSongResults}<br><br>${userAnswerResults}<br><br>You get 1 point this round.
                <br><br>Current score is:<br> ${userScore}<br>
                <button type="button" name="finalResults" class="finalResultsBtn" value="finalResults">Final Results</button>
            </div>`
            )
        }
        else if (userArtistAnswer != correctArtistAnswer  && userSongAnswer == correctSongAnswer) {
            userScore++;
            $('.container').empty();
            $('.container').append(
                `<div class="answerResult">
                Not Bad.<br>You got the song right but missed the artist.<br><br><img src='${albumCover}' alt='albumCoverImage' class='albumCoverImg'><br><br>${correctArtistAndSongResults}<br><br>${userAnswerResults}<br><br>You get 1 point this round.
                <br><br>Current score is:<br> ${userScore}<br>
                <button type="button" name="finalResults" class="finalResultsBtn" value="finalResults">Final Results</button>
            </div>`
            )
        }
        else if(userArtistAnswer == null  && userSongAnswer == null) {
            $('.container').empty();
            $('.container').append(
                `<div class="answerResult">
                Bummer! You gave up.<br><br><img src='${albumCover}' alt='albumCoverImage' class='albumCoverImg'><br><br>${correctArtistAndSongResults}<br><br>You get 0 points this round.
                <br><br>Current score is:<br> ${userScore}<br>
                <button type="button" name="finalResults" class="finalResultsBtn" value="finalResults">Final Results</button>
                </div>`
            )
        }
        else if(userArtistAnswer != correctArtistAnswer  && userSongAnswer != correctSongAnswer) {
            $('.container').empty();
            $('.container').append(
                `<div class="answerResult">
                Bummer! You answered incorrectly.<br><br><img src='${albumCover}' alt='albumCoverImage' class='albumCoverImg'><br><br>${correctArtistAndSongResults}<br><br>${userAnswerResults}<br><br>You get 0 points this round.
                <br><br>Current score is:<br> ${userScore}<br>
                <button type="button" name="finalResults" class="finalResultsBtn" value="finalResults">Final Results</button>
                </div>`
            )
        }
        $('.finalResultsBtn').on('click', event => {
            finalResults();
        });
    }
}

//checks the answers of the user - keyword game
function checkKeywordUserAnswer(correctArtistAnswer, correctSongAnswer, correctAnswerDisplay, keyword) {
    const correctArtistAndSongResults = `The answer was<br></br>${correctAnswerDisplay}`;
    const userArtistAnswer = getUserAnswerArtist();
    const userSongAnswer = getUserAnswerSong();
    const userArtistDisplayAnswer = getUserAnswerArtistDispaly();
    const userSongDisplayAnswer = getUserAnswerSongDispaly();
    const userAnswerResults = `Your answer was<br>Artist: ${userArtistDisplayAnswer}<br>Song: ${userSongDisplayAnswer}`;
    console.log(`Users Answer: ${userSongDisplayAnswer} by ${userArtistDisplayAnswer}`);
    roundNum++;
    if (userArtistAnswer == correctArtistAnswer && userSongAnswer == correctSongAnswer){
        userScore++;
        userScore++;
        $('.container').empty();
        $('.container').append(
            `<div class="answerResult">
            Well Done!<br>You got it all right!<br><br><img src='${albumCover}' alt='albumCoverImage' class='albumCoverImg'><br><br>${correctArtistAndSongResults}<br><br>${userAnswerResults}<br><br>You get 2 point this round.
            <br><br>Current score is:<br> ${userScore}<br>
            <button type="button" name="nextSong" id ="nextSong" class="nextSong" value="next">Next Song</button><br>
            <button type="button" name="quitGame" id="quitGame" value="quitGame" onclick="reload();">Quit Game</button>
        </div>`
        )
    }
    else if (userArtistAnswer == correctArtistAnswer  && userSongAnswer != correctSongAnswer) {
        userScore++;
        $('.container').empty();
        $('.container').append(
            `<div class="answerResult">
            Not Bad.<br>You got the artist right but missed the song.<br><br><img src='${albumCover}' alt='albumCoverImage' class='albumCoverImg'><br><br>${correctArtistAndSongResults}<br><br>${userAnswerResults}<br><br>You get 1 point this round.
            <br><br>Current score is:<br> ${userScore}<br>
            <button type="button" name="nextSong" id ="nextSong" class="nextSong" value="next">Next Song</button><br>
            <button type="button" name="quitGame" id="quitGame" value="quitGame" onclick="reload();">Quit Game</button>
        </div>`
        )
    }
    else if (userArtistAnswer != correctArtistAnswer  && userSongAnswer == correctSongAnswer) {
        userScore++;
        $('.container').empty();
        $('.container').append(
            `<div class="answerResult">
            Not Bad.<br>You got the song right but missed the artist.<br><br><img src='${albumCover}' alt='albumCoverImage' class='albumCoverImg'><br><br>${correctArtistAndSongResults}<br><br>${userAnswerResults}<br><br>You get 1 point this round.
            <br><br>Current score is:<br> ${userScore}<br>
            <button type="button" name="nextSong" id ="nextSong" class="nextSong" value="next">Next Song</button><br>
            <button type="button" name="quitGame" id="quitGame" value="quitGame" onclick="reload();">Quit Game</button>
        </div>`
        )
    }
    else {
        $('.container').empty();
        $('.container').append(
            `<div class="answerResult">
            Bummer! You answered incorrectly.<br><br><img src='${albumCover}' alt='albumCoverImage' class='albumCoverImg'><br><br>${correctArtistAndSongResults}<br><br>${userAnswerResults}<br><br>You get 0 points this round.
            <br><br>Current score is:<br> ${userScore}<br>
            <button type="button" name="nextSong" id ="nextSong" class="nextSong" value="next">Next Song</button><br>
            <button type="button" name="quitGame" id="quitGame" value="quitGame" onclick="reload();">Quit Game</button>
            </div>`
        )
    }
    checkKeywordRoundNum(userArtistAnswer, userSongAnswer, correctArtistAnswer, correctSongAnswer, correctArtistAndSongResults, userAnswerResults, keyword);
}

//if user skips a round this appends the correct results - keyword game
function userKeywordSkippedAnswer(correctArtistAnswer, correctSongAnswer, correctAnswerDisplay, keyword){
    const correctArtistAndSongResults = `The answer was<br></br>${correctAnswerDisplay}`;
    const userArtistAnswer = getUserAnswerArtist();
    const userSongAnswer = getUserAnswerSong();
    const userArtistDisplayAnswer = getUserAnswerArtistDispaly();
    const userSongDisplayAnswer = getUserAnswerSongDispaly();
    const userAnswerResults = `Your answer was<br>Artist: ${userArtistDisplayAnswer}<br>Song: ${userSongDisplayAnswer}`;
    console.log(`Users Skipped Round`);
    console.log(userArtistAnswer);
    console.log(userSongAnswer);
    roundNum++;
    $('.container').empty();
    $('.container').append(
        `<div class="answerResult">
        Bummer! You gave up.<br><br><img src='${albumCover}' alt='albumCoverImage' class='albumCoverImg'><br><br>${correctArtistAndSongResults}<br><br>You get 0 points this round.
        <br><br>Current score is:<br> ${userScore}<br>
        <button type="button" name="nextSong" id ="nextSong" class="nextSong" value="next">Next Song</button><br>
        <button type="button" name="quitGame" id="quitGame" value="quitGame" onclick="reload();">Quit Game</button>
        </div>`
    )
    checkKeywordRoundNum(userArtistAnswer, userSongAnswer, correctArtistAnswer, correctSongAnswer, correctArtistAndSongResults, userAnswerResults, keyword);

}

//event lisener on the submit button for the user answer - keyword game
function userKeywordSubmitAnswer (song, correctArtistAnswer, correctSongAnswer, correctAnswerDisplay, keyword) {
    if (userAnswerBtn.addEventListener('click', event => {
        event.preventDefault();
        song.currentTime = 30;
        checkKeywordUserAnswer(correctArtistAnswer, correctSongAnswer, correctAnswerDisplay, keyword);
    }));
    else if (userAnswerBtnSkip.addEventListener('click', event => {
        event.preventDefault();
        song.currentTime = 30;
        userKeywordSkippedAnswer(correctArtistAnswer, correctSongAnswer, correctAnswerDisplay, keyword);
    }));
    
}

//final function to fetch album cover image via a seperate API - keyword game
function getKeywordAlbumCoverImageJpg(songObject) {
    albumCover = songObject.images[2].url
    console.log('Album Cover Link: '+albumCover);
}

//second function to fetch album cover image via a seperate API - keyword game
function getKeywordAlbumCoverImage (songObject) {
    console.log(songObject);
    const getImageLink = songObject.albums[0].links.images.href
    const url = getImageLink+'?apikey='+apiKey2;
    console.log('Second Album Cover fetch: '+url);
    fetch(url)
    .then(response => {
        if(!response.ok) {
            throw Error(response.statusText);
        }
        return response;
    })
    .then(response => response.json())
    .then(responseJson => getKeywordAlbumCoverImageJpg(responseJson))
    .catch(err => failureCallback(err))
}

//inital function to fetch album cover image via a seperate API - keyword game
function getKeywordAlbumCover(songObject, i) {
    const getUrl = songObject.search.data.tracks[i].links.albums.href
    const url = getUrl+'?apikey='+apiKey2;
    console.log('Intial Album Cover Fetch: '+url);
    fetch(url)
    .then(response => {
        if(!response.ok) {
            throw Error(response.statusText);
        }
        return response;
    })
    .then(response => response.json())
    .then(responseJson => getKeywordAlbumCoverImage(responseJson))
    .catch(err => failureCallback(err))
}

//gets song preview track - keyword game
function getKeywordSongPreview(songObject, i) {
    const songPreview = new Audio (songObject.search.data.tracks[i].previewURL);
    return songPreview;
}

//generates a random number to use as a index for the Json Object from the API - keyword game
function getKeywordRandomIndex() {
    const i = Math.floor((Math.random() * 99) + 0);
    return i;
}

//extracts all needed data from API object - keyword game
function getKeywordSongInfo(songObject, keyword) {
    console.log(songObject);
    const i = getKeywordRandomIndex();
    console.log(`Random Generated Index Number: ${i}`);
    const artist = songObject.search.data.tracks[i].artistName;
    const track = songObject.search.data.tracks[i].name;
    const correctArtist = artist.split('(')[0]||artist.split('[')[0];
    const correctSong = track.split('(')[0]||track.split('[')[0];
    const correctAnswerDisplay = 'Artist: '+correctArtist+'<br>Song: '+correctSong;
    console.log(`Correct Artist: ${correctArtist}`);
    console.log(`Correct Song: ${correctSong}`);
    const correctArtistAnswer = correctArtist.toLowerCase().replace(/\s/g, '').replace(/[.,\/+#!$%?@'\^&\*;:{}=\-_`~()]/g,"");
    const correctSongAnswer = correctSong.toLowerCase().replace(/\s/g, '').replace(/[.,\/+#!$%?'\^&\*@;:{}=\-_`~()]/g,"");
    console.log('Correct Answer after char uniformity is:');
    console.log(`Artist = ${correctArtistAnswer}`);
    console.log(`Song = ${correctSongAnswer}`);
    const song = getKeywordSongPreview(songObject, i);
    playSong(song);
    getKeywordAlbumCover (songObject, i);
    userKeywordSubmitAnswer(song, correctArtistAnswer, correctSongAnswer, correctAnswerDisplay, keyword);
} 

//fetchs API Object - keyword game
function getKeywordTracks(keyword) {
    const url = 'https://api.napster.com/v2.2/search/verbose?apikey='+apiKey2+'&per_type_limit=100&query='+keyword+'&type=track';
    console.log(url);
    fetch(url)
    .then(response => {
        if(!response.ok) {
            throw Error(response.statusText);
        }
        return response;
    })
    .then(response => response.json())
    .then(responseJson => getKeywordSongInfo(responseJson, keyword))
    .catch(err => failureCallback(err))
}

//load interface and calls the API function - keyword game
function loadKeywordSpace(keyword) {
    const userKeyword = keyword;
    console.log('User Entered keyword: '+userKeyword);
    $('.container').empty();
    $('.container').append(
        `<br>
        Current Score: ${userScore}<br>Round Number: ${roundNum}/10<br>
        <button type="button" name="play" id="playSong" class="playSong" value="play"></button>
        <a><br><br>Press play to start the song.<br></a>
        <form autocomplete="off">
            <fieldset>
                <input type="text" name="userAnswerArtist" id="userAnswerArtist" class="userAnswer" placeholder="Enter Artist Here" required>
                <input type="text" name="userAnswerSong" id="userAnswerSong" class="userAnswer" placeholder="Enter Song Title Here" required>
                <button type="submit" name="userAnswerBtn" id="userAnswerBtn" class="userAnswerBtn" value="userAnswerBtn">Submit</button>
                <button type="submit" name="userAnswerBtn" id="userAnswerBtnSkip" class="userAnswerBtn" value="userAnswerBtnSkip">Skip</button>
            </fieldset>
        </form>`
    )
    getKeywordTracks(userKeyword);
}

//converts users keyword to proper url format and starts game - keyword game
function startSearchGame() {
    event.preventDefault();
    let keyword = $('.userEnterKeyword').val();
    keyword = keyword.toLowerCase().replace(/\s/g, '+').replace(/[.,\/+#!$%?'\^&\*@;:{}=\-_`~()]/g,"");
    loadKeywordSpace(keyword);
}

//keyword search and genre catagory menu with event listener - main function
function selectGenre() {
    $('.container').empty();
    $('.container').append(
        `<h2>Enter a Keyoword<br><i>or</i><br>Choose a Genre</h2>
        <form id='keywordSearch'>
            <fieldset>
                <label for='keywordSearch'>Enter a search term.<br>Keep in mind that when a keyword is entered it can bring back compolations.<br>So be as specific as possible.</label>
                <br><br><br>
                <input type="text" name="userEnterArtist" id="userEnterKeyword" class="userEnterKeyword" placeholder="Enter Your Keyword Here"><br>
                <button type="submit" id="keywordSearchBtn" value="keywordSearch" onclick="startSearchGame();">Search Songs</button><br>
            </fieldset>
        </form>
        <form id='genreMenu'>
            <fieldset>
                <label for='genreMenu'>Or select a catagory.</label>
                <br><br>
                <select id="userSelectGenre" class="userSelectGenre" name='genres'>
                    <option value="">Select a Decade or Genre:</option>
                    <optgroup label="Decades">
                        <option value="30s">30's</option>
                        <option value="40s">40's</option>
                        <option value="50s">50's</option>
                        <option value="60s">60's</option>
                        <option value="70s">70's</option>
                        <option value="80s">80's</option>
                        <option value="90s">90's</option>
                        <option value="00s">2000's</option>
                    </optgroup>
                    <optgroup label="Genres">
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
                    </optgroup>
                </select>
            </fieldset>
        </form>
        <button type="button" class="randomBtn" value="randomSongs" onclick="getGenreNum();">Roll the dice</button> 
        <button type="button" id="home" class="randomBtn" value="backToHome" onclick="start();">Back to Home</button>`
    )
    $('select').on('change', event => {
        let selectedGenre = $('select').val();
        if(selectedGenre.length == 3) {
            loadKeywordSpace(selectedGenre);
        }
        else{
            gameStart(selectedGenre);
        }
    });
}

//appends the contact page - main function
function contact() {
    $('.container').empty();
    $('.container').append(
        `<h2>Email Us</h2>
        <p>We hope you are enjoying the game.  If you need help or have any sugguestions please let us know.<br>You can email us
        <a href='mailto:hello@beardystudios.com?Subject=Music%20Quiz%20Inquiry' target='_top'>here.</a><br>
        <button type="button" id="home" class="nextSong" value="backToHome" onclick="start();">Back to Home</button>`
    );
}

//appends the instructions page - main function
function instructions() {
    $('.container').empty();
    $('.container').append(
        `<h2>Game Instructions</h2><br>
        1. Choose a catagory or enter a search term.<br><br>
        2. Press the play button to load the first song.  Song will play for 30 seconds.<br><br>
        3. Enter the Artist Name and Song Title into the designated input box.<br>Answers are not case-sensitive and punctuation does not effect your answers.<br>To replay the song just click the play button again.<br><br>
        4. Click the submit button to enter you answer or you can skip the question if you don't know at least one of the answers.<br><br>
        5. You will be told what you got right or wrong and what your current score is.<br><br>
        6. Press the next song button to load the next song.<br><br>
        7. Repeat steps 2 thru 6 for the 10 rounds.<br><br>
        8. At the end of the 10 rounds you will be given your total score out of the possible 20 points.<br><br>
        Good luck at testing your musical knowledge!
        <button type="button" id="home" class="nextSong" value="backToHome" onclick="start();">Back to Home</button>`
        );
}

//starts and resests the app - main function
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

//clears all API objects when home, quit game or game over clicked - main function
function reload() {
    location.reload(true);
    start();
}

//calls the JS once DOM loaded - main function
$(document).ready(function(){
    start(); 
})