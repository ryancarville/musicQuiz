'use strict';
//user score counter - BOTH GAMES USE THIS
let userScore = 0;
//round counter - BOTH GAMES USE THIS
let roundNum = 1;
//API authorization key - BOTH GAMES USE THIS
const apiKey ='ZTk2YjY4MjMtMDAzYy00MTg4LWE2MjYtZDIzNjJmMmM0YTdm';
const apiKey2 = 'YTkxZTRhNzAtODdlNy00ZjMzLTg0MWItOTc0NmZmNjU4Yzk4';
//global variable for album cover image - BOTH GAMES USE THIS
let indexCounter = [];
let indexCallCounter = '';
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
            `<div class="answerAnimation">
            <div class="finalResults">
            Well played! You know your music.<br><br>Your total score is<br>${userScore}<br>
            <button type="button" name="gameOver" class="gameOver" value="gameOver">Game Over</button>
            </div>
            </div>`
        )
    }
    else if (userScore >= 6 && userScore <= 12) {
        $('.container').empty();
        $('.container').append(
            `<div class="answerAnimation">
            <div class="finalResults">
            Not bad, but no Grammy's for you.<br><br>Your total score is<br>${userScore}<br>
            <button type="button" name="gameOver" class="gameOver" value="gameOver">Game Over</button>
            </div>
            </div>`
        )
    }
    else {
        $('.container').empty();
        $('.container').append(
            `<div class="answerAnimation">
            <div class="finalResults">
            Not so hot. Maybe listen to the radio more?<br><br>Your total score is<br>${userScore}<br>
            <button type="button" name="gameOver" class="gameOver" value="gameOver">Game Over</button>
            </div>
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

////////////////////////////////////////////////////////////////////////////
//USER ENTRY CATAGORY GAME FUNCTIONS BELOW

//checks the round number and directs to the next song or the final results page - catagory game
function checkUserEntryRoundNum(userArtistAnswer, userSongAnswer, correctArtistAnswer, correctSongAnswer, correctArtistAndSongResults, userAnswerResults, genreNum) {
    if (roundNum <= 10) {
        console.log(`User Current Score: ${userScore}`);
        $('#nextSong').off('click').on('click', event => {
            getTrack(genreNum);
        });
    }
    else{
        if (userArtistAnswer == correctArtistAnswer && userSongAnswer == correctSongAnswer){
            userScore++;
            userScore++;
            $('.container').empty();
            $('.container').append(
                `<div class="answerAnimation">
                <div class="answerResult">
                Well Done!<br>You got it all right!<br><br><img src='${albumCover}' alt='albumCoverImage' class='albumCoverImg'><br><br>${correctArtistAndSongResults}<br><br>${userAnswerResults}<br><br>You get 2 points this round.
                <br><br>Current score is:<br> ${userScore}<br>
                <button type="button" name="finalResults" class="finalResultsBtn" value="finalResults">Final Results</button>
            </div>
            </div>`
            )
        }
        else if (userArtistAnswer == correctArtistAnswer  && userSongAnswer != correctSongAnswer) {
            userScore++;
            $('.container').empty();
            $('.container').append(
                `<div class="answerAnimation">
                <div class="answerResult">
                Not Bad.<br>You got the artist right but missed the song.<br><br><img src='${albumCover}' alt='albumCoverImage' class='albumCoverImg'><br><br>${correctArtistAndSongResults}<br><br>${userAnswerResults}<br><br>You get 1 point this round.
                <br><br>Current score is:<br> ${userScore}<br>
                <button type="button" name="finalResults" class="finalResultsBtn" value="finalResults">Final Results</button>
            </div>
            </div>`
            )
        }
        else if (userArtistAnswer != correctArtistAnswer  && userSongAnswer == correctSongAnswer) {
            userScore++;
            $('.container').empty();
            $('.container').append(
                `<div class="answerAnimation">
                <div class="answerResult">
                Not Bad.<br>You got the song right but missed the artist.<br><br><img src='${albumCover}' alt='albumCoverImage' class='albumCoverImg'><br><br>${correctArtistAndSongResults}<br><br>${userAnswerResults}<br><br>You get 1 point this round.
                <br><br>Current score is:<br> ${userScore}<br>
                <button type="button" name="finalResults" class="finalResultsBtn" value="finalResults">Final Results</button>
            </div>
            </div>`
            )
        }
        else if(userArtistAnswer == null  && userSongAnswer == null) {
            $('.container').empty();
            $('.container').append(
                `<div class="answerAnimation">
                <div class="answerResult">
                Bummer! You gave up.<br><br><img src='${albumCover}' alt='albumCoverImage' class='albumCoverImg'><br><br>${correctArtistAndSongResults}<br><br>You get 0 points this round.
                <br><br>Current score is:<br> ${userScore}<br>
                <button type="button" name="finalResults" class="finalResultsBtn" value="finalResults">Final Results</button>
                </div>
                </div>`
            )
        }
        else if(userArtistAnswer != correctArtistAnswer  && userSongAnswer != correctSongAnswer) {
            $('.container').empty();
            $('.container').append(
                `<div class="answerAnimation">
                <div class="answerResult">
                Bummer! You answered incorrectly.<br><br><img src='${albumCover}' alt='albumCoverImage' class='albumCoverImg'><br><br>${correctArtistAndSongResults}<br><br>${userAnswerResults}<br><br>You get 0 points this round.
                <br><br>Current score is:<br> ${userScore}<br>
                <button type="button" name="finalResults" class="finalResultsBtn" value="finalResults">Final Results</button>
                </div>
                </div>`
            )
        }
        $('.finalResultsBtn').on('click', event => {
            finalResults();
        });
    }
}

//checks if the users answer matches the correct answer - catagory game
function checkUserEntryAnswer(correctArtistAnswer, correctSongAnswer, correctAnswerDisplay, genreNum) {
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
            `<div class="answerAnimation">
            <div class="answerResult">
            Well Done!<br>You got it all right!<br><br><img src='${albumCover}' alt='albumCoverImage' class='albumCoverImg'><br><br>${correctArtistAndSongResults}<br><br>${userAnswerResults}<br><br>You get 2 point this round.
            <br><br>Current score is:<br> ${userScore}<br>
            <button type="button" name="nextSong" id ="nextSong" class="nextSong" value="next">Next Song</button><br>
            <button type="button" name="quitGame" id="quitGame" value="quitGame" onclick="reload();">Quit Game</button>
        </div>
        </div>`
        )
    }
    else if (userArtistAnswer == correctArtistAnswer  && userSongAnswer != correctSongAnswer) {
        userScore++;
        $('.container').empty();
        $('.container').append(
            `<div class="answerAnimation">
            <div class="answerResult">
            Not Bad.<br>You got the artist right but missed the song.<br><br><img src='${albumCover}' alt='albumCoverImage' class='albumCoverImg'><br><br>${correctArtistAndSongResults}<br><br>${userAnswerResults}<br><br>You get 1 point this round.
            <br><br>Current score is:<br> ${userScore}<br>
            <button type="button" name="nextSong" id ="nextSong" class="nextSong" value="next">Next Song</button><br>
            <button type="button" name="quitGame" id="quitGame" value="quitGame" onclick="reload();">Quit Game</button>
        </div>
        </div>`
        )
    }
    else if (userArtistAnswer != correctArtistAnswer  && userSongAnswer == correctSongAnswer) {
        userScore++;
        $('.container').empty();
        $('.container').append(
            `<div class="answerAnimation">
            <div class="answerResult">
            Not Bad.<br>You got the song right but missed the artist.<br><br><img src='${albumCover}' alt='albumCoverImage' class='albumCoverImg'><br><br>${correctArtistAndSongResults}<br><br>${userAnswerResults}<br><br>You get 1 point this round.
            <br><br>Current score is:<br> ${userScore}<br>
            <button type="button" name="nextSong" id ="nextSong" class="nextSong" value="next">Next Song</button><br>
            <button type="button" name="quitGame" id="quitGame" value="quitGame" onclick="reload();">Quit Game</button>
        </div>
        </div>`
        )
    }
    else {
        $('.container').empty();
        $('.container').append(
            `<div class="answerAnimation">
            <div class="answerResult">
            Bummer! You answered incorrectly.<br><br><img src='${albumCover}' alt='albumCoverImage' class='albumCoverImg'><br><br>${correctArtistAndSongResults}<br><br>${userAnswerResults}<br><br>You get 0 points this round.
            <br><br>Current score is:<br> ${userScore}<br>
            <button type="button" name="nextSong" id ="nextSong" class="nextSong" value="next">Next Song</button><br>
            <button type="button" name="quitGame" id="quitGame" value="quitGame" onclick="reload();">Quit Game</button>
            </div>
            </div>`
        )
    }
    checkUserEntryRoundNum(userArtistAnswer, userSongAnswer, correctArtistAnswer, correctSongAnswer, correctArtistAndSongResults, userAnswerResults, genreNum);
}

//if user skips a round this appends the correct reulsts - catagory game
function userSkippedUserEntryAnswer(correctArtistAnswer, correctSongAnswer, correctAnswerDisplay, genreNum){
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
        `<div class="answerAnimation">
        <div class="answerResult">
        Bummer! You gave up.<br><br><img src='${albumCover}' alt='albumCoverImage' class='albumCoverImg'><br><br>${correctArtistAndSongResults}<br><br>You get 0 points this round.
        <br><br>Current score is:<br> ${userScore}<br>
        <button type="button" name="nextSong" id ="nextSong" class="nextSong" value="next">Next Song</button><br>
        <button type="button" name="quitGame" id="quitGame" value="quitGame" onclick="reload();">Quit Game</button>
        </div>
        </div>`
    )
    checkUserEntryRoundNum(userArtistAnswer, userSongAnswer, correctArtistAnswer, correctSongAnswer, correctArtistAndSongResults, userAnswerResults, genreNum);
}

//load and initalized - catagory game
function gameUserEntryStart(song, correctArtistAnswer, correctSongAnswer, correctAnswerDisplay, genreNum) {
    $('.container').empty();
    $('.container').append(
        `<div class="questionAnimation">
        <br>
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
        </form>
        </div>`
    );
    playSong(song);
    if (userAnswerBtn.addEventListener('click', event => {
        event.preventDefault();
        song.currentTime = 30;
        checkUserEntryAnswer(correctArtistAnswer, correctSongAnswer, correctAnswerDisplay, genreNum);
    }));
    else if (userAnswerBtnSkip.addEventListener('click', event => {
        event.preventDefault();
        song.currentTime = 30;
        userSkippedUserEntryAnswer(correctArtistAnswer, correctSongAnswer, correctAnswerDisplay, genreNum);
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
function getRandomIndex(songObject) {
    indexCallCounter++;
    let indexCallNum = indexCounter.length+1
    console.log(indexCallNum+' :num of unique index nums');
    console.log(indexCallCounter+' :num of times index generator has been called');
    const i = Math.floor((Math.random() * songObject.tracks.length));
    if(indexCounter.includes(i)){
        getRandomIndex();
    }else{
        indexCounter.push(i);
    }
    console.log(`Current Index Number: ${i}`);
    console.log('Used index nums '+indexCounter);
    console.log(songObject);
    return i;
}

//extracts all needed data from API object - catagory game
function getUserEntrySongInfo(songObject, genreNum) {
    const i = getRandomIndex(songObject);
    const artist = songObject.tracks[i].artistName;
    const track = songObject.tracks[i].name;
    const correctArtist = artist.split('(')[0]||artist.split('[')[0];
    const correctSong = track.split('(')[0]||track.split('[')[0];
    const correctAnswerDisplay = 'Artist: '+correctArtist+'<br>Song: '+correctSong;
    const correctArtistAnswer = correctArtist.toLowerCase().replace(/\s/g, '').replace(/[.,\/+#!$%?@'\^&\*;:{}=\-_`~()]/g,"");
    const correctSongAnswer = correctSong.toLowerCase().replace(/\s/g, '').replace(/[.,\/+#!$%?'\^&\*@;:{}=\-_`~()]/g,"");
    const song = getSongPreview(songObject, i);
    console.log(`Correct Artist: ${correctArtist}`);
    console.log(`Correct Song: ${correctSong}`);
    console.log('Correct Answer after char uniformity is:');
    console.log(`Artist = ${correctArtistAnswer}`);
    console.log(`Song = ${correctSongAnswer}`);
    getAlbumCover (songObject, i);
    gameUserEntryStart(song, correctArtistAnswer, correctSongAnswer, correctAnswerDisplay, genreNum);
}

//fetches the song API object - catagory game
function getUserEntryTrack(genreNum) {
    $('.container').empty();
    $('.container').append(
        `<div class="loader"><img src="images/record.png" alt"loader">
        <p>Great choice! We are loading your quiz now.</p></div>`)
    console.log(`Napster Genre Number: ${genreNum}`);
    let url = 'https://api.napster.com/v2.2/genres/'+genreNum+'/tracks/top?limit=200&apikey='+apiKey;
    console.log('API url: '+url);
    fetch(url)
    .then(response => {
        if(!response.ok) {
            throw Error(response.statusText);
        }
        return response;
    })
    .then(response => response.json())
    .then(responseJson => getUserEntrySongInfo(responseJson, genreNum))
    .catch(err => failureCallback(err))
}

//keyword search and genre catagory menu with event listener - user entry game
function selectUserEntryGenre() {
    $('.container').empty();
    $('.container').append(
        `<div class="animation">
        <button type="button" id="homeInstructions" class="homeBtn" value="homeInstructionsBtn" onclick="instructionsEntryGame();">Instructions</button>
        <h2>Enter a Keyoword</h2>
        <form id='keywordSearch'>
            <fieldset>
                <label for='keywordSearch'></label>
                <input type="text" name="userEnterArtist" id="userEnterKeyword" class="userEnterKeyword" placeholder="Enter Your Keyword Here"><br>
                <button type="submit" id="keywordSearchBtn" value="keywordSearch" onclick="startSearchGame();">Search Songs</button><br>
            </fieldset>
        </form>
        <h2>or</h2>
        <form id='genreMenu'>
            <fieldset>
                <label for='genreMenu'>select a catagory</label>
                <br><br>
                <select id="userSelectGenre" class="userSelectGenre" name='genres'>
                    <option value="">Select a Decade or Genre:</option>
                    <optgroup label="Decades">
                        <option value="g.438,g.407,g.155,g.446,g.4,g.299">50's</option>
                        <option value="g.438,g.446,g.5,g.299">60's</option>
                        <option value="g.194,g.115,g.446,g.5">70's</option>
                        <option value="g.146,g.115,g.5,g.33">80's</option>
                        <option value="g.146,g.115,g.5,g.33">90's</option>
                        <option value="g.146,g.115,g.5,g.33">2000's</options>
                        <option value="g.146,g.115,g.5,g.33">2010's</option>
                    </optgroup>
                    <optgroup label="Genres">
                        <option value="g.33,g.28,g.72,g.129,g.154,g.201,g.203,g.204,g.219,g.239,g.241,g.314,g.315,g.393,g.397,g.320,g.428,g.1056">Alternative</option>
                        <option value="g.438,g.26,g.53,g.54,g.55,g.76,g.94,g.101,g.103,g.104,g.105,g.106,g.108,g.110,g.143,g.144,g.145,g.233,g.274,g.293,g.301,g.302">Blues</option>
                        <option value="g.470,g.2083,g.2085,g.2093,g.2096,g.2099,g.388">Children</option>
                        <option value="g.75,g.514,g.100,g.387,g.416,g.415,g.417,g.418,g.445,g.516">Christian</option>
                        <option value="g.21,g.472,g.473,g.6,g.513,g.180,g.119,g.7,g.48">Classical</option>
                        <option value="g.407,g.27,g.85,g.126,g.127,g.128,g.130,g.131,g.132,g.196,g.262,g.292,g.335,g.337,g.376">Country</option>
                        <option value="g.71,g.178,g.64,g.135,g.136,g.213,g.214,g.215,g.285,g.287,g.468,g.8222">Dance/Electronic</option>
                        <option value="g.446,g.116,g.117,g.118,g.147,g.148,g.150,g.151,g.206,g.207,g.297,g.350,g.381,g.400,g.478,g.486,g.489">Folk</option>
                        <option value="g.146,g.1027,g.16,g.38,g.448,g.173,g.174,g.175,g.249,g.250,g.309,g.365">Hip-Hop</option>
                        <option value="g.299,g.9,g.24,g.34,g.35,g.52,g.56,g.77,g.84,g.86,g.87,g.231,g.232,g.266,g.346,g.487">Jazz</option>
                        <option value="g.510,g.437,g.422,g.209,g.248,g.339,g.341,g.343,g.359,g.373,g.375,g.462,g.505,g.506,g.507,g.508,g.509,g.515">Latin</option>
                        <option value="g.394,g.133,g.134,g.141,g.142,g.183,g.184,g.185,g.186,g.282,g.312,g.457,g.465,g.187">Metal</option>
                        <option value="g.453,g.191,g.223,g.228,g.259,g.277,g.349,g.364,g.455,g.456,g.492,g.497,g.190">New Age</option>
                        <option value="g.4,g.43,g.66,g.155,g.441,g.202,g.153,g.430">Oldies</option>
                        <option value="g.290,g.463,g.10,g.115">Pop</option>
                        <option value="g.146">Rap</option>
                        <option value="g.383,g.11,g.410,g.451,g.452,g.459,g.495,g.496,g.450,g.494">Reggae</option>
                        <option value="g.194,g.36,g.57,g.58,g.93,g.216,g.253">RnB/Soul</option>
                        <option value="g.5,g.1,g.42,g.44,g.45,g.111,g.112,g.113,g.199,g.352,g.409,g.454,g.458,g.460,g.464">Rock</option>
                        <option value="g.246,g.197,g.304,g.305">Soundtracks</option>  
                        <option value="g.488,g.222,g.225,g.226,g.229,g.257,g.281,g.479,g.482,g.490,g.491">World</option>
                    </optgroup>
                </select>
            </fieldset>
        </form>
        <h2>or</h2>
        <label for="randomGenre">choose a random genre by rolling the dice</label>
        <div class="randomGenre">
        <img src="images/dice1.png" class="dice" alt="dice1" onclick="getGenreNum();">
        <img src="images/dice2.png" class="dice" alt="dice1" onclick="getGenreNum();">
        </div>
        <button type="button" id="home" class="randomBtn" value="backToHome" onclick="start();">Back to Home</button>
        </div>`
    )
    
    $('select').on('change', event => {
        let selectedGenre = $('select').val();
        getUserEntryTrack(selectedGenre); 
    });
}

////////////////////////////////////////////////////////////////////////////
//ROLL THE DICE FUNCTIONS BELOW

//generates a random number to be plugged into the API url - roll the dice
function generateRandomGenreNum(genreObject) {
    let num = Math.floor((Math.random() * genreObject.genres.length));
    return num;
}

//gets the genre number from the genre API object - roll the dice
function getGenreId(genreObject) {
    console.log(genreObject);
    const i = generateRandomGenreNum(genreObject);
    console.log(`Random Genre Index Num: ${i}`);
    const genreNum = genreObject.genres[i].links.childGenres.ids;
    getTrack(genreNum);
}

//fetches the genre API object - roll the dice
function getGenreNum() {
    $('.container').empty();
    $('.container').append(
        `<div class="loader"><img src="images/record.png" alt"loader">
        <p>Great choice! We are loading your quiz now.</p></div>`)
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

////////////////////////////////////////////////////////////////////////////
//USER ENTRY KEYWORD GAME FUNCTIONS BELOW

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
                `<div class="answerAnimation">
                <div class="answerResult">
                Well Done!<br>You got it all right!<br><br><img src='${albumCover}' alt='albumCoverImage' class='albumCoverImg'><br><br>${correctArtistAndSongResults}<br><br>${userAnswerResults}<br><br>You get 2 points this round.
                <br><br>Current score is:<br> ${userScore}<br>
                <button type="button" name="finalResults" class="finalResultsBtn" value="finalResults">Final Results</button>
            </div>
            </div>`
            )
        }
        else if (userArtistAnswer == correctArtistAnswer  && userSongAnswer != correctSongAnswer) {
            userScore++;
            $('.container').empty();
            $('.container').append(
                `<div class="answerAnimation">
                <div class="answerResult">
                Not Bad.<br>You got the artist right but missed the song.<br><br><img src='${albumCover}' alt='albumCoverImage' class='albumCoverImg'><br><br>${correctArtistAndSongResults}<br><br>${userAnswerResults}<br><br>You get 1 point this round.
                <br><br>Current score is:<br> ${userScore}<br>
                <button type="button" name="finalResults" class="finalResultsBtn" value="finalResults">Final Results</button>
            </div>
            </div>`
            )
        }
        else if (userArtistAnswer != correctArtistAnswer  && userSongAnswer == correctSongAnswer) {
            userScore++;
            $('.container').empty();
            $('.container').append(
                `<div class="answerAnimation">
                <div class="answerResult">
                Not Bad.<br>You got the song right but missed the artist.<br><br><img src='${albumCover}' alt='albumCoverImage' class='albumCoverImg'><br><br>${correctArtistAndSongResults}<br><br>${userAnswerResults}<br><br>You get 1 point this round.
                <br><br>Current score is:<br> ${userScore}<br>
                <button type="button" name="finalResults" class="finalResultsBtn" value="finalResults">Final Results</button>
            </div>
            </div>`
            )
        }
        else if(userArtistAnswer == null  && userSongAnswer == null) {
            $('.container').empty();
            $('.container').append(
                `<div class="answerAnimation">
                <div class="answerResult">
                Bummer! You gave up.<br><br><img src='${albumCover}' alt='albumCoverImage' class='albumCoverImg'><br><br>${correctArtistAndSongResults}<br><br>You get 0 points this round.
                <br><br>Current score is:<br> ${userScore}<br>
                <button type="button" name="finalResults" class="finalResultsBtn" value="finalResults">Final Results</button>
                </div>
                </div>`
            )
        }
        else if(userArtistAnswer != correctArtistAnswer  && userSongAnswer != correctSongAnswer) {
            $('.container').empty();
            $('.container').append(
                `<div class="answerAnimation">
                <div class="answerResult">
                Bummer! You answered incorrectly.<br><br><img src='${albumCover}' alt='albumCoverImage' class='albumCoverImg'><br><br>${correctArtistAndSongResults}<br><br>${userAnswerResults}<br><br>You get 0 points this round.
                <br><br>Current score is:<br> ${userScore}<br>
                <button type="button" name="finalResults" class="finalResultsBtn" value="finalResults">Final Results</button>
                </div>
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
            `<div class="answerAnimation">
            <div class="answerResult">
            Well Done!<br>You got it all right!<br><br><img src='${albumCover}' alt='albumCoverImage' class='albumCoverImg'><br><br>${correctArtistAndSongResults}<br><br>${userAnswerResults}<br><br>You get 2 point this round.
            <br><br>Current score is:<br> ${userScore}<br>
            <button type="button" name="nextSong" id ="nextSong" class="nextSong" value="next">Next Song</button><br>
            <button type="button" name="quitGame" id="quitGame" value="quitGame" onclick="reload();">Quit Game</button>
        </div>
        </div>`
        )
    }
    else if (userArtistAnswer == correctArtistAnswer  && userSongAnswer != correctSongAnswer) {
        userScore++;
        $('.container').empty();
        $('.container').append(
            `<div class="answerAnimation">
            <div class="answerResult">
            Not Bad.<br>You got the artist right but missed the song.<br><br><img src='${albumCover}' alt='albumCoverImage' class='albumCoverImg'><br><br>${correctArtistAndSongResults}<br><br>${userAnswerResults}<br><br>You get 1 point this round.
            <br><br>Current score is:<br> ${userScore}<br>
            <button type="button" name="nextSong" id ="nextSong" class="nextSong" value="next">Next Song</button><br>
            <button type="button" name="quitGame" id="quitGame" value="quitGame" onclick="reload();">Quit Game</button>
        </div>
        </div>`
        )
    }
    else if (userArtistAnswer != correctArtistAnswer  && userSongAnswer == correctSongAnswer) {
        userScore++;
        $('.container').empty();
        $('.container').append(
            `<div class="answerAnimation">
            <div class="answerResult">
            Not Bad.<br>You got the song right but missed the artist.<br><br><img src='${albumCover}' alt='albumCoverImage' class='albumCoverImg'><br><br>${correctArtistAndSongResults}<br><br>${userAnswerResults}<br><br>You get 1 point this round.
            <br><br>Current score is:<br> ${userScore}<br>
            <button type="button" name="nextSong" id ="nextSong" class="nextSong" value="next">Next Song</button><br>
            <button type="button" name="quitGame" id="quitGame" value="quitGame" onclick="reload();">Quit Game</button>
        </div>
        </div>`
        )
    }
    else {
        $('.container').empty();
        $('.container').append(
            `<div class="answerAnimation">
            <div class="answerResult">
            Bummer! You answered incorrectly.<br><br><img src='${albumCover}' alt='albumCoverImage' class='albumCoverImg'><br><br>${correctArtistAndSongResults}<br><br>${userAnswerResults}<br><br>You get 0 points this round.
            <br><br>Current score is:<br> ${userScore}<br>
            <button type="button" name="nextSong" id ="nextSong" class="nextSong" value="next">Next Song</button><br>
            <button type="button" name="quitGame" id="quitGame" value="quitGame" onclick="reload();">Quit Game</button>
            </div>
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
        `<div class="answerAnimation">
        <div class="answerResult">
        Bummer! You gave up.<br><br><img src='${albumCover}' alt='albumCoverImage' class='albumCoverImg'><br><br>${correctArtistAndSongResults}<br><br>You get 0 points this round.
        <br><br>Current score is:<br> ${userScore}<br>
        <button type="button" name="nextSong" id ="nextSong" class="nextSong" value="next">Next Song</button><br>
        <button type="button" name="quitGame" id="quitGame" value="quitGame" onclick="reload();">Quit Game</button>
        </div>
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

//generates a random number to use as a index for the Json object from the API - keyword game
function getKeywordRandomIndex(songObject) {
    indexCallCounter++;
    let indexCallNum = indexCounter.length+1
    const i = Math.floor((Math.random() * songObject.search.data.tracks.length));
    console.log(indexCallNum+' :num of unique index nums');
    console.log(indexCallCounter+' :num of times index has been called');
    console.log(i+' :current index num');
    if(indexCounter.includes(i)){
        getKeywordRandomIndex();
    }else{
        indexCounter.push(i);
    }
    console.log('Array of index nums: '+indexCounter);
    return i;
}

//extracts all needed data from API object - keyword game
function getKeywordSongInfo(songObject, keyword) {
    console.log(songObject);
    const i = getKeywordRandomIndex(songObject);
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

//fetchs API object - keyword game
function getKeywordTracks(keyword) {
    $('.container').empty();
    $('.container').append(
        `<div class="loader"><img src="images/record.png" alt"loader">
        <p>Great choice! We are loading your quiz now.</p></div>`)
    const url = 'https://api.napster.com/v2.2/search/verbose?apikey='+apiKey2+'&per_type_limit=200&query='+keyword+'&type=tracks';
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
        `<div class="questionAnimation">
        <br>
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
        </form>
        </div>`
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

//////////////////////////////////////////////////////////////////////////////////////////////////////
//MULTIPLE CHOICE GAME - KEYWORD

//checks the round number and directs to the next song or the final results page - keyword multi game
function checkMultiKeywordRoundNum(correctAnswer, userMultiAnswer, selectedGenre) {
    if (roundNum <= 10) {
        console.log(`User Current Score: ${userScore}`);
        $('#nextSong').off('click').on('click', event => {
            getMultiKeywordTrack(selectedGenre);
        });
    }
    else{
        if (userMultiAnswer == correctAnswer){
            userScore++;
            $('.container').empty();
            $('.container').append(
                `<div class="answerAnimation">
                <div class="answerResult">
                Well Done!<br>You got it all right!<br><br><img src='${albumCover}' alt='albumCoverImage' class='albumCoverImg'><br><br>${correctAnswer}<br><br>You get 1 point this round.
                <br><br>Current score is:<br> ${userScore}<br>
                <button type="button" name="finalResults" class="finalResultsBtn" value="finalResults">Final Results</button>
            </div>
            </div>`
            )
        }
        else {
            $('.container').empty();
            $('.container').append(
                `<div class="answerAnimation">
                <div class="answerResult">
                Bummer! You answered incorrectly.<br><br><img src='${albumCover}' alt='albumCoverImage' class='albumCoverImg'><br><br>${correctAnswer}<br><br>You get 0 points this round.
                <br><br>Current score is:<br> ${userScore}<br>
                <button type="button" name="finalResults" class="finalResultsBtn" value="finalResults">Final Results</button>
                </div>
                </div>`
            )
        }
        $('.finalResultsBtn').on('click', event => {
            finalMultiResults();
        });
    }
}

//checks if the users answer matches the correct answer - keyword multi game
function checkUserMultiKeywordAnswer(correctAnswer, userMultiAnswer, selectedGenre) {
    roundNum++;
    console.log(selectedGenre)
    if (userMultiAnswer == correctAnswer){
        userScore++;
        $('.container').empty();
        $('.container').append(
            `<div class="answerAnimation">
            <div class="answerResult">
            Well Done!<br>You got it all right!<br><br><img src='${albumCover}' alt='albumCoverImage' class='albumCoverImg'><br><br>${correctAnswer}<br><br>You get 1 point this round.
            <br><br>Current score is:<br> ${userScore}<br>
            <button type="button" name="nextSong" id ="nextSong" class="nextSong" value="next">Next Song</button><br>
            <button type="button" name="quitGame" id="quitGame" value="quitGame" onclick="reload();">Quit Game</button>
            </div>
            </div>`
        )
    }
    else {
        $('.container').empty();
        $('.container').append(
            `<div class="answerAnimation">
            <div class="answerResult">
            Bummer! You got it wrong.<br><br><img src='${albumCover}' alt='albumCoverImage' class='albumCoverImg'><br><br>${correctAnswer}<br><br>You get 0 points this round.
            <br><br>Current score is:<br> ${userScore}<br>
            <button type="button" name="nextSong" id ="nextSong" class="nextSong" value="next">Next Song</button><br>
            <button type="button" name="quitGame" id="quitGame" value="quitGame" onclick="reload();">Quit Game</button>
            </div>
            </div>`
        )
    }
    checkMultiKeywordRoundNum(correctAnswer, userMultiAnswer, selectedGenre)
}

//calls the interface - keyword multi game
function multiKeywordGameStart(song, correctAnswer, multiChoiceOption1, multiChoiceOption2, multiChoiceOption3, selectedGenre) {
    console.log(correctAnswer, multiChoiceOption1, multiChoiceOption2, multiChoiceOption3)
    let multiChoiceShuffle = shuffle(correctAnswer, multiChoiceOption1, multiChoiceOption2, multiChoiceOption3);
    let a = multiChoiceShuffle.splice(0, 1)
    let b = multiChoiceShuffle.splice(0, 1)
    let c = multiChoiceShuffle.splice(0, 1)
    let d = multiChoiceShuffle.splice(0, 1)
    a = a.toString()
    b = b.toString()
    c = c.toString()
    d = d.toString()
    console.log(a)
    console.log(b)
    console.log(c)
    console.log(d)

    $('.container').empty();
    $('.container').append(
        `<br>
        <div class="questionAnimation">
        Current Score: ${userScore}<br>Round Number: ${roundNum}/10<br>
        <button type="button" name="play" id="playSong" class="playSong" value="play"></button>
        <a><br><br>Press play to start the song.<br></a>
        <button type="submit" name="${a}" id="${a}" class="multiUserAnswerBtn" value="${a}">${a}</button>
        <button type="submit" name="${b}" id="${b}" class="multiUserAnswerBtn" value="${b}">${b}</button>
        <button type="submit" name="${c}" id="${c}" class="multiUserAnswerBtn" value="${c}">${c}</button>
        <button type="submit" name="${d}" id="${d}" class="multiUserAnswerBtn" value="${d}">${d}</button>
        </div>`
    )
    playSong(song);
    $(".multiUserAnswerBtn").click(function() {
        event.preventDefault();
        song.currentTime = 30;
        let userMultiAnswer = $(this).val();
        console.log(userMultiAnswer)
        checkUserMultiKeywordAnswer(correctAnswer, userMultiAnswer, selectedGenre);
    })
    
}

//gets 1st multiple choice answer - keyword multi game
function getKeywordMuliplyChoice1(songObject) {
    const i = Math.floor((Math.random() * songObject.search.data.tracks.length));
    if(indexCounter.includes(i)){
        getKeywordMuliplyChoice1(songObject);
    }else{
        indexCounter.push(i);
        const artist = songObject.search.data.tracks[i].artistName;
        const artist1 = artist.split('(')[0]||artist.split('[')[0];
        const track = songObject.search.data.tracks[i].name;
        const track1 = track.split('(')[0]||track.split('[')[0];
        const multiAnswer1 = track1+' by '+artist1;
        return multiAnswer1;
    }
    return multiAnswer1;
}

//gets 2nd multiple choice answer - keyword multi game
function getKeywordMuliplyChoice2(songObject) {
    const i = Math.floor((Math.random() * songObject.search.data.tracks.length));
    if(indexCounter.includes(i)){
        getKeywordMuliplyChoice2(songObject);
    }else{
        indexCounter.push(i);
        const artist = songObject.search.data.tracks[i].artistName;
        const artist2 = artist.split('(')[0]||artist.split('[')[0];
        const track = songObject.search.data.tracks[i].name;
        const track2 = track.split('(')[0]||track.split('[')[0];
        const multiAnswer2 = track2+' by '+artist2;
        return multiAnswer2;
    }
    return multiAnswer2;
}

//gets 3rd multiple choice answer - keyword multi game
function getKeywordMuliplyChoice3(songObject) {
    const i = Math.floor((Math.random() * songObject.search.data.tracks.length));
    if(indexCounter.includes(i)){
        getKeywordMuliplyChoice3(songObject);
    }else{
        indexCounter.push(i);
        const artist = songObject.search.data.tracks[i].artistName;
        const artist3 = artist.split('(')[0]||artist.split('[')[0];
        const track = songObject.search.data.tracks[i].name;
        const track3 = track.split('(')[0]||track.split('[')[0];
        const multiAnswer3 = track3+' by '+artist3;
        return multiAnswer3;
    }
    return multiAnswer3;
}

//gets random index num - keyword multi game
function getKeywordMultiRandomIndex(songObject) {
    indexCallCounter++;
    let indexCallNum = indexCounter.length+1
    const i = Math.floor((Math.random() * songObject.search.data.tracks.length));
    console.log(indexCallNum+' :num of unique index nums');
    console.log(indexCallCounter+' :num of times index has been called');
    console.log(i+' :current index num');
    if(indexCounter.includes(i)){
        getKeywordRandomIndex();
    }else{
        indexCounter.push(i);
    }
    console.log('Array of index nums: '+indexCounter);
    return i;
}

//extracts all needed data from API object - keyword multi game
function getMultiKeywordSongInfo(songObject, selectedGenre) {
    console.log(songObject);
    const i = getKeywordMultiRandomIndex(songObject);
    const artist = songObject.search.data.tracks[i].artistName;
    const track = songObject.search.data.tracks[i].name;
    const correctArtist = artist.split('(')[0]||artist.split('[')[0];
    const correctSong = track.split('(')[0]||track.split('[')[0];
    const correctAnswer = correctSong+' by '+correctArtist;
    console.log(`Correct Answer: ${correctAnswer}`);
    const song = getKeywordSongPreview(songObject, i);
    getKeywordAlbumCover (songObject, i);
    const multiChoiceOption1 = getKeywordMuliplyChoice1(songObject);
    const multiChoiceOption2 = getKeywordMuliplyChoice2(songObject);
    const multiChoiceOption3 = getKeywordMuliplyChoice3(songObject);
    multiKeywordGameStart(song, correctAnswer, multiChoiceOption1, multiChoiceOption2, multiChoiceOption3, selectedGenre)
} 

//fetchs API object - keyword multi game
function getMultiKeywordTrack(keyword) {
    $('.container').empty();
    $('.container').append(
        `<div class="loader"><img src="images/record.png" alt"loader">
        <p>Great choice! We are loading your quiz now.</p></div>`)
    const url = 'https://api.napster.com/v2.2/search/verbose?apikey='+apiKey2+'&per_type_limit=200&query='+keyword+'&type=tracks';
    console.log(url);
    fetch(url)
    .then(response => {
        if(!response.ok) {
            throw Error(response.statusText);
        }
        return response;
    })
    .then(response => response.json())
    .then(responseJson => getMultiKeywordSongInfo(responseJson, keyword))
    .catch(err => failureCallback(err))
}

//converts users keyword to proper url format and starts game - keyword multi game
function startMultiSearchGame() {
    event.preventDefault();
    let keyword = $('.userEnterKeyword').val();
    keyword = keyword.toLowerCase().replace(/\s/g, '+').replace(/[.,\/+#!$%?'\^&\*@;:{}=\-_`~()]/g,"");
    getMultiKeywordTrack(keyword);
}

