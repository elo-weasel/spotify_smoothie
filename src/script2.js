//stuff for generating code challenge
function generateRandomString(length){
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const values = crypto.getRandomValues(new Uint8Array(length));
  return values.reduce((acc, x) => acc + possible[x % possible.length], "");
}

async function sha256(plain){
  const encoder = new TextEncoder()
  const data = encoder.encode(plain)
  return window.crypto.subtle.digest('SHA-256', data)
}

function base64encode(input){
  return btoa(String.fromCharCode(...new Uint8Array(input)))
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');
}


// generated in the previous step















const clientId = 'f57e783900184c238b995175bd01b90a';
const redirectUri = 'https://elo-weasel.github.io/spotify_smoothie/';
const scope = 'user-top-read';
const args = new URLSearchParams(window.location.search);
const code = args.get("code");
const topGenres = [];


if(code){
  //console.log(code);
  await getToken(code);

  //console.log(localStorage.getItem('access_token'));

  const topArtists = await fetchTopArtists(localStorage.getItem('access_token'));
  const topSongs = await fetchTopSongs(localStorage.getItem('access_token'));

  //console.log(topArtists);
  console.log(topSongs);

  var artists = [];
  var songs = [];

  console.log(topArtists);
  console.log("artists");
  artists = sortArtists(topArtists);
  console.log("songs");
  songs = sortSongs(topSongs);

  getGenres(topArtists);

  populateUI(topSongs, topArtists, getGenres);
}else{
  redirectToAuthCodeFlow();
}


//vars

//const args = new URLSearchParams(window.location.search);


async function redirectToAuthCodeFlow(){
  const codeVerifier  = generateRandomString(64);
  const hashed = await sha256(codeVerifier)
  const codeChallenge = base64encode(hashed); 

  localStorage.setItem('code_verifier', codeVerifier);

  const authUrl = new URL("https://accounts.spotify.com/authorize")

  const params =  {
    response_type: 'code',
    client_id: clientId,
    scope: scope,
    code_challenge_method: 'S256',
    code_challenge: codeChallenge,
    redirect_uri: redirectUri,
  }

  authUrl.search = new URLSearchParams(params).toString();
  document.location = authUrl.toString();
}


async function getToken(code){

  // stored in the previous step
  const codeVerifier = localStorage.getItem('code_verifier');

  const url = "https://accounts.spotify.com/api/token";
  const payload = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      client_id: clientId,
      grant_type: 'authorization_code',
      code: code,
      redirect_uri: redirectUri,
      code_verifier: codeVerifier,
    }),
  }

  const body = await fetch(url, payload);
  const response = await body.json();

  localStorage.setItem('access_token', response.access_token);
  localStorage.setItem('expires_in', response.expires_in);
}

async function fetchTopArtists(token) {
  var result = await fetch("https://api.spotify.com/v1/me/top/artists?time_range=short_term&limit=50&offset=0", {
      method: "GET", headers: { Authorization: `Bearer ${token}` }
  });

  return await result.json();
}

async function fetchTopSongs(token) {
  var result = await fetch("https://api.spotify.com/v1/me/top/tracks?time_range=short_term&limit=10&offset=0", {
      method: "GET", headers: { Authorization: `Bearer ${token}` }
  });

  return await result.json();
}

function sortArtists(artists){
  var result = [];

  for (let i = 0; i < 45; i++){
    console.log(i+1 + ": " + artists.items[i].name);
    result.push(artists.items[i].name);
  }

  return result;
}

function sortSongs(songs){
  var result = [];
  
  for (let i = 0; i < 10; i++){
    console.log(i+1 + ": " + songs.items[i].name + ", " + songs.items[i].artists[0].name);
    result.push(songs.items[i].name + ", " + songs.items[i].artists[0].name);
  }

  return result;
}

function populateUI(songs, artists, genres) {
  document.getElementById("song1").innerText = songs.items[0].name + ", " + songs.items[0].artists[0].name;
  document.getElementById("song2").innerText = songs.items[1].name + ", " + songs.items[1].artists[0].name;
  document.getElementById("song3").innerText = songs.items[2].name + ", " + songs.items[2].artists[0].name;

  document.getElementById("artist1").innerText = artists.items[0].name;
  document.getElementById("artist2").innerText = artists.items[1].name;
  document.getElementById("artist3").innerText = artists.items[2].name;

  document.getElementById("genre1").innerText = genres[0];
  document.getElementById("genre2").innerText = genres[1];
  document.getElementById("genre3").innerText = genres[2];
}

function getGenres(topArtists){
  //for loop to go through all artists
  //make element for each genre??
  //then inc var by 1 for each time it appears
  var genres = [];
  var genreCounter = [];
  var empty = [];

  console.log(topArtists.items[0].genres.length);

  for(let i = 0; i < 45; i++){

    //var item = topArtists.items[i];
      
      for(let j = 0; j < topArtists.items[i].genres.length; j++){
        //console.log('genre detected');


        //console.log(genres);
        //console.log(genreCounter);
        if(genres.length === 0){
          //console.log('genre 1');
          genres.push(topArtists.items[i].genres[j]);
          genreCounter.push(1);

          //console.log(genres);
          //console.log(genreCounter);
        }else{
          
          for(let k = genres.length - 1; k >= 0; k--){
            //console.log(k);
            if(genres[k] === topArtists.items[i].genres[j]){
              //console.log('repeat');
              genreCounter[k] += 1;
              k = -1;
            }
            if (k === 0 && genres[k] !== topArtists.items[i].genres[j]){
              //console.log("new genre");
              genreCounter.push(1);
              genres.push(topArtists.items[i].genres[j]);
            }
          }
        }
      }

       
      

  }

  orderGenres(genres, genreCounter);
}


function orderGenres(genres, genreCounter){
  var temp = [0, 0, 0];
  var indices = [-1, -1, -1];
  for(let i = 0; i < genreCounter.length; i++){
    for(let j = 0; j < temp.length; j++){
      if(genreCounter[i] > temp[j]){
        for(var k = temp.length - 2; k > j - 1; k--){
          temp[k+1] = temp[k];
          indices[k+1] = indices[k];
        }
        temp[j] = genreCounter[i];
        indices[j] = i;

        j = 6;
      }
    }
  }

  console.log(temp);
  console.log(indices);

  console.log(genres[indices[0]]);
  console.log(genres[indices[1]]);
  console.log(genres[indices[2]]);

  topGenres.push(genres[indices[0]]);
  topGenres.push(genres[indices[1]]);
  topGenres.push(genres[indices[2]]);
}