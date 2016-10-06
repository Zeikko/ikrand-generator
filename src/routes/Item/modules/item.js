import axios from 'axios'
import _ from 'lodash'

// ------------------------------------
// Constants
// ------------------------------------
export const GENERATE_ITEM = 'GENERATE_ITEM'
export const ITEM_TYPES = 'ITEM_TYPES'
export const SET_ITEM_TYPE = 'SET_ITEM_TYPE'
export const SET_ENCHANTMENT_COUNT = 'SET_ENCHANTMENT_COUNT'

// ------------------------------------
// Actions
// ------------------------------------

export function generateItem() {
  return (dispatch, getState) => {
    const enchantments = getState().item.parameters.enchantments
    return axios.get('/generate-item', {
        params: {
          'aspects[placeholder]': enchantments === 'random' ? _.random(1,3) : parseInt(enchantments),
          type: getState().item.parameters.type
        }
      })
      .then(function (response) {
        return dispatch({
          type: GENERATE_ITEM,
          payload: response.data
        })
      })
  }
}

export function getItemTypes() {
  return (dispatch, getState) => {
    return axios.get('/item-types')
      .then(function (response) {
        return dispatch({
          type: ITEM_TYPES,
          payload: response.data
        })
      })
  }
}

export function setItemType(event) {
  return {
    type: SET_ITEM_TYPE,
    payload: event.target.value
  }
}

export function setEnchantmentCount(event) {
  return {
    type: SET_ENCHANTMENT_COUNT,
    payload: event.target.value
  }
}

export const actions = {
  generateItem,
  getItemTypes,
  setItemType,
  setEnchantmentCount
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [GENERATE_ITEM]: (state, action) => {
    return {
      ...state,
      result: action.payload
    }
  },
  [ITEM_TYPES]: (state, action) => {
    return {
      ...state,
      itemTypes: action.payload
    }
  },
  [SET_ITEM_TYPE]: (state, action) => {
    return {
      ...state,
      parameters: {
        ...state.parameters,
        type: action.payload
      }
    }
  },
  [SET_ENCHANTMENT_COUNT]: (state, action) => {
    return {
      ...state,
      parameters: {
        ...state.parameters,
        enchantments: action.payload
      }
    }
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  result: {
    descriptions: []
  },
  itemTypes: [],
  parameters: {
    type: 'item',
    enchantments: 'random'
  }
}
export default function itemReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}

