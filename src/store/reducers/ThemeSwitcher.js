import { LIGHT, DARK } from '../actions/Theme'
const INITIAL_STATE = false

const ThemeSwitcher = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LIGHT:
      return false
    case DARK:
      return true
    default:
      return state
  }
}

export default ThemeSwitcher