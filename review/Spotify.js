
let accessToken;
const clientId = '2a57ed019b7348a49315bfab29126836';
const redirect_uri = 'http://localhost:3000/';

const Spotify = {
  getAccessToken() {
    if (accessToken) {
      return accessToken;
    }
    const newAccessToken = window.location.href.match(/access_token=([^&]*)/);
    const newExpiresIn = window.location.href.match(/expires_in=([^&]*)/);
    if (newAccessToken && newExpiresIn) {
      accessToken = newAccessToken[1];
      let expiresIn = newExpiresIn[1];
      window.setTimeout(() => accessToken = '', expires_in * 1000);
      window.history.pushState('Access Token', null, '/');
      return accessToken;
    } else {
      const redirect = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirect_uri}
    }`
      window.location = redirect;
  }
  search(term) {
    const searchUrl = `https://api.spotify.com/v1/search?type=track&q=${term}`;
    Spotify.getAccessToken();
    return fetch( searchUrl, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
    .then(response => {
      return response.json()}).then(jsonResponse => {
        if (!jsonResponse.tracks) return [];
        return jsonResponse.tracks.item.map(track => {
          return {
            id: track.id,
            name: track.name,
            artist: track.artists[0].name,
            album: track.album.name,
            uri: track.uri,
            explicit: track.explicit,
            images: track.album.images[1]
          }
        })
      });
  },

  savePlaylist(playlistName, trackUris) {
    if (playlistName && trackUris) {
      const accessToken = Spotify.getAccessToken();
      const headers = {Authorization: `Bearer ${accessToken}`};
      const playlistHeader =
      {
        headers: headers,
        method: "POST",
        body: JSON.stringify({name: playlistName})
      };
      const trackHeader = {
        headers: headers,
        method: "POST",
        body: JSON.stringify({uris: trackUris})
      };

      let userId:
      let playlistId;
        return fetch(`https://api.spotify.com/v1/me`,{
          headers: headers
        }).then(response => {
          return response.json();
        }).then(jsonResponse => {
          userId = jsonResponse.id;
          return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`,
          playlistHeader
        ).then(response => {
          return response.json();
        }).then(jsonResponse => {
          playlistId = jsonResponse.id;
            return fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`,
              trackHeader
            )
        })
      })
    }
  }
};


export default Spotify;
