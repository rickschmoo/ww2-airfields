import React, { Component } from "react";

import MapContainer from "./map-component"
import UserService from "../services/user-service";
import AirfieldDataService from "../services/airfield.service";
import { Link } from "react-router-dom";


export default class AirfieldList extends Component {

  constructor(props) {
    super(props);
    this.onChangeSearchName = this.onChangeSearchName.bind(this);
    this.onBlurAirforceSelect = this.onBlurAirforceSelect.bind(this);
    this.retrieveAirfields = this.retrieveAirfields.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveAirfield = this.setActiveAirfield.bind(this);
    this.removeAllAirfields = this.removeAllAirfields.bind(this);
    this.searchName = this.searchName.bind(this);

    this.state = {
      airfields: [],
      currentAirfield: null,                                                                                                                                                                    
      currentIndex: -1,
      searchName: '',
      airforceSelect: 'Any',
      content: '',
    };

    this.state = {

    };
  }

  componentDidMount() {
    UserService.getUserBoard().then(
      response => {
        this.setState({
          content: response.data
        });
        this.retrieveAirfields();
      },
      error => {
        this.setState({
          content:
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString()
        });
      }
    );
  }

  onChangeSearchName(e) {
    const searchName = e.target.value;

    this.setState({
      searchName: searchName
    });
  }

  onBlurAirforceSelect(e) {
    this.setState({
      airforceSelect: e.target.value
    });
    // console.log(this.state.airforceSelect + ' selected');
  }

  retrieveAirfields() {
    AirfieldDataService.getAll()
      .then(response => {
        this.setState({
          airfields: response.data
        });
        // console.log(response.data);
        console.log('[LIST] Retrieved ' + response.data.length + ' airfields');
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveAirfields();
    this.setState({
      currentAirfield: null,
      currentIndex: -1
    });
  }

  setActiveAirfield(airfield, index) {
    this.setState({
      currentAirfield: airfield,
      currentIndex: index
    });
  }

  removeAllAirfields() {
    AirfieldDataService.deleteAll()
      .then(response => {
        console.log(response.data);
        this.refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  }

  searchName() {
    AirfieldDataService.findByName(this.state.searchName, this.state.airforceSelect)
      .then(response => {
        this.setState({
          airfields: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    
    const { searchName, airfields, currentAirfield, currentIndex } = this.state;
    const googleMapsURLPrefix = 'https://www.google.com/maps/@?api=1&map_action=map&center='
    const googleMapsURLPostfix = '&basemap=satellite&zoom=14';
    let mapsLatLongUrl='';
    if (currentAirfield) {
      mapsLatLongUrl =  googleMapsURLPrefix +
                        currentAirfield.lat + ',' + currentAirfield.long +
                        googleMapsURLPostfix;
    }

    const listStyle = {
      overflowY: "scroll",
      height: "1000px"
    };
    const unknownString = "Unknown";

    const currentAirfieldString = currentAirfield || "None selected"; 
    console.log('[LIST] Refreshing: ', currentAirfieldString);

    return (
      <div className="container">
        <header>
          <h1>Search</h1>
        </header>
        <div className="container mt-3 airfield-container">
          <div className="list row">
          <div className="col-md-8">
            <form>


            <div className="form-group">
                <div>

                {/* ======= Airforces select ======= */ }
                <label htmlFor="airforce-select">Airforces</label>
                <select
                  className="form-control form-control-sm"
                  id="airforce-select"
                  value={this.state.airforceSelect}
                  onBlur={this.onBlurAirforceSelect}
                >
                    <option value="Any">Any</option>                    
                    <option value="RAF">RAF only</option>
                    <option value="USAAF">USAAF only</option>
                    <option value="RAF and USAAF">Both RAF and USAAF</option>
                </select>
                </div>
              </div>

              {/* ======= Search box ======= */ }
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Name starts with"
                  value={searchName || ''}
                  onChange={this.onChangeSearchName}
                />
                <div className="input-group-append">
                  <button
                    className="btn btn-outline-secondary"
                    type="button"
                    onClick={this.searchName}
                  >
                    Search
                  </button>
                </div>
              </div>
              
            </form>
          </div>

          {/* ======= Results ======= */ }
          <div className="col-md-6" style={listStyle}>
            <h2>
              { airfields ? airfields.length : null } Airfields
            </h2>
            <div style={listStyle}>
              <ul className="list-group">
                {airfields &&
                  airfields.map((airfield, index) => (
                    <li key={index}>
                      <button 
                        className={
                          "list-group-item " +
                          (index === currentIndex ? "active" : "")
                        }
                        onClick={() => this.setActiveAirfield(airfield, index)}
                        onKeyDown={() => this.setActiveAirfield(airfield, index)}
                      >
                      {airfield.id + ' ' + airfield.name}
                      </button>
                    </li>
                  ))}
              </ul>
            </div>
            <button
              className="m-3 btn btn-sm btn-danger"
              onClick={this.removeAllAirfields}
            >
              Remove All
            </button>
          </div>
          <div className="col-md-6">
            {currentAirfield ? (
              <div>
                <div>
                  <h2>
                    {currentAirfield.name}
                  </h2>
                </div>
                <div>
                  <ul>
                    <li>
                      <strong>Station #: </strong> {(currentAirfield.station_num ? currentAirfield.station_num : unknownString )}
                    </li>
                    <li>
                      <strong>Squadrons: </strong> {currentAirfield.airforces ? currentAirfield.airforces : unknownString} 

                      { currentAirfield.raf_squadrons || currentAirfield.usaaf_squadrons ?
                        <ul> 
                          {currentAirfield.raf_squadrons ? <li>{currentAirfield.raf_squadrons}</li> : ''}
                          {currentAirfield.usaaf_squadrons ? <li>{currentAirfield.usaaf_squadrons}</li> : ''}
                        </ul> : 
                      ''}
                    </li>
                    <li>
                      <strong>Coordinates: </strong> 
                        <a href={ mapsLatLongUrl } rel="noreferrer" target="_blank">{currentAirfield.coordinates}</a>
                    </li>
                    <li>
                      <strong>Wikipedia: </strong> 
                        <a href={currentAirfield.url_wikipedia} target="_blank" rel="noreferrer">{currentAirfield.url_wikipedia}</a>
                    </li>
                    <li>
                      <strong>Published status: </strong>
                        {currentAirfield.published ? "Published" : "Pending"}
                    </li>
                  </ul>
                </div>
                <Link
                  to={"/Airfields/" + currentAirfield.id}
                  className="badge badge-warning"
                >
                  Edit
                </Link>
                <div className="map-test">
                   <MapContainer lat={currentAirfield ? currentAirfield.lat : 0.0}
                                long={currentAirfield ? currentAirfield.long : 0.0}/>      
                </div>
              </div>
            ) : (
              <div>
                <br />
                <p>Please click on a Airfield...</p>
              </div>
            )}
          </div>
        </div>
        </div>
      </div>
    );
  }
}
