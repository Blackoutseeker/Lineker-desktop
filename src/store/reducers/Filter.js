import { ADD_FILTER, RES_FILTER } from '../actions/Filter'
const INITIAL_STATE = [
  {filter: 'Default'}
]

const Filter = (state=INITIAL_STATE, action) => {
  switch(action.type) {
    case ADD_FILTER:
      return state.concat({filter: action.payload.filter})
    case RES_FILTER:
      return state = []
    default:
      return state
  }
}

export default Filter