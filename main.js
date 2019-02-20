'use strict';
let userScore = 0;
let roundNum = 1;
const apiKey ='ZTk2YjY4MjMtMDAzYy00MTg4LWE2MjYtZDIzNjJmMmM0YTdm';


function getRandomIndex() {
    const i = Math.floor((Math.random() * 199) + 0);
    return i;
}

function generateRandomGenreNum() {
    let num = Math.floor((Math.random() * 500) + 1);
    return num;
}

function failureCallback(errMessage) {
    $('.container').empty();
    console.log(errMessage)
    $('.container').append(
        `We are sorry but somthing went wrong.<br> ${errMessage}`)
}

function finalResults() {
    if (userScore >=7) {
        $('.container').empty();
        $('.container').append(
            `<div class="finalResults">
            Well played! You know your music.<br><br>Your total score is<br>${userScore}<br>
            <button type="button" name="gameOver" class="gameOver" value="gameOver">Game Over</button>
            </div>`
        )
    }
    else if (userScore >= 2 && userScore <= 6) {
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
            Not so hot. Maybe list to the radio more?<br><br>Your total score is<br>${userScore}<br>
            <button type="button" name="gameOver" class="gameOver" value="gameOver">Game Over</button>
            </div>`
        )
    }
    $('.container').on('click', '.gameOver', event => {
        reset();
    });
}

function checkUserAnswer(correctAnswer, correctAnswerDisplay) {
    const answer = correctAnswer;
    const resultsArtistAndSong = correctAnswerDisplay;
    const userAnswer = getUserAnswer();
    console.log(`Users Answer: ${userAnswer}`);
    roundNum++;
    if (userAnswer == answer) {
        userScore++;
        $('.container').empty();
        $('.container').append(
            `<div class="answerResult">
            Well Done!<br>The answer was<br><br>${resultsArtistAndSong}<br><br>You get 1 point this round.
            <br><br>Current score is:<br> ${userScore}<br>
            <button type="button" name="nextSong" class="nextSong" value="next">Next Song</button>
        </div>`
        )
    }
    else {
        $('.container').empty();
        $('.container').append(
            `<div class="answerResult">
            Bummer! You answered incorrectly.<br>The answer was<br><br>${resultsArtistAndSong}<br><br>You get 0 points this round.
            <br><br>Current score is:<br> ${userScore}<br>
            <button type="button" name="nextSong" class="nextSong" value="next">Next Song</button>
            </div>`
        )
    }
    if (roundNum <= 10) {
        console.log(`User Current Score: ${userScore}`);
        $('.container').on('click', '.nextSong', event => {
            getTopTracks();
        });
    }
    else if (roundNum = 11){
        if (userAnswer == answer){
            userScore++;
            $('.container').empty();
            $('.container').append(
                `<div class="answerResult">
                Well Done!<br>The answer was<br><br>${resultsArtistAndSong}<br><br>You get 1 point this round.
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

function getUserAnswer() {
    const str = $('#userAnswer').val();
    const userInput = str.toLowerCase().replace(/\s/g, '').replace(/[.,\/#!$%@?+'\^&\*;:{}=\-_`~()]/g,"");
    return userInput;
}

function userSubmitAnswer (songPreview, correctAnswer, correctAnswerDisplay) {
    userAnswerBtn.addEventListener('click', event => {
        songPreview.currentTime = 30;
        checkUserAnswer(correctAnswer, correctAnswerDisplay);
    });
}

function playSong(songPreview) {
    $('.container').on('click','#playSong', event => {
        songPreview.play();
    });
}

function getSongInfo (songJson) {
    const songObject = songJson;
    console.log(songObject);
    let i = getRandomIndex();
    console.log(`Random Generated Index Number: ${i}`);
    let correctArtist = songObject.tracks[i].artistName;
    let correctSong = songObject.tracks[i].name;
    let correctAnswerDisplay = 'Artist: '+correctArtist+'<br>Song: '+correctSong;
    let correctAnswer = correctArtist.toLowerCase().replace(/\s/g, '').replace(/[.,\/+#!$%?@'\^&\*;:{}=\-_`~()]/g,"") + correctSong.toLowerCase().replace(/\s/g, '').replace(/[.,\/+#!$%?'\^&\*@;:{}=\-_`~()]/g,"");
    console.log(`Correct Answer: ${correctAnswer}`);
    let songPreview = new Audio (songObject.tracks[i].previewURL);    
    playSong(songPreview, correctAnswer, correctAnswerDisplay);
    userSubmitAnswer(songPreview, correctAnswer, correctAnswerDisplay);
}

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
    .then(responseJson => getSongInfo(responseJson))
    .catch(err => failureCallback(err))
}

function getTopTracks() {
    $('.container').empty();
    $('.container').append(
        `<br>
        Current Score: ${userScore}<br>Round Number: ${roundNum}/10<br>
        <button type="button" name="play" id="playSong" class="playSong" value="play"></button>
        <a><br><br>Press play to start song and timer.<br><br>Use the format<br>
        Artist <i>then</i> Song Title<br> for your answer.<br><br></a>
        <input type="text" name="userAnswer" id="userAnswer" placeholder="Enter Artist and Song Title here" requiered>
        <button type="button" name="userAnswerBtn" id="userAnswerBtn" value="userAnswerBtn">Submit</button>`
    
    )
    gameTopStart();
}

function gameClassicStart() {
    let url = 'https://api.napster.com/v2.2/genres/g.4/tracks/top?limit=200&apikey='+apiKey;
    $('.container').on('click','playSong', event => {
        console.log(url);
        fetch(url)
        .then(response => {
            if(!response.ok) {
                throw Error(response.statusText);
            }
            return response;
        })
        .then(response => response.json())
        .then(responseJson => getSongInfo(responseJson))
        .catch(err => failureCallback(err))
    })
}

function getClassicTracks() {
    $('.container').empty();
    $('.container').append(
        `<br>
        Current Score: ${userScore}<br>Round Number: ${roundNum}/10<br>
        <button type="button" name="play" id="playSong" class="playSong" value="play"></button>
        <a><br><br>Press play to start song and timer.<br><br>Use the format<br>
        Artist <i>then</i> Song Title<br> for your answer.<br><br></a>
        <input type="text" name="userAnswer" id="userAnswer" placeholder="Enter Artist and Song Title here">
        <button type="button" name="userAnswerBtn" id="userAnswerBtn" value="userAnswerBtn">Submit</button>`
    )
    gameClassicStart();
}

function gameRnbStart() {
    let url = 'https://api.napster.com/v2.2/genres/g.146/tracks/top?limit=200&apikey='+apiKey;
    $('.container').on('click','playSong', event => {
        console.log(url);
        fetch(url)
        .then(response => {
            if(!response.ok) {
                throw Error(response.statusText);
            }
            return response;
        })
        .then(response => response.json())
        .then(responseJson => getSongInfo(responseJson))
        .catch(err => failureCallback(err))
    })
}

function getRnbTracks() {
    $('.container').empty();
    $('.container').append(
        `<br>
        Current Score: ${userScore}<br>Round Number: ${roundNum}/10<br>
        <button type="button" name="play" id="playSong" class="playSong" value="play"></button>
        <a><br><br>Press play to start song and timer.<br><br>Use the format<br>
        Artist <i>then</i> Song Title<br> for your answer.<br><br></a>
        <input type="text" name="userAnswer" id="userAnswer" placeholder="Enter Artist and Song Title here">
        <button type="button" name="userAnswerBtn" id="userAnswerBtn" value="userAnswerBtn">Submit</button>`
    )
    gameRnbStart();
}

function gameRandomStart() {
    let num = generateRandomGenreNum();
    console.log(num);
    let url = 'https://api.napster.com/v2.2/genres/g.'+num+'/tracks/top?limit=200&apikey='+apiKey;
    $('.container').on('click','playSong', event => {
        console.log(url);
        fetch(url)
        .then(response => {
            if(!response.ok) {
                throw Error(response.statusText);
            }
            return response;
        })
        .then(response => response.json())
        .then(responseJson => getSongInfo(responseJson))
        .catch(err => failureCallback(err))
    })
}

function getRandomTracks() {
    $('.container').empty();
    $('.container').append(
        `<br>
        Current Score: ${userScore}<br>Round Number: ${roundNum}/10<br>
        <button type="button" name="play" id="playSong" class="playSong" value="play"></button>
        <a><br><br>Press play to start song and timer.<br><br>Use the format<br>
        Artist <i>then</i> Song Title<br> for your answer.<br><br></a>
        <input type="text" name="userAnswer" id="userAnswer" placeholder="Enter Artist and Song Title here">
        <button type="button" name="userAnswerBtn" id="userAnswerBtn" value="userAnswerBtn">Submit</button>`
    )
    gameRandomStart();
}

function startApp() {
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

function instructions() {
    $('.container').empty();
    $('.container').append(
        `<h2>Game Instructions</h2><br>
        1. Choose a game play catagory.<br><br>
        2. Press the play button to load the first song.  It will play for 30 seconds.<br><br>
        3. Enter the Artisit Name and Song Title into the input box.  You have as much time as you need to do this.<br><br>
        4. Press the submit button to enter you answer.<br><br>
        5. You will be told if you got the answer right or wrong and what your current score it.<br><br>
        6. Press the next song button to load the next song.<br><br>
        7. Repeat steps 2 thru 6 for the 10 rounds.<br><br>
        8. At the end of the 10 rounds you will be given your total score.<br>
        <button type="button" id="home" class="nextSong" value="backToHome" onclick="reset();">Back to Home</button>`)
}
function reset() {
    roundNum = 1;
    userScore = 0;
    $('.container').empty();
    $('.container').append(
        `<h2>Catagories</h2>
        <div class="gameCatagory">
            <button type="button" id="topTracks" class="gameStart" value="topTracksGame">Top Songs</button>
            <button type="button" id="classicTracks" class="gameStart" value="classicSongs">Classic Songs</button>
            <button type="button" id="RnbTracks" class="gameStart" value="RnBSongs">RnB Songs</button>
            <button type="button" id="randomTracks" class="gameStart" value="randomSongs">Random Songs</button>
        </div>`)
    startApp();
}

$(function(){
    reset(); 
})