//////////////////////////////////////////////////////////////////////////////////////////////////////
//MULTIPL CHOICE GAME

//checks the final score nd appends the approriate results - multi choice and keyword multi
function finalMultiResults() {
    if (userScore >=7) {
        $('.container').empty();
        $('.container').append(
            `<div class="answerAnimation">
            <div class="finalResults">
            Well played! You know your music.<br><br>Your total score is<br>${userScore}<br>
            <button type="button" name="gameOver" class="gameOver" value="gameOver">Game Over</button>
            </div>
            </div>`
        )
    }
    else if (userScore >= 4 && userScore <= 6) {
        $('.container').empty();
        $('.container').append(
            `<div class="answerAnimation">
            <div class="finalResults">
            Not bad, but no Grammy's for you.<br><br>Your total score is<br>${userScore}<br>
            <button type="button" name="gameOver" class="gameOver" value="gameOver">Game Over</button>
            </div>
            </div>`
        )
    }
    else {
        $('.container').empty();
        $('.container').append(
            `<div class="answerAnimation">
            <div class="finalResults">
            Not so hot. Maybe listen to the radio more?<br><br>Your total score is<br>${userScore}<br>
            <button type="button" name="gameOver" class="gameOver" value="gameOver">Game Over</button>
            </div>
            </div>`
        )
    }
    $('.container').on('click', '.gameOver', event => {
        reload();
    });
}

