import axios from 'axios'


// ------------------------------------
// Constants
// ------------------------------------
export const GENERATE_ITEM = 'GENERATE_ITEM'

// ------------------------------------
// Actions
// ------------------------------------

export function generateItem() {
  return (dispatch, getState) => {
    return axios.get('/generate-item', {
        params: {
          'aspects[placeholder]': 2,
          type: 'item'
        }
      })
      .then(function (response) {
        return dispatch({
          type: GENERATE_ITEM,
          payload: response.data
        })
      })
      .catch(function (error) {
        console.log(error);
      });
  }
}

export const actions = {
  generateItem
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [GENERATE_ITEM] : (state, action) => {
    return {
      name: action.payload.name,
      descriptions: action.payload.descriptions
    }
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  descriptions: []
}
export default function itemReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}

