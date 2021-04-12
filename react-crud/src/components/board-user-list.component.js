import React, { Component } from "react";

import UserService from "../services/user-service";
import AirfieldDataService from "../services/airfield.service";
import { Link } from "react-router-dom";


export default class BoardUserList extends Component {

  constructor(props) {
    super(props);
    this.onChangeSearchName = this.onChangeSearchName.bind(this);
    this.retrieveAirfields = this.retrieveAirfields.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveAirfield = this.setActiveAirfield.bind(this);
    this.removeAllAirfields = this.removeAllAirfields.bind(this);
    this.searchName = this.searchName.bind(this);

    this.state = {
      airfields: [],
      currentAirfield: null,
      currentIndex: -1,
      searchName: "",
      content: ""
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

  retrieveAirfields() {
    AirfieldDataService.getAll()
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
    AirfieldDataService.findByName(this.state.searchName)
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

    return (
      <div className="container">
        <header className="jumbotron">
          <h3>{this.state.content}</h3>
        </header>
        <div className="container mt-3 airfield-container">
          <div className="list row">
          <div className="col-md-8">
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Search by name"
                value={searchName}
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
          </div>
          <div className="col-md-6">
            <h4>Airfields List</h4>

            <ul className="list-group">
              {airfields &&
                airfields.map((airfield, index) => (
                  <li
                    className={
                      "list-group-item " +
                      (index === currentIndex ? "active" : "")
                    }
                    onClick={() => this.setActiveAirfield(airfield, index)}
                    key={index}
                  >
                    {airfield.name}
                  </li>
                ))}
            </ul>

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
                <h4>Airfield</h4>
                <div>
                  <label>
                    <strong>Name:</strong>
                  </label>{" "}
                  {currentAirfield.name}
                </div>
                <div>
                  <label>
                    <strong>Station #:</strong>
                  </label>{" "}
                  {currentAirfield.station_num}
                </div>
                <div>
                  <label>
                  <strong>Airforces</strong>
                  </label>{" "}
                  {currentAirfield.airforces}
                </div>
                <div>
                  <label>
                    <strong>RAF Squadrons:</strong>
                  </label>{" "}
                  {currentAirfield.raf_squadrons}
                </div> 
                <div>
                  <label>
                    <strong>USAAF Squadrons:</strong>
                  </label>{" "}
                  {currentAirfield.usaaf_squadrons}
                </div>
                <div>
                  <label>
                    <strong>Coordinates:</strong>
                  </label>{" "}
                  {currentAirfield.coordinates}
                </div> 
                <div>
                  <label>
                    <strong>USAAF Squadrons:</strong>
                  </label>{" "}
                  {currentAirfield.usaaf_squadrons}
                </div>
                <div>
                  <label>
                    <strong>Wikipedia:</strong>
                  </label>{" "}
                  <a href={currentAirfield.url_wikipedia}>{currentAirfield.url_wikipedia}</a>
                </div>
                <div>
                  <label>
                    <strong>Published status:</strong>
                  </label>{" "}
                  {currentAirfield.published ? "Published" : "Pending"}
                </div>

                <Link
                  to={"/Airfields/" + currentAirfield.id}
                  className="badge badge-warning"
                >
                  Edit
                </Link>
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
