'use strict';
let userScore = 0;
let roundNum = 1;
const apiKey ='ZTk2YjY4MjMtMDAzYy00MTg4LWE2MjYtZDIzNjJmMmM0YTdm';


function getRandomIndex() {
    const i = Math.floor((Math.random() * 200) + 1);
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

function playSong(songJson) {
    console.log(songJson);
    const i = getRandomIndex();
    const correctArtist = songJson.tracks[i].artistName;
    const correctSong = songJson.tracks[i].name;
    const correctArtistWithSong = 'Artist: '+correctArtist+'<br>Song: '+correctSong;
    const correctAnswer = correctArtist.toLowerCase().replace(/\s/g, '').replace(/[.,\/+#!$%?@'\^&\*;:{}=\-_`~()]/g,"") + correctSong.toLowerCase().replace(/\s/g, '').replace(/[.,\/+#!$%?'\^&\*@;:{}=\-_`~()]/g,"");
    console.log(`Correct Answer: ${correctAnswer}`);
    const preview = new Audio (songJson.tracks[i].previewURL);
    preview.play();
    roundNum++;
    userAnswerBtn.addEventListener('click', event => {
        event.preventDefault();
        preview.currentTime = 30;
        checkUserAnswer(correctAnswer, correctArtistWithSong);
    });
    nextSongClick();
}

function checkUserAnswer(correctAnswer, correctArtistWithSong) {
    const answer = correctAnswer;
    const resultsArtistAndSong = correctArtistWithSong;
    const userAnswer = getUserAnswer();
    console.log(`Users Answer: ${userAnswer}`);
    
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
}

function getUserAnswer() {
    const str = $('#userAnswer').val();
    const userInput = str.toLowerCase().replace(/\s/g, '').replace(/[.,\/#!$%@?+'\^&\*;:{}=\-_`~()]/g,"");
    return userInput;
}

function nextSongClick() {
    $('.container').on('click', '.nextSong', event => {
        event.preventDefault();
        nextSong();
    });
}

function nextSong() {
    if (roundNum <= 2){
        $('.container').empty();
        $('.container').append(
            `Today's Top Songs<br>
            Current Score: ${userScore}<br>Round Number: ${roundNum}/2<br>
            <button type="button" name="play" class="playSong" value="play">
            <img src="images/playButton.png" alt="playButton" class="playBtn"></button>
            <a><br><br>Press play to start song and timer.<br><br>Use the format<br>
            Artist <i>then</i> Song Title<br> for your answer.<br><br></a>
            <input type="text" name="userAnswer" id="userAnswer" placeholder="Enter Artist and Song Title here">
            <button type="button" name="userAnswerBtn" id="userAnswerBtn" value="userAnswerBtn">Submit</button>`
        )
        $('.container').on('click','.playSong', event => {
            gameTopStart();
        })
    }
}

function gameTopStart() {
    const url = 'https://api.napster.com/v2.2/tracks/top?limit=200&apikey='+apiKey;
    $('.container').on('click','.playSong', event => {
        console.log(url);
        fetch(url)
        .then(response => {
            if(!response.ok) {
                throw Error(response.statusText);
            }
            return response;
        })
        .then(response => response.json())
        .then(responseJson => playSong(responseJson))
        .catch(err => failureCallback(err))
    })
}



function getTopTracks() {
    $('.container').empty();
    $('.container').append(
        `Today's Top Songs<br>
        Current Score: ${userScore}<br>Round Number: ${roundNum}/2<br>
        <button type="button" name="play" class="playSong" value="play">
        <img src="images/playButton.png" alt="playButton" class="playBtn"></button>
        <a><br><br>Press play to start song and timer.<br><br>Use the format<br>
        Artist <i>then</i> Song Title<br> for your answer.<br><br></a>
        <input type="text" name="userAnswer" id="userAnswer" placeholder="Enter Artist and Song Title here">
        <button type="button" name="userAnswerBtn" id="userAnswerBtn" value="userAnswerBtn">Submit</button>`
    
    )
    gameTopStart();
}

function gameClassicStart() {
    let url = 'https://api.napster.com/v2.2/genres/g.4/tracks/top?limit=200&apikey='+apiKey;
    $('.container').on('click','.playSong', event => {
        console.log(url);
        fetch(url)
        .then(response => {
            if(!response.ok) {
                throw Error(response.statusText);
            }
            return response;
        })
        .then(response => response.json())
        .then(responseJson => playSong(responseJson))
        .catch(err => failureCallback(err))
    })
}

function getClassicTracks() {
    $('.container').empty();
    $('.container').append(
        `Classic Hits
        <div id="timer"></div>
        <button type="button" name="play" class="playSong" value="play"><img src="images/playButton.png" alt="playButton" class="playBtn"></button>
        <a><br><br>Press play to start song and timer.<br><br>Use the format<br>"Artist <i>then</i> Song Title"<br> for your answer.</a>
        <input type="text" name="userAnswer" id="userAnswer" placeholder="Enter Artist and Song Title here">
        <button type="submit" name="userAnswerBtn" id="userAnswerBtn" value="userAnswerBtn">Submit</button>`
    )
    gameClassicStart();
}

function gameSoundtrackStart() {
    let url = 'https://api.napster.com/v2.2/genres/g.246/tracks/top?limit=200&apikey='+apiKey;
    $('.container').on('click','.playSong', event => {
        console.log(url);
        fetch(url)
        .then(response => {
            if(!response.ok) {
                throw Error(response.statusText);
            }
            return response;
        })
        .then(response => response.json())
        .then(responseJson => playSong(responseJson))
        .catch(err => failureCallback(err))
    })
}

function getSoundtrackTracks() {
    $('.container').empty();
    $('.container').append(
        `Soundtracks
        <div id="timer"></div>
        <button type="button" name="play" class="playSong" value="play"><img src="images/playButton.png" alt="playButton" class="playBtn"></button>
        <a><br><br>Press play to start song and timer.<br><br>Use the format<br>"Artist <i>then</i> Song Title"<br> for your answer.</a>
        <input type="text" name="userAnswer" id="userAnswer" placeholder="Enter Artist and Song Title here">
        <button type="submit" name="userAnswerBtn" id="userAnswerBtn" value="userAnswerBtn">Submit</button>`
    )
    gameSoundtrackStart();
}

function gameRnbStart() {
    let url = 'https://api.napster.com/v2.2/genres/g.146/tracks/top?limit=200&apikey='+apiKey;
    $('.container').on('click','.playSong', event => {
        console.log(url);
        fetch(url)
        .then(response => {
            if(!response.ok) {
                throw Error(response.statusText);
            }
            return response;
        })
        .then(response => response.json())
        .then(responseJson => playSong(responseJson))
        .catch(err => failureCallback(err))
    })
}

function getRnbTracks() {
    $('.container').empty();
    $('.container').append(
        `RnB Hits
        <div id="timer"></div>
        <button type="button" name="play" class="playSong" value="play"><img src="images/playButton.png" alt="playButton" class="playBtn"></button>
        <a><br><br>Press play to start song and timer.<br><br>Use the format<br>"Artist <i>then</i> Song Title"<br> for your answer.</a>
        <input type="text" name="userAnswer" id="userAnswer" placeholder="Enter Artist and Song Title here">
        <button type="submit" name="userAnswerBtn" id="userAnswerBtn" value="userAnswerBtn">Submit</button>`
    )
    gameRnbStart();
}

function gameRandomStart() {
    let num = generateRandomGenreNum();
    console.log(num);
    let url = 'https://api.napster.com/v2.2/genres/g.'+num+'/tracks/top?limit=200&apikey='+apiKey;
    $('.container').on('click','.playSong', event => {
        console.log(url);
        fetch(url)
        .then(response => {
            if(!response.ok) {
                throw Error(response.statusText);
            }
            return response;
        })
        .then(response => response.json())
        .then(responseJson => playSong(responseJson))
        .catch(err => failureCallback(err))
    })
}

function getRandomTracks() {
    $('.container').empty();
    $('.container').append(
        `Random Songs
        <div id="timer"></div>
        <button type="button" name="play" class="playSong" value="play"><img src="images/playButton.png" alt="playButton" class="playBtn"></button>
        <a><br><br>Press play to start song and timer.<br><br>Use the format<br>"Artist <i>then</i> Song Title"<br> for your answer.</a>
        <input type="text" name="userAnswer" id="userAnswer" placeholder="Enter Artist and Song Title here">
        <button type="submit" name="userAnswerBtn" id="userAnswerBtn" value="userAnswerBtn">Submit</button>`
    )
    gameRandomStart();
}

function countdown() {
    let timeLeft = 30;
    let elem = document.getElementById('timer');
    let timerId = setInterval(countdown, 1000);
    if (timeLeft == 0) {
        clearTimeout(timerId);
        changeToProperFunction();
    } 
    else {
        elem.innerHTML = timeLeft + ' seconds remaining';
        timeLeft--;
    }
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
    document.getElementById("soundTracks").addEventListener("click", function() {
        event.preventDefault();
        getSoundtrackTracks();

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

$(function(){
    startApp();
    
})

