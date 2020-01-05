/* SELECTORS */

export const getAllFilters = ({filters}) => filters;

/* ACTIONS */

// action name creator
const reducerName = 'filters';
const createActionName = name => `app/${reducerName}/${name}`;

// action types
export const CHANGE_PHRASE = createActionName('CHANGE_PHRASE');
export const CHANGE_DURATION_MIN = createActionName('CHANGE_DURATION_MIN');
export const CHANGE_DURATION_MAX = createActionName('CHANGE_DURATION_MAX');
export const ADD_TAG = createActionName('ADD_TAG');
export const REMOVE_TAG = createActionName('REMOVE_TAG');

// action creators
export const changeSearchPhrase = payload => ({ payload, type: CHANGE_PHRASE });
export const changeDurationMin = payload => ({ payload, type: CHANGE_DURATION_MIN });
export const changeDurationMax = payload => ({ payload, type: CHANGE_DURATION_MAX });
export const addTag = payload => ({ payload, type: ADD_TAG });
export const removeTag = payload => ({ payload, type: REMOVE_TAG});

// reducer
export default function reducer(statePart = [], action = {}) {
  switch (action.type) {
    case CHANGE_PHRASE:
      return {
        ...statePart,
        searchPhrase: action.payload,
      };
    case CHANGE_DURATION_MIN:
      return {
        ...statePart,
        duration: {from: action.payload, to: statePart.duration.to},
      };
    case CHANGE_DURATION_MAX:
      return {
        ...statePart,
        duration: {to: action.payload, from: statePart.duration.from},
      };
    case ADD_TAG:
      return {
        ...statePart,
        tags: [...statePart.tags, action.payload],
      };
    case REMOVE_TAG:
      for(let tag of statePart.tags){
        if(tag === action.payload) { 
          statePart.tags.splice(statePart.tags.indexOf(tag), 1);
        }
      }
      return {
        ...statePart,
      };
    default:
      return statePart;
  }
}
