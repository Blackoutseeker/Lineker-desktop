import { memo } from 'react'
import '../styles/components/MenuBar.css'
import { DARK, LIGHT } from '../store/actions/Theme'
import { ReactComponent as Lineker } from '../svgs/Lineker.svg'
import { ReactComponent as Minus } from '../svgs/minus.svg'
import { ReactComponent as Times } from '../svgs/times.svg'
import { ReactComponent as Moon } from '../svgs/moon.svg'
import { ReactComponent as Sun } from '../svgs/sun.svg'
import { useDispatch } from 'react-redux'
const { remote } = window.require('electron')

const MenuBar = (props) => {

  const { theme, email, showItems, setSignOut } = props
  const dispatch = useDispatch()

  const minimizeApp = () => {
    remote.BrowserWindow.getFocusedWindow().minimize()
  }

  const closeApp = () => {
    remote.getCurrentWindow().close()
  }

  const switchTheme = () => {
    !theme ? dispatch({type: DARK}) : dispatch({type: LIGHT})
  }

  const reduceEmail = () => {
    return String(email).length < 28 ? email : String(email).slice(0, 33) + '...'
  }

  const changeSignOutState = () => {
    setSignOut(true)
  }

  return (
    <div className={`menu-content ${theme ? 'dark-background' : 'light-background'}`}
    id={showItems ? theme ? 'dark-menu-border' : 'light-menu-border' : null} >
      {showItems ?
      <>
        <div className={'email-content'} id={theme ? 'dark-email-content' : 'light-email-content'}
        onClick={() => {changeSignOutState()}} >
          <Lineker className={'avatar'} />
          <span className={'email-holder'} >{reduceEmail()}</span>
        </div>
        <div className={'app-title'} >
          <span className={'white-char'} >Lin</span>
          <span className={theme ? 'dark-char' : 'light-char'} >e</span>
          <span className={'white-char'} >k</span>
          <span className={theme ? 'dark-char' : 'light-char'} >er</span>
        </div>
        <button className={'theme-button'} id={theme ? 'theme-button-dark' : 'theme-button-light'}
        onClick={() => {switchTheme()}} >
          {theme ? <Sun fill={'#fff'} height={20} /> : <Moon fill={'#111'} height={20} />}
        </button>
      </>
      : null}
      <div className={'window-options-content'} >
        <button className={'window-button'} id={theme ? 'dark-window-button' : 'light-window-button'}
        onClick={() => {minimizeApp()}} >
          <Minus fill={'#fff'} width={'12px'} id={'minimize-icon'} />
        </button>
        <button className={'window-button'} id={'close-content'}
        onClick={() => {closeApp()}} >
          <Times fill={'#fff'} width={'12px'} id={'close-icon'} />
        </button>
      </div>
    </div>
  )
}

export default memo(MenuBar)