//checks the round number and directs to the next song or the final results page - multi choice
function checkMultiRoundNum(correctAnswer, userMultiAnswer, selectedGenre) {
    if (roundNum <= 10) {
        console.log(`User Current Score: ${userScore}`);
        $('#nextSong').off('click').on('click', event => {
            getMultiChoiceTracks(selectedGenre);
        });
    }
    else{
        if (userMultiAnswer == correctAnswer){
            userScore++;
            $('.container').empty();
            $('.container').append(
                `<div class="answerAnimation">
                <div class="answerResult">
                Well Done!<br>You got it all right!<br><br><img src='${albumCover}' alt='albumCoverImage' class='albumCoverImg'><br><br>${correctAnswer}<br><br>You get 1 point this round.
                <br><br>Current score is:<br> ${userScore}<br>
                <button type="button" name="finalResults" class="finalResultsBtn" value="finalResults">Final Results</button>
            </div>
            </div>`
            )
        }
        else {
            $('.container').empty();
            $('.container').append(
                `<div class="answerAnimation">
                <div class="answerResult">
                Bummer! You answered incorrectly.<br><br><img src='${albumCover}' alt='albumCoverImage' class='albumCoverImg'><br><br>${correctAnswer}<br><br>You get 0 points this round.
                <br><br>Current score is:<br> ${userScore}<br>
                <button type="button" name="finalResults" class="finalResultsBtn" value="finalResults">Final Results</button>
                </div>
                </div>`
            )
        }
        $('.finalResultsBtn').on('click', event => {
            finalMultiResults();
        });
    }
}

