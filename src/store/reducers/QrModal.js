import { SET_QR_URL } from '../actions/QrModal'
const INITIAL_STATE = ''

const QrModal = (state=INITIAL_STATE, action) => {
  switch(action.type) {
    case SET_QR_URL:
      return state = action.payload.setQrUrl
    default:
      return state
  }
}

export default QrModal