import React, { Component } from 'react';
import TextField from '../components/TextField';
import SelectField from '../components/SelectField';
import state from '../Constants';
import { browserHistory } from 'react-router';

class VenueFormContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      address: '',
      city: '',
      state: '',
      zip: '',
      website: '',
      ageRestriction: '',
      foodOptions: '',
      parking: '',
      hours: '',
      phone: '',
      dressCode: '',
      coverCharge: '',
      cashOnly: '',
      imageUrl: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClearForm = this.handleClearForm.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleChange(event) {
    let newKey = event.target.name;
    let newValue = event.target.value;
    this.setState({
      [newKey]: newValue
    });
  }

  addNewVenue(newVenue) {
    fetch('/api/v1/venues', {
      credentials: 'same-origin',
      method: 'POST',
      body: JSON.stringify(newVenue),
      headers: {'Content-Type': 'application/json'}
    })
    .then(response => {
      if (response.ok) {
        return response;
      } else {
        let errorMessage = `${response.status} (${response.statusText})`,
        error = new Error(errorMessage);
        throw(error);
      }
    })
    .then(response => response.json())
    .then(body => {
      browserHistory.push(`/venues`);
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  updateVenue(newVenue) {
    fetch(`/api/v1/venues/${this.props.params.id}`, {
      credentials: 'same-origin',
      method: 'PATCH',
      body: JSON.stringify(newVenue),
      headers: {'Content-Type': 'application/json'}
    })
    .then(response => {
      if (response.ok) {
        return response;
      } else {
        let errorMessage = `${response.status} (${response.statusText})`,
        error = new Error(errorMessage);
        throw(error);
      }
    })
    .then(response => response.json())
    .then(body => {
      browserHistory.push(`/venues`);
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  componentDidMount() {
    if(this.props.params.id){
      fetch(`/api/v1/venues/${this.props.params.id}`)
      .then(response => {
        if (response.ok) {
          return response;
        } else {
          let errorMessage = `${response.status} (${response.statusText})`,
          error = new Error(errorMessage);
          throw(error);
        }
      })
      .then(response => response.json())
      .then(body => {
        this.setState({
          name: body.name,
          address: body.address,
          city: body.city,
          state: body.state,
          zip: body.zip,
          website: body.website,
          ageRestriction: body.age_restriction,
          foodOptions: body.food_options,
          parking: body.parking,
          hours: body.hours,
          phone: body.phone,
          dressCode: body.dress_code,
          coverCharge: body.cover_charge,
          cashOnly: body.cash_only,
          imageUrl: body.image_url
        })
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`));
    }
  }

  handleFormSubmit(event) {
    event.preventDefault();
    let formPayload = {
      name: this.state.name,
      address: this.state.address,
      city: this.state.city,
      state: this.state.state,
      zip: this.state.zip,
      website: this.state.website,
      age_restriction: this.state.ageRestriction,
      food_options: this.state.foodOptions,
      parking: this.state.parking,
      hours: this.state.hours,
      phone: this.state.phone,
      dress_code: this.state.dressCode,
      cover_charge: this.state.coverCharge,
      cash_only: this.state.cashOnly,
      image_url: this.state.imageUrl
    };
    if(this.props.params.id){
      this.updateVenue(formPayload);
    } else {
      this.addNewVenue(formPayload);
    }
    this.handleClearForm(event);
  }

  handleClearForm(event){
    event.preventDefault();
    this.setState({
      name: '',
      address: '',
      city: '',
      state: '',
      zip: '',
      website: '',
      ageRestriction: '',
      foodOptions: '',
      parking: '',
      hours: '',
      phone: '',
      dressCode: '',
      coverCharge: '',
      cashOnly: '',
      imageUrl: ''
    });
  }

  render() {
    return(
      <div className='venue-form'>
        <form className="new-venue-form callout" onSubmit={this.handleFormSubmit}>
          <div className='row'>
            <div className="six columns">
              <TextField
                content={this.state.name}
                label="Venue Name*"
                name="name"
                onChange={this.handleChange}
              />
              <TextField
                content={this.state.address}
                label="Street Address*"
                name="address"
                onChange={this.handleChange}
              />
              <TextField
                content={this.state.city}
                label="City*"
                name="city"
                onChange={this.handleChange}
              />
              <SelectField
                content={this.state.state}
                label="State*"
                name="state"
                options={state}
                onChange={this.handleChange}
              />
              <TextField
                content={this.state.zip}
                label="Zip*"
                name="zip"
                onChange={this.handleChange}
              />
              <TextField
                content={this.state.website}
                label="Venue Website"
                name="website"
                onChange={this.handleChange}
              />
              <TextField
                content={this.state.phone}
                label="Venue Phone"
                name="phone"
                onChange={this.handleChange}
              />
            </div>
            <div className="six columns">
              <SelectField
                content={this.state.ageRestriction}
                label="Age Restriction"
                name="ageRestriction"
                options={["All Ages", "18+", "21+"]}
                onChange={this.handleChange}
              />
              <SelectField
                content={this.state.foodOptions}
                label="Food Options"
                name="foodOptions"
                options={["None", "Limited Menu", "Full Menu"]}
                onChange={this.handleChange}
              />
              <SelectField
                content={this.state.parking}
                label="Parking"
                name="parking"
                options={["Has Parking Lot","No Parking Lot"]}
                onChange={this.handleChange}
              />
              <TextField
                content={this.state.hours}
                label="Business Hours"
                name="hours"
                onChange={this.handleChange}
              />
              <TextField
                content={this.state.dressCode}
                label="Dress Code"
                name="dressCode"
                onChange={this.handleChange}
              />
              <SelectField
                content={this.state.coverCharge}
                label="Cover Charge"
                name="coverCharge"
                options={["YES", "NO", "Depends"]}
                onChange={this.handleChange}
              />
              <SelectField
                content={this.state.cashOnly}
                label="Cash Only"
                name="cashOnly"
                options={["NO","YES"]}
                onChange={this.handleChange}
              />
              <TextField
                content={this.state.imageUrl}
                label="Venue Cover Photo"
                name="imageUrl"
                onChange={this.handleChange}
              />
            </div>
          </div>
          <div className="button-group row">
            <span className="custom-button" onClick={this.handleClearForm} >Clear</span>
            <input className="custom-button" type="submit" value="Submit" />
          </div>
        </form>
      </div>
    )
  }
}
export default VenueFormContainer;