//checks if the users answer matches the correct answer - multi choice game
function checkUserMultiAnswer (correctAnswer, userMultiAnswer, selectedGenre) {
    roundNum++;
    console.log(selectedGenre)
    if (userMultiAnswer == correctAnswer){
        userScore++;
        $('.container').empty();
        $('.container').append(
            `<div class="answerAnimation">
            <div class="answerResult">
            Well Done!<br>You got it all right!<br><br><img src='${albumCover}' alt='albumCoverImage' class='albumCoverImg'><br><br>${correctAnswer}<br><br>You get 1 point this round.
            <br><br>Current score is:<br> ${userScore}<br>
            <button type="button" name="nextSong" id ="nextSong" class="nextSong" value="next">Next Song</button><br>
            <button type="button" name="quitGame" id="quitGame" value="quitGame" onclick="reload();">Quit Game</button>
        </div>`
        )
    }
    else {
        $('.container').empty();
        $('.container').append(
            `<div class="answerAnimation">
            <div class="answerResult">
            Bummer! You got it wrong.<br><br><img src='${albumCover}' alt='albumCoverImage' class='albumCoverImg'><br><br>${correctAnswer}<br><br>You get 0 points this round.
            <br><br>Current score is:<br> ${userScore}<br>
            <button type="button" name="nextSong" id ="nextSong" class="nextSong" value="next">Next Song</button><br>
            <button type="button" name="quitGame" id="quitGame" value="quitGame" onclick="reload();">Quit Game</button>
        </div>
        </div>`
        )
    }
    checkMultiRoundNum(correctAnswer, userMultiAnswer, selectedGenre)
}

