import React, { Component } from 'react'
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"
import {BrowserRouter as Router, Route} from "react-router-dom"


class FindParking extends Component {
  render() {
    return(
      <div className="find-parking-container container">
        <div className="header">
          <h1>Find Us Where You Are</h1>
          <hr />
        </div>
        <Route path={`/find-parking/search`} component={Search}/>
        <Route path={`/find-parking/no-parking`} component={NoParking}/>
      </div>
    )
  }
}

class Search extends Component {
  render() {
    return(
      <div>
        <div className="body box">
          <div className="header">
            <h3>ParkIt Locations</h3>
            <p>Let's make parking great together</p>
          </div>
          <div className="map">
            <Map
              googleMapURL="https://maps.googleapis.com/maps/api/js?&key=AIzaSyApjld64g85YeINEMm2JPBLz_OKkONqcJs&libraries=places,geometry,drawing&v=3"
              loadingElement={<div style={{ height: `100%` }} />}
              containerElement={<div style={{ height: `400px` }} />}
              mapElement={<div style={{ height: `100%` }} />}
            />
          </div>
          <div className="search">
            <div>
              <p>Find us here:</p>
            </div>
            <form className="search-body">
              <select >
                <option>KL Sentral</option>
              </select>
              <button>Search</button>
            </form>
          </div>
          <div>
            <p>Can't find the location? Let us know.</p>
          </div>
        </div>
      </div>
    )
  }
}

class NoParking extends Component {
  render() {
    return(
      <div className="enquire body box">
        <div className="header">
          <h3>ParkIt Locations</h3>
          <p>No parking available? Let us sort you out</p>
        </div>
        <form className="form">
          <div>
            <label>Where do you require carpark?</label>
            <input type="text" placeholder="Area/Location"></input>
          </div>
          <div>
            <label>When do you want to start parking</label>
            <input type="text" placeholder="Area/Location"></input>
          </div>
          <div>
            <label>What is your expected budget?</label>
            <select>
              <option> RM300 </option>
              <option> RM500 </option>
            </select>
          </div>
          <div className="button">
            <button className="btn">Send Enquiry</button>
          </div>
        </form>
      </div>
    )
  }
}


const Map = withScriptjs(withGoogleMap((props) =>
  <GoogleMap
    defaultZoom={8}
    defaultCenter={{ lat: -34.397, lng: 150.644 }}
  >
  </GoogleMap>
))

export default FindParking
