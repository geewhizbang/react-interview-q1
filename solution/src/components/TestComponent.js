//import React, { useState, useEffect } from 'react';
import React from 'react';
import { getLocations, isNameValid } from '../mock-api/apis';
export default class TestComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      errMsg: 'Enter a valid unused name',
      existingNames: [],
      locations: [],
      namedLocations: [],
      location: "unselected"
    };

    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleLocationChange = this.handleLocationChange.bind(this);
    this.handleAddLocation = () => {
      const locations = this.state.namedLocations;
      locations.push({name: this.state.name, location: this.state.location})
      this.setState({
        name: "", 
        errMsg: 'Enter a valid unused name',
        namedLocations: locations
      });
    }
    this.handleClearLocations = () => {
      this.setState({namedLocations: []});
    }
  
  }

  componentDidMount() {
    getLocations()
    .then(rawLocations => {
      const locations = rawLocations.map(location => ({text: location, value: location}));
      this.setState({ locations: [...this.state.locations, {text: "[Select Location]", value: "unselected"}, ...locations]});
    })
    .catch(err => console.error(err));
  }

  handleNameChange(event) {
    const value = event.target.value;
    this.setState({name: value });
    let errMsg = "";
    if (value === "") {
      errMsg = "Enter a valid unused name";
      } else {
        isNameValid(value)
        .then(result => {
          if (!result) {
            errMsg = "Invalid Name";
            this.setState({errMsg: errMsg });
          } else {
            if (this.state.locations.some(location => location.name === this.state.name)) {
              errMsg = "Name already exists";
            }
          }
        });
    }
    this.setState({errMsg: errMsg });
  }

  handleLocationChange(event) {
    this.setState({location: event.target.value});
  }
  
  render() {
    return (
      <div className="controlContainer">
        <div className="ctrl"> 
          <label><span>Name</span>
            <div>
              <input type="text" value={this.state.name} onChange={this.handleNameChange}/>
              <p className="errMsg">{ this.state.errMsg }</p>
            </div>
          </label>
        </div>
        <div className="ctrl">
          <label><span>Location</span>
            <div>
            <select value={this.state.location} onChange={this.handleLocationChange}>
            {this.state.locations.map((location, index) => (
              <option key={index} value={location.value}>{location.text}</option>
            ))}
          </select>
            </div>
          </label>
        </div>
        <div className="dataTable">
          <table>
            <thead><tr><th>Name</th><th>Location</th></tr></thead>
            <tbody>
              {this.state.namedLocations.length === 0 ?
                <tr>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                </tr>
                :
                this.state.namedLocations.map((location, index) => (
                <tr key={index}>
                  <td>{location.name}</td>
                  <td>{location.location}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="ctrlButtons">
          <button
            disabled={this.state.namedLocations.length === 0}
            onClick={this.handleClearLocations}
          >Clear</button>
          <button 
            disabled={this.state.errMsg !== "" || this.state.location === "unselected"}
            onClick={this.handleAddLocation}
          >Add</button>
        </div>
      </div>
    );
  }
}