//loads multi choice interface - multi choice
function multiGameStart(song, correctAnswer, multiChoiceOption1, multiChoiceOption2, multiChoiceOption3, selectedGenre) {
    console.log(correctAnswer, multiChoiceOption1, multiChoiceOption2, multiChoiceOption3)
    let multiChoiceShuffle = shuffle(correctAnswer, multiChoiceOption1, multiChoiceOption2, multiChoiceOption3);
    let a = multiChoiceShuffle.splice(0, 1)
    let b = multiChoiceShuffle.splice(0, 1)
    let c = multiChoiceShuffle.splice(0, 1)
    let d = multiChoiceShuffle.splice(0, 1)
    a = a.toString()
    b = b.toString()
    c = c.toString()
    d = d.toString()
    console.log(a)
    console.log(b)
    console.log(c)
    console.log(d)

    $('.container').empty();
    $('.container').append(
        `<div class="questionAnimation">
        <br>
        Current Score: ${userScore}<br>Round Number: ${roundNum}/10<br>
        <button type="button" name="play" id="playSong" class="playSong" value="play"></button>
        <a><br><br>Press play to start the song.<br></a>
        <button type="submit" name="${a}" id="${a}" class="multiUserAnswerBtn" value="${a}">${a}</button>
        <button type="submit" name="${b}" id="${b}" class="multiUserAnswerBtn" value="${b}">${b}</button>
        <button type="submit" name="${c}" id="${c}" class="multiUserAnswerBtn" value="${c}">${c}</button>
        <button type="submit" name="${d}" id="${d}" class="multiUserAnswerBtn" value="${d}">${d}</button>
        </div>`
    )
    playSong(song);
    $(".multiUserAnswerBtn").click(function() {
        event.preventDefault();
        song.currentTime = 30;
        let userMultiAnswer = $(this).val();
        console.log(userMultiAnswer)
        checkUserMultiAnswer(correctAnswer, userMultiAnswer, selectedGenre);
    })
    
}

