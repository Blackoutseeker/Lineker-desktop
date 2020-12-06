import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { MAIN } from '../store/actions/CurrentRoute'
import { LOGIN } from '../store/actions/User'
import MenuBar from '../components/MenuBar'
import QrApp from '../components/QrApps'
import DialogBox from '../components/DialogBoxes'
import { ReactComponent as Lineker } from '../svgs/Lineker.svg'
import { ReactComponent as Envelope } from '../svgs/envelope.svg'
import { ReactComponent as Key } from '../svgs/key.svg'
import { ReactComponent as Eye } from '../svgs/eye.svg'
import { ReactComponent as EyeSlash } from '../svgs/eye-slash.svg'
import firebase from '../utils/Firebase'

const Sign = () => {

  require('../styles/pages/Sign.css')
  const dispatch = useDispatch()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passVisible, setPassVisible] = useState(false)
  const [createAccount, setCreateAccount] = useState(false)
  const [boxType, setBoxType] = useState(null)

  const createNewAccount = async() => {
    if(email !== '' && password.length >= 6) {
      await firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(async() => {
        await firebase.auth().signInWithEmailAndPassword(email, password)
        await firebase.auth().currentUser.sendEmailVerification()
        showDialog(2)
        const getUserData = {
          email: email,
          id: firebase.auth().currentUser.uid
        }
        createDataBase(getUserData.id)
        dispatch({type: LOGIN, payload: {...getUserData}})
        dispatch({type: MAIN})
      })
      .catch(() => {showDialog(4)})
    }
  }

  const login = async() => {
    if(email !== '' && password !== '') {
      await firebase.auth().signInWithEmailAndPassword(email, password)
      .then(() => {
        if(firebase.auth().currentUser.emailVerified) {
          const getUserData = {
            email: email,
            id: firebase.auth().currentUser.uid
          }
          dispatch({type: LOGIN, payload: {...getUserData}})
          dispatch({type: MAIN})
        }
        else {
          showDialog(2)
        }
      })
      .catch(() => {
        showDialog(1)
      })
    }
  }

  const createDataBase = async(userId) => {
    await firebase.database().ref(`users/${userId}`).set({
      email: email,
      filters: {
        Default: {
          filter: 'Default'
        }
      }
    })
  }

  const showDialog = (type) => {
    setBoxType(type)
    setTimeout(() => {setBoxType(null)}, 6000)
  }

  const resetPassword = async() => {
    if(email !== '') {
      await firebase.auth().sendPasswordResetEmail(email).then(() => {
        showDialog(3)
      })
    }
  }

  const enterSign = (key) => {
    if(key === 'Enter') {
      if(createAccount) {
        createNewAccount()
      }
      else {
        login()
      }
    }
  }

  const changeText = (value, type) => {
    if(type === 1) {
      setEmail(value)
    }
    else if(type === 2) {
      setPassword(value)
    }
  }

  const changePasswordVisibility = () => {
    setPassVisible(!passVisible)
  }

  const changeCreateAccountState = () => {
    setCreateAccount(true)
  }

  return (
    <>
    <MenuBar showItems={false} />
    <main>
      <QrApp platform={'app'} qrValue={'Coming soon... Sorry!'} />
      <div className={'form-content'} >
        <h1>
          <span className={'white-chars'} >Lin</span>
          <span className={'gray-chars'} >e</span>
          <span className={'white-chars'} >k</span>
          <span className={'gray-chars'} >er</span>
        </h1>
        <Lineker className={'logo'} />
        <span className={'description'} >Acess links between your devices</span>
        <div className={'input-content'} >
          <div className={'input-icon-content'} >
            <Envelope fill={'#fff'} width={32} />
          </div>
          <input value={email} onChange={({target}) => {changeText(target.value, 1)}} onKeyDown={({key}) => {enterSign(key)}}
          placeholder={'Email address'} />
        </div>
        <div className={'input-content'}
        id={createAccount ? 'password-input-content-down' : null} >
          <div className={`input-icon-content ${createAccount && password.length > 0 && password.length < 6 ? 'invalid-content' : null }`}
          id={'key-content'} >
            <Key fill={'#fff'} width={25} />
          </div>
          <input value={password} onChange={({target}) => {changeText(target.value, 2)}} onKeyDown={({key}) => {enterSign(key)}}
          className={createAccount && password.length > 0 && password.length < 6 ? 'invalid-input' : null}
          type={passVisible ? 'text' : 'password'} id={'pass-input'} placeholder={'Password'} />
          <button id={'eye-content'} onClick={() => {changePasswordVisibility()}} >
            {!passVisible ? <Eye fill={'#222'} width={35} /> : <EyeSlash fill={'#222'} width={35} />}
          </button>
        </div>
        <div className={'messages-content'} id={createAccount ? 'messages-forgot-up' : null} >
          <span className={'messages'} id={createAccount ? 'forgot-content-up' : null}
          // eslint-disable-next-line no-unused-expressions
          onClick={() => {!createAccount ? resetPassword() : null}} >
            {!createAccount ? 'Forgot your password?': 'The password must have 6 or more characters'}
          </span>
        </div>
        <button className={'sign-button'} onClick={() => {createAccount ? createNewAccount() : login()}} >
          <span className={'button-text'} >{!createAccount ? 'Sign-In' : 'Sign-Up'}</span>
        </button>
        <div className={'messages-content'} id={'messages-create-account'} >
          <span className={'messages'} id={!createAccount ? 'create-account' : 'create-account-dismiss' }
          onClick={() => {changeCreateAccountState()}} >Don't have an account? Do it now!</span>
        </div>
      </div>
      <QrApp platform={'play'} qrValue={'https://github.com/Blackoutseeker'} />
      <DialogBox type={boxType} />
    </main>
    </>
  )
}

export default Sign