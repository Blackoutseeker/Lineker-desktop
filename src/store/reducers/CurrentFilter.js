import { SET_FILTER } from '../actions/CurrentFilter'
const INITIAL_STATE = 'Default'

const CurrentFilter = (state=INITIAL_STATE, action) => {
  switch(action.type) {
    case SET_FILTER:
      return action.payload.setFilter
    default:
      return state
  }
}

export default CurrentFilter