import React, { Component } from "react";
import AirfieldDataService from "../services/airfield.service";

export default class BoardUserItem extends Component {
  constructor(props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeAirforces = this.onChangeAirforces.bind(this);
    this.onChangeStationNum = this.onChangeStationNum.bind(this);
    
    this.getAirfield = this.getAirfield.bind(this);
    this.updatePublished = this.updatePublished.bind(this);
    this.updateAirfield = this.updateAirfield.bind(this);
    this.deleteAirfield = this.deleteAirfield.bind(this);

    this.state = {
      currentAirfield: {
        id: null,
        name: "",
        airforces: "",
        station_num: "",
        published: false
      },
      message: ""
    };
  }

  componentDidMount() {
    this.getAirfield(this.props.match.params.id);
  }

  onChangeName(e) {
    const name = e.target.value;

    this.setState(function(prevState) {
      return {
        currentAirfield: {
          ...prevState.currentAirfield,
          name: name
        }
      };
    });
  }

  onChangeAirforces(e) {
    const airforces = e.target.value;
    
    this.setState(prevState => ({
      currentAirfield: {
        ...prevState.currentAirfield,
        airforces: airforces
      }
    }));
  }

  onChangeStationNum(e) {
    const station_num = e.target.value;
    
    this.setState(prevState => ({
      currentAirfield: {
        ...prevState.currentAirfield,
        station_num: station_num
      }
    }));
  }

  getAirfield(id) {
    AirfieldDataService.get(id)
      .then(response => {
        this.setState({
          currentAirfield: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updatePublished(status) {
    var data = {
      id: this.state.currentAirfield.id,
      name: this.state.currentAirfield.name,
      airforces: this.state.currentAirfield.airforces,
      station_num: this.state.currentAirfield.station_num,
      published: status
    };

    AirfieldDataService.update(this.state.currentAirfield.id, data)
      .then(response => {
        this.setState(prevState => ({
          currentAirfield: {
            ...prevState.currentAirfield,
            published: status
          }
        }));
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updateAirfield() {
    AirfieldDataService.update(
      this.state.currentAirfield.id,
      this.state.currentAirfield
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "The airfield was updated successfully!"
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  deleteAirfield() {    
    AirfieldDataService.delete(this.state.currentAirfield.id)
      .then(response => {
        console.log(response.data);
        this.props.history.push('/airfields')
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { currentAirfield } = this.state;

    return (
      <div>
        {currentAirfield ? (
          <div className="edit-form">
            <h4>Airfield</h4>
            <form>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  value={currentAirfield.name}
                  onChange={this.onChangeName}
                />
              </div>
              <div className="form-group">
                <label htmlFor="airforces">Airforces</label>
                <input
                  type="text"
                  className="form-control"
                  id="airforces"
                  value={currentAirfield.airforces}
                  onChange={this.onChangeAirforces}
                />
              </div>
              <div className="form-group">
                <label htmlFor="station_num">Station #</label>
                <input
                  type="text"
                  className="form-control"
                  id="station_num"
                  value={currentAirfield.station_num}
                  onChange={this.onChangeStationNum}
                />
              </div>

              <div className="form-group">
                <label>
                  <strong>Status:</strong>
                </label>
                {currentAirfield.published ? "Published" : "Pending"}
              </div>
            </form>

            {currentAirfield.published ? (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updatePublished(false)}
              >
                UnPublish
              </button>
            ) : (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updatePublished(true)}
              >
                Publish
              </button>
            )}

            <button
              className="badge badge-danger mr-2"
              onClick={this.deleteAirfield}
            >
              Delete
            </button>

            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updateAirfield}
            >
              Update
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Airfield...</p>
          </div>
        )}
      </div>
    );
  }
}