//shuffels the 4 multiple choices answers - multi choice and keyword multi
function shuffle(correctAnswer, multiChoiceOption1, multiChoiceOption2, multiChoiceOption3) {
    let multiAnswersArr = [correctAnswer, multiChoiceOption1, multiChoiceOption2, multiChoiceOption3]    
    let currentIndex = multiAnswersArr.length;
    let temporaryValue, randomIndex;
        // While there remain elements to shuffle...
        while (0 !== currentIndex) {
            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
    
            // And swap it with the current element.
            temporaryValue = multiAnswersArr[currentIndex];
            multiAnswersArr[currentIndex] = multiAnswersArr[randomIndex];
            multiAnswersArr[randomIndex] = temporaryValue;
        }
        return multiAnswersArr;
    
}

//gets 1st multiple choice answer - multi choice game
function getDummyMuliplyChoice1(songObject) {
    const i = Math.floor((Math.random() * songObject.tracks.length));
    while(true) {
        if(indexCounter.includes(i)){
            getDummyMuliplyChoice1(songObject);
        }else{
            indexCounter.push(i);
            const artist = songObject.tracks[i].artistName;
            const artist1 = artist.split('(')[0]||artist.split('[')[0];
            const track = songObject.tracks[i].name;
            const track1 = track.split('(')[0]||track.split('[')[0];
            const multiAnswer1 = track1+' by '+artist1;
            return multiAnswer1;
        }
        return multiAnswer1
    }   
    
}

//gets 2nd multiple choice answer - multi choice game
function getDummyMuliplyChoice2(songObject) {
    const i = Math.floor((Math.random() * songObject.tracks.length));
    while(true){
        if(indexCounter.includes(i)){
            getDummyMuliplyChoice1(songObject);
        }else{
            indexCounter.push(i);
            const artist = songObject.tracks[i].artistName;
            const artist2 = artist.split('(')[0]||artist.split('[')[0];
            const track = songObject.tracks[i].name;
            const track2 = track.split('(')[0]||track.split('[')[0];
            const multiAnswer2 = track2+' by '+artist2;
            return multiAnswer2;
        }
        return multiAnswer2
    }
}

//gets 3rd multiple choice answer - multi choice game
function getDummyMuliplyChoice3(songObject) {
    const i = Math.floor((Math.random() * songObject.tracks.length));
    while(true) {
        if(indexCounter.includes(i)){
            getDummyMuliplyChoice3(songObject);
        }else{
            indexCounter.push(i);
            const artist = songObject.tracks[i].artistName;
            const artist3 = artist.split('(')[0]||artist.split('[')[0];
            const track = songObject.tracks[i].name;
            const track3 = track.split('(')[0]||track.split('[')[0];
            const multiAnswer3 = track3+' by '+artist3;
            return multiAnswer3;
        }
        return multiAnswer3
    }
}

//gets song info - multi choice game
function getMultiChoiceSongInfo(songObject, selectedGenre) {
    console.log(songObject);
    const i = getRandomIndex(songObject);
    const artist = songObject.tracks[i].artistName;
    const track = songObject.tracks[i].name;
    const correctArtist = artist.split('(')[0]||artist.split('[')[0];
    const correctSong = track.split('(')[0]||track.split('[')[0];
    const correctAnswer = correctSong+' by '+correctArtist;
    console.log(`Correct Answer: ${correctAnswer}`);
    const song = getSongPreview(songObject, i);
    getAlbumCover (songObject, i);
    const multiChoiceOption1 = getDummyMuliplyChoice1(songObject)
    const multiChoiceOption2 = getDummyMuliplyChoice2(songObject)
    const multiChoiceOption3 = getDummyMuliplyChoice3(songObject)
    multiGameStart(song, correctAnswer, multiChoiceOption1, multiChoiceOption2, multiChoiceOption3, selectedGenre)

}

//fetchs API object - multi choice game
function getMultiChoiceTracks(selectedGenre) {
    $('.container').empty();
    $('.container').append(
        `<div class="loader"><img src="images/record.png" alt"loader">
        <p>Great choice! We are loading your quiz now.</p></div>`)
    console.log(`Napster Genre Number: ${selectedGenre}`);
    let url = 'https://api.napster.com/v2.2/genres/'+selectedGenre+'/tracks/top?limit=200&apikey='+apiKey;
    console.log('API url: '+url);
    fetch(url)
    .then(response => {
        if(!response.ok) {
            throw Error(response.statusText);
        }
        return response;
    })
    .then(response => response.json())
    .then(responseJson => getMultiChoiceSongInfo(responseJson, selectedGenre))
    .catch(err => failureCallback(err))
}

//loads keyword and select genre interface - multi choice and keyword multi
function selectMultiChoiceGenre() {
    $('.container').empty();
    $('.container').append(
        `<div class="animation">
        <button type="button" id="homeInstructions" class="homeBtn" value="homeInstructionsBtn" onclick="instructionsMultiGame();">Instructions</button>
        <h2>Enter a Keyoword</h2>
        <form id='keywordSearch'>
            <fieldset>
                <label for='keywordSearch'></label>
                <input type="text" name="userEnterArtist" id="userEnterKeyword" class="userEnterKeyword" placeholder="Enter Your Keyword Here"><br>
                <button type="submit" id="keywordSearchBtn" value="keywordSearch" onclick="startMultiSearchGame();">Search Songs</button><br>
            </fieldset>
        </form>
        <h2>or</h2>
        <form id='genreMenu'>
            <fieldset>
                <label for='genreMenu'>select a catagory</label>
                <br><br>
                <select id="userSelectGenre" class="userSelectGenre" name='genres'>
                    <option value="">Select a Decade or Genre:</option>
                    <optgroup label="Decades">
                        <option value="g.438,g.407,g.155,g.446,g.4,g.299">50's</option>
                        <option value="g.438,g.446,g.5,g.299">60's</option>
                        <option value="g.194,g.115,g.446,g.5">70's</option>
                        <option value="g.146,g.115,g.5,g.33">80's</option>
                        <option value="g.146,g.115,g.5,g.33">90's</option>
                        <option value="g.146,g.115,g.5,g.33">2000's</options>
                        <option value="g.146,g.115,g.5,g.33">2010's</option>
                    </optgroup>
                    <optgroup label="Genres">
                        <option value="g.33,g.28,g.72,g.129,g.154,g.201,g.203,g.204,g.219,g.239,g.241,g.314,g.315,g.393,g.397,g.320,g.428,g.1056">Alternative</option>
                        <option value="g.438,g.26,g.53,g.54,g.55,g.76,g.94,g.101,g.103,g.104,g.105,g.106,g.108,g.110,g.143,g.144,g.145,g.233,g.274,g.293,g.301,g.302">Blues</option>
                        <option value="g.470,g.2083,g.2085,g.2093,g.2096,g.2099,g.388">Children</option>
                        <option value="g.75,g.514,g.100,g.387,g.416,g.415,g.417,g.418,g.445,g.516">Christian</option>
                        <option value="g.21,g.472,g.473,g.6,g.513,g.180,g.119,g.7,g.48">Classical</option>
                        <option value="g.407,g.27,g.85,g.126,g.127,g.128,g.130,g.131,g.132,g.196,g.262,g.292,g.335,g.337,g.376">Country</option>
                        <option value="g.71,g.178,g.64,g.135,g.136,g.213,g.214,g.215,g.285,g.287,g.468,g.8222">Dance/Electronic</option>
                        <option value="g.446,g.116,g.117,g.118,g.147,g.148,g.150,g.151,g.206,g.207,g.297,g.350,g.381,g.400,g.478,g.486,g.489">Folk</option>
                        <option value="g.146,g.1027,g.16,g.38,g.448,g.173,g.174,g.175,g.249,g.250,g.309,g.365">Hip-Hop</option>
                        <option value="g.299,g.9,g.24,g.34,g.35,g.52,g.56,g.77,g.84,g.86,g.87,g.231,g.232,g.266,g.346,g.487">Jazz</option>
                        <option value="g.510,g.437,g.422,g.209,g.248,g.339,g.341,g.343,g.359,g.373,g.375,g.462,g.505,g.506,g.507,g.508,g.509,g.515">Latin</option>
                        <option value="g.394,g.133,g.134,g.141,g.142,g.183,g.184,g.185,g.186,g.282,g.312,g.457,g.465,g.187">Metal</option>
                        <option value="g.453,g.191,g.223,g.228,g.259,g.277,g.349,g.364,g.455,g.456,g.492,g.497,g.190">New Age</option>
                        <option value="g.4,g.43,g.66,g.155,g.441,g.202,g.153,g.430">Oldies</option>
                        <option value="g.290,g.463,g.10,g.115">Pop</option>
                        <option value="g.146">Rap</option>
                        <option value="g.383,g.11,g.410,g.451,g.452,g.459,g.495,g.496,g.450,g.494">Reggae</option>
                        <option value="g.194,g.36,g.57,g.58,g.93,g.216,g.253">RnB/Soul</option>
                        <option value="g.5,g.1,g.42,g.44,g.45,g.111,g.112,g.113,g.199,g.352,g.409,g.454,g.458,g.460,g.464">Rock</option>
                        <option value="g.246,g.197,g.304,g.305">Soundtracks</option>  
                        <option value="g.488,g.222,g.225,g.226,g.229,g.257,g.281,g.479,g.482,g.490,g.491">World</option>
                    </optgroup>
                </select>
            </fieldset>
        </form>
        <h2>or</h2>
        <label for="randomGenre">choose a random genre by rolling the dice</label>
        <div class="randomGenre">
        <img src="images/dice1.png" class="dice" alt="dice1" onclick="getMultiGenreNum();">
        <img src="images/dice2.png" class="dice" alt="dice1" onclick="getMultiGenreNum();">
        </div>
        <button type="button" id="home" class="randomBtn" value="backToHome" onclick="start();">Back to Home</button>
        </div>`
    )
    $('select').on('change', event => {
        let selectedGenre = $('select').val();
        getMultiChoiceTracks(selectedGenre);
    })
        
}

