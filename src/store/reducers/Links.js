import { ADD_LINK, DEL_LINK, RES_LINK } from '../actions/Links'
const INITIAL_STATE = []

const Links = (state=INITIAL_STATE, action) => {
  switch(action.type) {
    case ADD_LINK:
      //return state.concat({...action.payload.newLink})
      return state.concat(action.payload.newLink)
    case DEL_LINK:
      return state.filter((item, index) => index !== action.payload.index ||
      item.title !== action.payload.title || item.url !== action.payload.url)
    case RES_LINK:
      return state = []
    default:
      return state
  }
}

export default Links