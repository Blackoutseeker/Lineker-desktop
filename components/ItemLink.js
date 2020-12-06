import { memo } from 'react'
import QrLink from './QrLink'
import CopyBox from './CopyBox'
import { ReactComponent as Lock } from '../svgs/lock.svg'
import { ReactComponent as Alert } from '../svgs/exclamation-triangle.svg'
import { ReactComponent as Trash } from '../svgs/trash.svg'
import firebase from '../utils/Firebase'

const ItemLink = (props) => {

  require('../styles/components/ItemLink.css')
  const { shell } = window.require('electron')
  const { theme, drawer, filter, id, datetime, url, title, date, index } = props

  const deleteLink = async() => {
    await firebase.database().ref(`users/${id}/links/${filter}/${datetime}`).remove()
  }

  const openLink = () => {
    shell.openExternal(url)
  }

  const reduceString = (word) => {
    if(!drawer) {
      return String(word).length < 30 ? word : String(word).slice(0, 30) + '...'
    }
    else {
      return String(word).length < 22 ? word : String(word).slice(0, 22) + '...'
    }
  }

  return (
    <>
    <div className={`item-content ${theme ? 'dark-item' : 'light-item'}`} id={drawer ? 'shorten-item' : ''} key={String(index)} >
      <QrLink value={url} theme={theme} />
      <div className={'certificate-content'} >
      {String(url).includes('https') ? <Lock fill={'#fff'} height={20} /> : <Alert fill={'#fff'} height={20} />}
      </div>
      <div className={'link-content'} id={drawer ? 'shorten-link' : ''} >
        <div className={'title-content'} horizontal >
          <span className={'title'} >{reduceString(title)}</span>
        </div>
        <div className={'link-container'} >
          <div className={'url-content'} horizontal >
            <span onClick={() => {openLink()}} className={'url'} id={theme ? 'dark-info' : 'light-info'} >{reduceString(url)}</span>
          </div>
          <div className={'date-content'} >
            <span className={'date'} id={theme ? 'dark-info' : 'light-info'} >{date}</span>
          </div>
        </div>
      </div>
      <CopyBox url={url} theme={theme} />
      <div className={`boxes-contents left-border-boxe delete-boxe 
      ${theme ? 'dark-boxes-border' : 'light-boxes-border'}`}
      onClick={() => {deleteLink()}} >
        <Trash fill={'#fff'} width={20} />
      </div>
    </div>
    </>
  )
}

export default memo(ItemLink)