//////////////////////////////////////////////////////////////////////////////////
//RANDOM GENERE FUNTIONS FOR MULTI
//generates random genres for multi choice game - roll the dice multi choice game
function generateMultiRandomGenreNum(genreObject) {
    let num = Math.floor((Math.random() * genreObject.genres.length));
    return num;
}

//gets the genre number from the genre API object - roll the dice multi choice game
function getMultiGenreId(genreObject) {
    console.log(genreObject);
    const i = generateMultiRandomGenreNum(genreObject);
    console.log(`Random Genre Index Num: ${i}`);
    const genreNum = genreObject.genres[i].links.childGenres.ids;
    getMultiChoiceTracks(genreNum);
}

//fetches the genre API object - roll the dice multi choice game
function getMultiGenreNum() {
    $('.container').empty();
    $('.container').append(
        `<div class="loader"><img src="images/record.png" alt"loader">
        <p>Great choice! We are loading your quiz now.</p></div>`)
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
    .then(responseJson => getMultiGenreId(responseJson))
    .catch(err => failureCallback(err))
}

/////////////////////////////////////////////////////////////////////////////////
//QUIZ MASTER FUNTIONS

//loads game play interface - quiz master game
function quizMasterGameStart(song, correctAnswer, selectedGenre) {
    console.log(correctAnswer)
    $('.container').empty();
    $('.container').append(
        `<div class="questionAnimation">
        <br>
        Current Score: ${userScore}<br>Round Number: ${roundNum}<br>
        <button type="button" name="play" id="playSong" class="playSong" value="play"></button>
        <a><br><br>Press play to start the song.<br></a><br>
        <a><br><br>The correct answer is<br></a>
        <div class="quizMasterAnswer">${correctAnswer}</div>
        <button type="button" name="addPoint" id ="addPoint" class="addPoint" value="addPoint">Add point and go to next song</button>
        <button type="button" name="nextSong" id ="nextSong" class="nextSong" value="next">Next Song</button>
        <button type="button" name="quitGame" id="quitGame" value="quitGame" onclick="reload();">Quit Game</button>
        </div>`
    )
    playSong(song);
    $('#addPoint').off('click').on('click', event => {
        event.preventDefault();
        userScore++
        roundNum++
        song.currentTime = 30;
        getQuizMasterTracks(selectedGenre);
    });
    $('#nextSong').off('click').on('click', event => {
        event.preventDefault();
        roundNum++
        song.currentTime = 30;
        getQuizMasterTracks(selectedGenre);
    });
}

//get all needed info from song - quiz master game
function getQuizMasterInfo(songObject, selectedGenre) {
    console.log(songObject);
    const i = getRandomIndex(songObject);
    const artist = songObject.tracks[i].artistName;
    const track = songObject.tracks[i].name;
    const correctArtist = artist.split('(')[0]||artist.split('[')[0];
    const correctSong = track.split('(')[0]||track.split('[')[0];
    const correctAnswer = correctSong+' by '+correctArtist;
    console.log(`Correct Answer: ${correctAnswer}`);
    const song = getSongPreview(songObject, i);
    getAlbumCover (songObject, i);
    quizMasterGameStart(song, correctAnswer, selectedGenre)
}

//gets song API object - quiz master game
function getQuizMasterTracks(selectedGenre) {
    $('.container').empty();
    $('.container').append(
        `<div class="loader"><img src="images/record.png" alt"loader">
        <p>Great choice! We are loading your quiz now.</p></div>`)
    console.log(`Napster Genre Number: ${selectedGenre}`);
    let url = 'https://api.napster.com/v2.2/genres/'+selectedGenre+'/tracks/top?limit=200&apikey='+apiKey;
    console.log('API url: '+url);
    fetch(url)
    .then(response => {
        if(!response.ok) {
            throw Error(response.statusText);
        }
        return response;
    })
    .then(response => response.json())
    .then(responseJson => getQuizMasterInfo(responseJson, selectedGenre))
    .catch(err => failureCallback(err))
}

//loads keyword and select genre interface - quiz master game
function selectQuizMasterGenre() {
    $('.container').empty();
    $('.container').append(
        `<div class="animation">
        <h1>Quiz Master</h1>
        <button type="button" id="homeInstructions" class="homeBtn" value="homeInstructionsBtn" onclick="instructionsQuizMasterGame();">Instructions</button>
        <h2>Enter a Keyoword</h2>
        <form id='keywordSearch'>
            <fieldset>
                <label for='keywordSearch'></label>
                <input type="text" name="userEnterArtist" id="userEnterKeyword" class="userEnterKeyword" placeholder="Enter Your Keyword Here"><br>
                <button type="submit" id="keywordSearchBtn" value="keywordSearch" onclick="startMultiSearchGame();">Search Songs</button><br>
            </fieldset>
        </form>
        <h2>or</h2>
        <form id='genreMenu'>
            <fieldset>
                <label for='genreMenu'>select a catagory</label>
                <br><br>
                <select id="userSelectGenre" class="userSelectGenre" name='genres'>
                    <option value="">Select a Decade or Genre:</option>
                    <optgroup label="Decades">
                        <option value="g.438,g.407,g.155,g.446,g.4,g.299">50's</option>
                        <option value="g.438,g.446,g.5,g.299">60's</option>
                        <option value="g.194,g.115,g.446,g.5">70's</option>
                        <option value="g.146,g.115,g.5,g.33">80's</option>
                        <option value="g.146,g.115,g.5,g.33">90's</option>
                        <option value="g.146,g.115,g.5,g.33">2000's</options>
                        <option value="g.146,g.115,g.5,g.33">2010's</option>
                    </optgroup>
                    <optgroup label="Genres">
                        <option value="g.33,g.28,g.72,g.129,g.154,g.201,g.203,g.204,g.219,g.239,g.241,g.314,g.315,g.393,g.397,g.320,g.428,g.1056">Alternative</option>
                        <option value="g.438,g.26,g.53,g.54,g.55,g.76,g.94,g.101,g.103,g.104,g.105,g.106,g.108,g.110,g.143,g.144,g.145,g.233,g.274,g.293,g.301,g.302">Blues</option>
                        <option value="g.470,g.2083,g.2085,g.2093,g.2096,g.2099,g.388">Children</option>
                        <option value="g.75,g.514,g.100,g.387,g.416,g.415,g.417,g.418,g.445,g.516">Christian</option>
                        <option value="g.21,g.472,g.473,g.6,g.513,g.180,g.119,g.7,g.48">Classical</option>
                        <option value="g.407,g.27,g.85,g.126,g.127,g.128,g.130,g.131,g.132,g.196,g.262,g.292,g.335,g.337,g.376">Country</option>
                        <option value="g.71,g.178,g.64,g.135,g.136,g.213,g.214,g.215,g.285,g.287,g.468,g.8222">Dance/Electronic</option>
                        <option value="g.446,g.116,g.117,g.118,g.147,g.148,g.150,g.151,g.206,g.207,g.297,g.350,g.381,g.400,g.478,g.486,g.489">Folk</option>
                        <option value="g.146,g.1027,g.16,g.38,g.448,g.173,g.174,g.175,g.249,g.250,g.309,g.365">Hip-Hop</option>
                        <option value="g.299,g.9,g.24,g.34,g.35,g.52,g.56,g.77,g.84,g.86,g.87,g.231,g.232,g.266,g.346,g.487">Jazz</option>
                        <option value="g.510,g.437,g.422,g.209,g.248,g.339,g.341,g.343,g.359,g.373,g.375,g.462,g.505,g.506,g.507,g.508,g.509,g.515">Latin</option>
                        <option value="g.394,g.133,g.134,g.141,g.142,g.183,g.184,g.185,g.186,g.282,g.312,g.457,g.465,g.187">Metal</option>
                        <option value="g.453,g.191,g.223,g.228,g.259,g.277,g.349,g.364,g.455,g.456,g.492,g.497,g.190">New Age</option>
                        <option value="g.4,g.43,g.66,g.155,g.441,g.202,g.153,g.430">Oldies</option>
                        <option value="g.290,g.463,g.10,g.115">Pop</option>
                        <option value="g.146">Rap</option>
                        <option value="g.383,g.11,g.410,g.451,g.452,g.459,g.495,g.496,g.450,g.494">Reggae</option>
                        <option value="g.194,g.36,g.57,g.58,g.93,g.216,g.253">RnB/Soul</option>
                        <option value="g.5,g.1,g.42,g.44,g.45,g.111,g.112,g.113,g.199,g.352,g.409,g.454,g.458,g.460,g.464">Rock</option>
                        <option value="g.246,g.197,g.304,g.305">Soundtracks</option>  
                        <option value="g.488,g.222,g.225,g.226,g.229,g.257,g.281,g.479,g.482,g.490,g.491">World</option>
                    </optgroup>
                </select>
            </fieldset>
        </form>
        <h2>or</h2>
        <label for="randomGenre">choose a random genre by rolling the dice</label>
        <div class="randomGenre">
        <img src="images/dice1.png" class="dice" alt="dice1" onclick="getMultiGenreNum();">
        <img src="images/dice2.png" class="dice" alt="dice1" onclick="getMultiGenreNum();">
        </div>
        <button type="button" id="home" class="randomBtn" value="backToHome" onclick="start();">Back to Home</button>
        </div>`
    )
    $('select').on('change', event => {
        let selectedGenre = $('select').val();
        getQuizMasterTracks(selectedGenre);
    })
        
}

