import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import SearchResults from '../components/SearchResults/SearchResults';
import Spotify from '../../util/Spotify';

class App extends React.Component {
  constructor(props) {
    super(props);
      this.state = {
        SearchResults: [],
        playlistName: 'New Playlist!',
        playlistTracks: [],
      };
      this.addTrack = this.addTrack.bind(this);
      this.removeTrack = this.removeTrack.bind(this);
      this.updatePlaylistName = this.updatePlaylistName.bind(this);
      this.savePlaylist = this.savePlaylist.bind(this);
      this.search = this.search.bind(this);

  }

addTrack(track) {
    let tracks = this.state.playlistTracks;
    if (tracks.find(newTrack => newTrack.id === track.id)) {
      return;
    }
    tracks.push(track);
    this.setState({playlistTracks: tracks});

  }

removeTrack(track) {
  let tracks = this.state.searchResults;
  tracks = tracks.filter(currentTrack => currentTrack.id !=== track.id);
  this.setState({searchResults: tracks});

}

updatePlaylistName(name) {
  this.setState({playlistName: name});
}

search(term) {
  if (this.term !== null) {
    Spotify.search(term).then(searchResults => {
      this.setState({
        searchResults: searchResults
      });
    });
  }
}


savePlaylist() {
  const trackURIs = this.state.playlistTracks.map(track => track.uri);
  Spotify.savePlaylist(this.state.playlistName, trackURIs).then(() => {
    this.setState({
      playlistName: 'New Playlist',
      playlistTracks: [],
      searchResults: []
    });
  });
}

render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
          <div className="App">
            <SearchBar onSearch={this.search} />
          <!-- Add a SearchBar component -->
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack} />
            <Playlist
              playlistName={this.state.playlistName}
              playlistTracks={this.state.playlistTracks}
              onRemove={this.removeTrack}
              onNameChange={this.updatePlaylistName}
              onSave={this.savePlaylist}


              />
          <!-- Add a SearchResults component -->
          <!-- Add a Playlist component -->
           </div>
         </div>
       </div>
    );
  }

}




export default App;
