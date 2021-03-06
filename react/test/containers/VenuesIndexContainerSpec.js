import VenuesIndexContainer from '../../src/containers/VenuesIndexContainer';
import VenuesIndexTile from '../../src/components/VenuesIndexTile';

describe ('VenuesIndexContainer', () => {
  let wrapper;
  let venue1 = {
    venues: [{
      id: 1,
      name: "Tattooed Moms",
      address: "504 south st.",
      city: "Philadelphia",
      state: "PA",
      zip: "19109",
      website: "google.com",
      age_restriction: "21+",
      food_options: "bar food",
      parking: false,
      hours: "monday - sunday",
      phone: "215-555-5555",
      dress_code: "suit",
      cover_charge: "5 bucks",
      cash_only: false,
      image_url: "http://blackonthecanvas.com/wp-content/uploads/2014/04/IMG_6260-1024x683.jpg",
      created_at: "Tue, 05 Dec 2017 21:30:13 UTC +00:00",
      updated_at: "Tue, 05 Dec 2017 21:30:13 UTC +00:00"
    }]
  }

  beforeEach(() => {

    spyOn(global, 'fetch').and.callFake(() => {
      let responseBody = JSON.stringify(venue1);
      let response = new Response(responseBody, {
        status: '200',
        statusText: 'OK',
        headers: { 'Content-Type': 'application/json' }
      });
      return Promise.resolve(response);
    });

    wrapper = mount(<VenuesIndexContainer />);

  });

  it('should have the specified intial state', () => {
     expect(wrapper.state()).toEqual({
       venues: [],
       currentUser: null,
       currentPage: 1,
       venuesPerPage: 5
     })
  });

  it('should render a div tag', (done) => {
    setTimeout(() => {
      expect(wrapper.find('div')).toBePresent();
      done();
    }, 0)
  });

  it('should render the VenuesIndexTile with different props, when venues is not an empty array', (done) => {
    setTimeout(() => {
      expect(wrapper.find(VenuesIndexTile).at(0).props()).toEqual({
        id: 1,
        name: "Tattooed Moms",
        address: "504 south st.",
        city: "Philadelphia",
        state: "PA",
        zip: "19109",
        imageUrl: "http://blackonthecanvas.com/wp-content/uploads/2014/04/IMG_6260-1024x683.jpg"
      })
      done();
    }, 0)
  });
})
