import React, { Component } from 'react';
import './Playlist.css';
import TrackList;


class Playlist extends React.Component {
      constructor(props){
        super(props);

        this.state = {isRemoval: true}
        this.handleNameChange = this.handleNameChange.bind(this);
      }
      handleNameChange(event){
        this.props.onNameChange(event.target.value);

      }

      render() {
        return (
          <div className="Playlist">
           <input value={this.props.playlistName} onChange={this.handleNameChange} />
             <TrackList
               tracks={this.props.playlistTracks}
               onRemove={this.props.onRemove}
               updatePlaylistName={this.props.onNameChange}


               />
           <!-- Add a TrackList component -->
           <a className="Playlist-save" onClick={this.props.onSave}>SAVE TO SPOTIFY</a>
          </div>
        );
      }
    }



export Playlist;