/////////////////////////////////////////////////////////////////////////////////
//RANDOM GENERE FUNTIONS FOR QUIZ MASTER

//generates random genres for multi choice game - roll the dice Quiz Master game
function generateQuizMasterRandomGenreNum(genreObject) {
    let num = Math.floor((Math.random() * genreObject.genres.length));
    return num;
}

//gets the genre number from the genre API object - roll the dice Quiz Master game
function getQuizMasterGenreId(genreObject) {
    console.log(genreObject);
    const i = generateMultiRandomGenreNum(genreObject);
    console.log(`Random Genre Index Num: ${i}`);
    const genreNum = genreObject.genres[i].links.childGenres.ids;
    getQuizMasterTracks(genreNum);
}

//fetches the genre API object - roll the dice Quiz Master game
function getQuizMasterGenreNum() {
    $('.container').empty();
    $('.container').append(
        `<div class="loader"><img src="images/record.png" alt"loader">
        <p>Great choice! We are loading your quiz now.</p></div>`)
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
    .then(responseJson => getQuizMasterGenreId(responseJson))
    .catch(err => failureCallback(err))
}

////////////////////////////////////////////////////////////////////////////
//home functions

//appends the contact page - main function
function contact() {
    $('.container').empty();
    $('.container').append(
        `<div class="bottomAnimation">
        <h2>Email Us</h2>
        <p>We hope you are enjoying the game.  If you need help or have any sugguestions please let us know.<br>You can email us
        <a href='mailto:hello@beardystudios.com?Subject=Music%20Quiz%20Inquiry' target='_top'>here.</a><br>
        <button type="button" id="home" class="nextSong" value="backToHome" onclick="start();">Back to Home</button>
        </div>`
    );
}

//appends the instructions page - main function
function instructionsEntryGame() {
    $('.container').empty();
    $('.container').append(
        `<div class="bottomAnimation">
        <h2>Game Instructions</h2><br>
        1. Choose a catagory or enter a search keyword.<br><br>
        2. Press the play button to load the first song.  Song will play for 30 seconds.<br><br>
        3. For Enter the Artist and Song Game, enter the answers into the designated input box and click sumbit.<br>You can choose to skip a round by clicking the skip button.  Answers are not 
        case-sensitive and punctuation does not effect your answers.<br>To replay the song just click the play button again.<br><br>
        4. If playing the multiple choice game, just click the answer you would like to submit.<br>
        To replay the song just click the play button again.<br><br>
        5. You will be told what the correct answer was on the next page along with your current score is.<br><br>
        6. Press the next song button to load the next song or the quit game button to retun to the home page.<br><br>
        7. Repeat steps 2 thru 6 for the 10 rounds.<br><br>
        8. At the end of the 10 rounds you will be given your total score out of the possible <br>20 points for the enter your own answers game and 10 for the multiple choice game.<br><br>
        Good luck at testing your musical knowledge!<br>
        <button type="button" id="home" class="nextSong" value="backToHome" onclick="selectGenre();">Back to Game</button>
        </div>`
        );
}

//appends the instructions page - main function
function instructionsMultiGame() {
    $('.container').empty();
    $('.container').append(
        `<div class="bottomAnimation">
        <h2>Game Instructions</h2><br>
        1. Choose a catagory or enter a search keyword.<br><br>
        2. Press the play button to load the first song.  Song will play for 30 seconds.<br><br>
        3. For Enter the Artist and Song Game, enter the answers into the designated input box and click sumbit.<br>You can choose to skip a round by clicking the skip button.  Answers are not 
        case-sensitive and punctuation does not effect your answers.<br>To replay the song just click the play button again.<br><br>
        4. If playing the multiple choice game, just click the answer you would like to submit.<br>
        To replay the song just click the play button again.<br><br>
        5. You will be told what the correct answer was on the next page along with your current score is.<br><br>
        6. Press the next song button to load the next song or the quit game button to retun to the home page.<br><br>
        7. Repeat steps 2 thru 6 for the 10 rounds.<br><br>
        8. At the end of the 10 rounds you will be given your total score out of the possible <br>20 points for the enter your own answers game and 10 for the multiple choice game.<br><br>
        Good luck at testing your musical knowledge!<br>
        <button type="button" id="home" class="nextSong" value="backToHome" onclick="selectMultiChoiceGenre();">Back to Game</button>
        </div>`
        );
}

//appends the instructions page - main function
function instructionsQuizMasterGame() {
    $('.container').empty();
    $('.container').append(
        `<div class="bottomAnimation">
        <h2>Quiz Master Game Instructions</h2><br>
        1. Choose a catagory or enter a search keyword.<br><br>
        2. Press the play button to load the first song.  Song will play for 30 seconds.<br><br>
        3. For Enter the Artist and Song Game, enter the answers into the designated input box and click sumbit.<br>You can choose to skip a round by clicking the skip button.  Answers are not 
        case-sensitive and punctuation does not effect your answers.<br>To replay the song just click the play button again.<br><br>
        4. If playing the multiple choice game, just click the answer you would like to submit.<br>
        To replay the song just click the play button again.<br><br>
        5. You will be told what the correct answer was on the next page along with your current score is.<br><br>
        6. Press the next song button to load the next song or the quit game button to retun to the home page.<br><br>
        7. Repeat steps 2 thru 6 for the 10 rounds.<br><br>
        8. At the end of the 10 rounds you will be given your total score out of the possible <br>20 points for the enter your own answers game and 10 for the multiple choice game.<br><br>
        Good luck at testing your musical knowledge!<br>
        <button type="button" id="home" class="nextSong" value="backToHome" onclick="selectQuizMasterGenre();">Back to Game</button>
        </div>`
        );
}

//starts and resests the app - main function
function start() {
    roundNum = 1;
    userScore = 0;
    $('.container').empty();
    $('.container').append(
        `<div class="animation"><h2>Who dat?!<br>Music Quiz</h2></div>
        <div class="homeRecord"><img class="homeRecord" src="images/record.png" alt="record"></div>
        <br><br>
        <div class="home">
            <div class="home">
                <button type="button" id="homePlay" class="homeBtn" value="homePlayBtn" onclick="selectGenre();">Enter Artist/Song Game</button>
                <button type="button" id="homePlayMC" class="homeBtn" value="homePlayBtn" onclick="selectMultiChoiceGenre();">Multiple Choice Game</button>
                <button type="button" id="homeInstructions" class="homeBtn" value="homeInstructionsBtn" onclick="selectQuizMasterGenre();">Quiz Master</button>
            </div>
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