import VenuesIndexContainer from '../../src/containers/VenuesIndexContainer';
import VenuesIndexTile from '../../src/components/VenuesIndexTile';

describe ('VenuesIndexContainer', () => {
  let wrapper;
  let venue1 = [{
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

  beforeEach(() => {
    jasmineEnzyme();
    wrapper = mount(
      <VenuesIndexContainer
        data={venue1}
      />
    )
  });

  it('should have an initial state as an empty array', () => {
    expect(wrapper.state()).toEqual({ venues: [] })
  });

  it('should render a div tag', () => {
    expect(wrapper.find('div')).toBePresent();
  });

  it('should render a VenuesIndexTile Component', () => {
    wrapper.setState({ venues: venue1 })
    expect(wrapper.find(VenuesIndexTile)).toBePresent();
  });

  it('should render the VenuesIndexTile with different props, when venues is not an empty array', () => {
    wrapper.setState({ venues: venue1 });
    expect(wrapper.find(VenuesIndexTile).props()).toEqual({
      id: 1,
      name: "Tattooed Moms",
      address: "504 south st.",
      city: "Philadelphia",
      state: "PA",
      zip: "19109",
      imageUrl: "http://blackonthecanvas.com/wp-content/uploads/2014/04/IMG_6260-1024x683.jpg"
    })
  });
})