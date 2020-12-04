import { LOGIN } from '../actions/User'
const INITIAL_STATE = null

const UserInfo = (state=INITIAL_STATE, action) => {
  switch(action.type) {
    case LOGIN:
      return {...action.payload}
    default:
      return state
  }
}

export default UserInfo