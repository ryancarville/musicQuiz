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
    const saveJson = songJson;
    console.log(songJson);
    const i = getRandomIndex();
    console.log(i);
    const correctArtist = songJson.tracks[i].artistName;
    const correctSong = songJson.tracks[i].name;
    const correctArtistWithSong = 'Artist: '+correctArtist+'<br>Song: '+correctSong;
    const correctAnswer = correctArtist.toLowerCase().replace(/\s/g, '').replace(/[.,\/+#!$%?@'\^&\*;:{}=\-_`~()]/g,"") + correctSong.toLowerCase().replace(/\s/g, '').replace(/[.,\/+#!$%?'\^&\*@;:{}=\-_`~()]/g,"");
    console.log(`Correct Answer: ${correctAnswer}`);
    const preview = new Audio (songJson.tracks[i].previewURL);
    preview.play();
    userAnswerBtn.addEventListener('click', event => {
        preview.currentTime = 30;
        checkUserAnswer(correctAnswer, correctArtistWithSong);
        console.log(userScore);
    });
    nextSongClick(saveJson);
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

function nextSongClick(saveJson) {
    roundNum++;
    if (roundNum < 10) {
        $('.container').on('click', '.nextSong', event => {
            nextSong(saveJson);
        });
    }
    else {
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
    

}

function nextSong(saveJson) {
    $('.container').empty();
    $('.container').append(
        `<br>
        Current Score: ${userScore}<br>Round Number: ${roundNum}/10<br>
        <button type="button" name="play" id=playNextBtn class="playSong" value="play">
        <img src="images/playButton.png" alt="playButton" class="playBtn"></button>
        <a><br><br>Press play to start song and timer.<br><br>Use the format<br>
        Artist <i>then</i> Song Title<br> for your answer.<br><br></a>
        <input type="text" name="userAnswer" id="userAnswer" placeholder="Enter Artist and Song Title here">
        <button type="button" name="userAnswerBtn" id="userAnswerBtn" value="userAnswerBtn">Submit</button>`
    )
    $('.container').on('click','playNextBtn', event => {
        event.preventDefault();
        playSong(saveJson);
    })
    
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
        `<br>
        Current Score: ${userScore}<br>Round Number: ${roundNum}/10<br>
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
        `<br>
        Current Score: ${userScore}<br>Round Number: ${roundNum}/10<br>
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
        `<br>
        Current Score: ${userScore}<br>Round Number: ${roundNum}/10<br>
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
        `<br>
        Current Score: ${userScore}<br>Round Number: ${roundNum}/10<br>
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
        `<br>
        Current Score: ${userScore}<br>Round Number: ${roundNum}/10<br>
        <button type="button" name="play" class="playSong" value="play"><img src="images/playButton.png" alt="playButton" class="playBtn"></button>
        <a><br><br>Press play to start song and timer.<br><br>Use the format<br>"Artist <i>then</i> Song Title"<br> for your answer.</a>
        <input type="text" name="userAnswer" id="userAnswer" placeholder="Enter Artist and Song Title here">
        <button type="submit" name="userAnswerBtn" id="userAnswerBtn" value="userAnswerBtn">Submit</button>`
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
function reset() {
    roundNum = 1;
    userScore = 0;
    $('.container').empty();
    $('.container').append(
        `<h2>Catagories</h2>
        <div class="gameCatagory">
            <button type="button" id="topTracks" class="gameStart" value="topTracksGame">Top Songs</button>
            <button type="button" id="classicTracks" class="gameStart" value="classicSongs">Classic Songs</button>
            <button type="button" id="soundTracks" class="gameStart" value="movietracks">Sound Tracks</button>
            <button type="button" id="RnbTracks" class="gameStart" value="RnBSongs">RnB Songs</button>
            <button type="button" id="randomTracks" class="gameStart" value="randomSongs">Random Songs</button>
        </div>`)
    startApp();
}
$(function(){
    reset();
    
})

