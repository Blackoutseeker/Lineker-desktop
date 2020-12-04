import { INIT, MAIN } from '../actions/CurrentRoute'
const INITIAL_STATE = '/'

const Route = (state=INITIAL_STATE, action) => {
  switch(action.type) {
    case INIT:
      return '/'
    case MAIN:
      return '/main'
    default:
      return state
  }
}

export default Route