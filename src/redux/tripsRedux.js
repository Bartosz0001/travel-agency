/* SELECTORS */

export const getAllTrips = ({trips}) => trips;

export const getFilteredTrips = ({trips, filters}) => {
  let output = trips;

  // filter by search phrase
  if(filters.searchPhrase){
    const pattern = new RegExp(filters.searchPhrase, 'i');
    output = output.filter(trip => pattern.test(trip.name));
  }

  // filter by duration
  if(filters.duration){
    output = output.filter(trip => (trip.days >= filters.duration.from && trip.days <= filters.duration.to));
  }

  // filter by tags
  if(filters.tags){
    let indexArray = [];
    for(let tag of filters.tags){
      for(let trip of output){
        let passed = false;
        for(let tripTag of trip.tags){
          if(tripTag === tag) {
            passed = true; 
            break;
          }
        }
        if(passed === false) indexArray.push(trip.id);
      }
    }
    output = output.filter(trip => indexArray.some(index => index === trip.id) === false);
  }

  // sort by cost descending (most expensive goes first)
  output = output.sort(compare);

  function compare(a,b){
    a = a.cost.replace('$', '').replace(',', '').replace('.', '');
    b = b.cost.replace('$', '').replace(',', '').replace('.', '');
    a = parseInt(a);
    b = parseInt(b);
    let comparsion = 0;
    if(a<b) comparsion = 1;
    else if(a>b) comparsion = -1;
    return comparsion;
  }

  return output;
};

export const getTripById = ({trips}, tripId) => {
  let filtered = [];

  for(let trip of trips){
    if(trip.id === tripId) filtered.push(trip);
  }

  console.log('filtering trips by tripId:', tripId, filtered);
  return filtered.length ? filtered[0] : {error: true};
};

export const getTripsForCountry = ({trips}, countryCode) => {
  let filtered = [];

  for(let trip of trips){
    if(trip.country.code === countryCode) filtered.push(trip);
  }

  console.log('filtering trips by countryCode:', countryCode, filtered);
  return filtered.length ? filtered : [{error: true}];
};

/* ACTIONS */

/*
// action name creator
const reducerName = 'trips';
const createActionName = name => `app/${reducerName}/${name}`;

// action types


// action creators


// reducer
export default function reducer(statePart = [], action = {}) {
  switch (action.type) {
    default:
      return statePart;
  }
}
 */
