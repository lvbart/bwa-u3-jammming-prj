import React, { Component } from 'react';
import './Track.css';


class Track extends React.Component {
 constructor(props) {
   super(props);

     this.addTrack = this.addTrack.bind(this);
     this.removeTrack = this.removeTrack.bind(this);
 }
  addTrack(event) {
    this.props.onAdd(this.props.track);
  }

  removeTrack(event) {
    this.props.onRemove(this.props.track);
  }
}

class Track extends React.Component {
      render() {
        return (
          <div className="Track">
            <div className="Track-information">
              <h3><!-- track name will go here --></h3>
              <p><!-- track artist will go here--> | <!-- track album will go here --></p>
            </div>
            <a className="Track-actionRed" id={this.props.track.key} onClick={this.removeTrack}> - </a>
            <a className="Track-action" id={this.props.track.key} onClick={this.addTrack}> + </a>
          </div>
        );
      }
    }

class Track-action extends React.Component {
  renderAction() {
    if (isRemoval === True ) {
      console.log('-')
    } else {
      console.log('+')
    }
  };
}
export Track;
