import axios from 'axios'

const GENERATE = 'loot-generator/item/generate-item';

// Reducer
export default function reducer(state = {}, action = {}) {
  switch (action.type) {
    case 'GENERATE':
      return {
        name: action.name,
        description: action.description
      }
    default: return state;
  }
}

export function generateItem() {
  return dispatch => {
    return axios.get('/generate-item', {
        params: {
          'aspects[placeholder]': 2,
          type: 'item'
        }
      })
      .then(function (response) {
        console.log(response);
        return {
          type: GENERATE,
          ...response.data
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }
}
