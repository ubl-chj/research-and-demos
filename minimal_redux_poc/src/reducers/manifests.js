import manifesto from 'manifesto.js';

/**
 * manifestsReducer
 */
const manifestsReducer = (state = {}, action) => {
  switch (action.type) {
    case 'REQUEST_MANIFEST':
      return {
        ...state,
        [action.url]: {
          isFetching: true,
        },
      };
    case 'RESOLVE_MANIFEST':
      return {
        ...state,
        [action.url]: {
          manifestation: manifesto.create(action.json),
          isFetching: false,
        },
      };
    case 'REJECT_MANIFEST':
      return {
        ...state,
        [action.url]: {
          error: action.error,
          isFetching: false,
        },
      };
    default: return state;
  }
};

export default manifestsReducer;
