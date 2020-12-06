import { memo } from 'react'
import { INIT } from '../store/actions/CurrentRoute'
import { SET_FILTER } from '../store/actions/CurrentFilter'
import { useDispatch } from 'react-redux'
import { ReactComponent as Sign } from '../svgs/sign-out-alt.svg'
import firebase from '../utils/Firebase'

const SignOut = (props) => {

  require('../styles/components/SignOut.css')
  const dispatch = useDispatch()
  const { signOut, setSignOut, theme } = props

  const handleSignOut = async() => {
    dispatch({type: INIT})
    dispatch({type: SET_FILTER, payload: {setFilter: 'Default'}})
    await firebase.auth().signOut()
  }

  const changeSignOutState = () => {
    setSignOut(false)
  }

  return (
    <>
    <div className={`sign-out-content ${theme ? 'dark-sign-out' : 'light-sign-out'}`}
    id={signOut ? 'show-sign-out' : 'hide-sign-out'} onClick={() => {handleSignOut()}} >
      <Sign className={'sign-out-icon'} fill={'#fff'} width={25} />
      <span className={'sign-out-text'} >Sign-Out</span>
    </div>
    <div className={'sign-out-modal'} id={signOut ? 'show-sign-out' : 'hide-sign-out'}
    onClick={() => {changeSignOutState()}} />
    </>
  )
}

export default memo(SignOut)