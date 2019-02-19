
const apiKey ='ZTk2YjY4MjMtMDAzYy00MTg4LWE2MjYtZDIzNjJmMmM0YTdm';

function getRandomIndex() {
    let i = Math.floor((Math.random() * 200) + 1);
    return i;
}

function generateRandomGenreNum() {
    let num = Math.floor((Math.random() * 500) + 1);
    return num;
}

function gameTopStart() {
    let url = 'https://api.napster.com/v2.2/tracks/top?limit=200&apikey='+apiKey;
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

function failureCallback(errMessage) {
    $('.container').empty();
    console.log(errMessage)
    $('.container').append(
        `We are sorry but somthing went wrong.<br> ${errMessage}`)
}

function playSong(songJson) {
    console.log(songJson);
    let i = getRandomIndex();
    let preview = new Audio (songJson.tracks[i].previewURL);
    preview.play();
    const correctArtist = songJson.tracks[i].artistName;
    const correctSong = songJson.tracks[i].name;
    const correctAnswer = correctArtist.toLowerCase().replace(/\s/g, '').replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"") + correctSong.toLowerCase().replace(/\s/g, '').replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"");
    console.log(correctAnswer);
    userAnswerBtn.addEventListener('click', event => {
        checkUserAnswer(correctAnswer);
    });
}

function getUserAnswer() {
    const str = $('#userAnswer').val();
    const userInput = str.toLowerCase().replace(/\s/g, '').replace(/[.,\/#!$%?'\^&\*;:{}=\-_`~()]/g,"");
    return userInput;
}

function checkUserAnswer(correctAnswer) {
    const answer = correctAnswer;
    const userAnswer = getUserAnswer();
    console.log(userAnswer);
    if (userAnswer == answer) {
        $('.container').empty();
        $('.container').append(
            `YOU WIN`
        )
    }
    else {
        $('.container').empty();
        $('.container').append(
            `YOU LOSE`
        )
    }
}

function getTopTracks() {
    $('.container').empty();
    $('.container').append(
        `Today's Top Songs
        <div id="timer"></div>
        <button type="button" name="play" class="playSong" value="play">
        <img src="images/playButton.png" alt="playButton" class="playBtn"></button>
        <a><br><br>Press play to start song and timer.<br><br>Use the format<br>
        Artist <i>then</i> Song Title<br> for your answer.<br><br></a>
        <input type="text" name="userAnswer" id="userAnswer" placeholder="Enter Artist and Song Title here">
        <button type="button" name="userAnswerBtn" id="userAnswerBtn" value="userAnswerBtn">Submit</button>`
    
    )
    gameTopStart();
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
        getTopTracks();
      });
    document.getElementById("classicTracks").addEventListener("click", function() {
        getClassicTracks();
    });
    document.getElementById("soundTracks").addEventListener("click", function() {
        getSoundtrackTracks();
    });
    document.getElementById("RnbTracks").addEventListener("click", function() {
        getRnbTracks();
    });
    document.getElementById("randomTracks").addEventListener("click", function() {
        getRandomTracks();
    });
    
}

$(function(){
    startApp();
    
})

