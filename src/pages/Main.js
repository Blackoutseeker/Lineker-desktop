import { useEffect, useState, useCallback } from 'react'
import { ADD_LINK, RES_LINK } from '../store/actions/Links'
import { SET_QR_URL } from '../store/actions/QrModal'
import { useDispatch, useSelector } from 'react-redux'
import MenuBar from '../components/MenuBar'
import VoidLink from '../components/VoidLink'
import Drawer from '../components/Drawer'
import ItemLink from '../components/ItemLink'
import QrCode from 'qrcode.react'
import SignOut from '../components/SignOut'
import { ReactComponent as Search } from '../svgs/search.svg'
import { ReactComponent as Plus } from '../svgs/plus.svg'
import { ReactComponent as Slider } from '../svgs/sliders-h.svg'
import { ReactComponent as ArrowUp } from '../svgs/arrow-up.svg'
import { ReactComponent as ArrowDown } from '../svgs/arrow-down.svg'
import { ReactComponent as Paste } from '../svgs/copy.svg'
import firebase from '../utils/Firebase'

const Main = () => {

  require('../styles/pages/Main.css')
  const { clipboard } = window.require('electron')
  const dispatch = useDispatch()
  const theme = useSelector(state => state.theme)
  const userInfo = useSelector(state => state.userInfo)
  const links = useSelector(state => state.links)
  const currentFilter = useSelector(state => state.currentFilter)
  const modal = useSelector(state => state.qrModal)
  const [data, setData] = useState(null)
  const [filter, setFilter] = useState('Default')
  const [addContent, setAddContent] = useState(false)
  const [drawer, setDrawer] = useState(false)
  const [search, setSearch] = useState(false)
  const [searchValue, setSearchValue] = useState('')
  const [titleValue, setTitleValue] = useState('')
  const [linkValue, setLinkValue] = useState('')
  const [loaded, setLoaded] = useState(false)
  const [signOut, setSignOut] = useState(false)

  useEffect(() => {
    if(Array.isArray(links) && links.length) {
      setData(links)
    }
  }, [links])

  useEffect(() => {
    if(filter !== currentFilter) {
      setLoaded(false)
    }
    refresh()
    return () => {
      refresh()
    }
  }, [currentFilter])

  const refresh = useCallback(async() => {
    setFilter(currentFilter)
    await firebase.database().ref(`users/${userInfo.id}`).on('value', async(snpashot) => {
      if(snpashot.hasChild('links')) {
        if(snpashot.child('links').hasChild(currentFilter)) {
          const getData = []
          snpashot.child('links').child(currentFilter).forEach((snpashotchild) => {
            getData.push({
              title: snpashotchild.val().title,
              url: snpashotchild.val().url,
              date: snpashotchild.val().date,
              datetime: snpashotchild.val().datetime
            })
          })
          setData(getData)
          dispatch({type: RES_LINK})
          getData.forEach((item) => {
            dispatch({type: ADD_LINK, payload: {newLink: item}})
          })
          setData(links)
          setFilter(currentFilter)
          setLoaded(true)
        }
        else {
          dispatch({type: RES_LINK})
          setData(null)
          setLoaded(true)
        }
      }
      else {
        dispatch({type: RES_LINK})
        setData(null)
        setLoaded(true)
      }
    })
  }, [currentFilter])

  const addLink = async() => {
    if(linkValue !== '') {
      const date = new Date()
      const day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
      const month = date.getMonth() < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
      const newLink = {
        title: titleValue === '' ? 'Untitled' : titleValue,
        url: linkValue,
        date: `${day}/${month}/${date.getFullYear()}`,
        datetime: `${day}-${month}-${date.getFullYear()}-${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
      }
      await firebase.database().ref(`users/${userInfo.id}/links/${currentFilter}/${newLink.datetime}`).set(newLink)
    }
  }

  const changeText = (value, type) => {
    if(type === 1) {
      setSearchValue(value)
    }
    else if(type === 2) {
      setTitleValue(value)
    }
    else if(type === 3) {
      setLinkValue(value)
    }
  }

  const changeSearchState = () => {
    if(data !== null) {
      setSearch(true)
    }
  }

  const changeAddState = () => {
    setAddContent(true)
  }

  const changeDrawerState = () => {
    setDrawer(true)
  }

  const pasteLink = () => {
    setLinkValue(clipboard.readText())
  }

  const hideAddHolder = () => {
    setAddContent(false)
    setTitleValue('')
    setLinkValue('')
  }

  const hideSearchHolder = () => {
    setSearch(false)
    setSearchValue('')
  }

  const handleKeyboardEnter = (key) => {
    if(key === 'Enter') {
      addLink()
    }
  }

  const setQrURL = () => {
    dispatch({type: SET_QR_URL, payload: {setQrUrl: ''}})
  }

  const bypassData = links.filter((item) => {
    return String(item.title).toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()) ||
    String(item.url).toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()) ||
    String(item.date.toLocaleLowerCase()).includes(searchValue.toLocaleLowerCase())
  })

  return (
    <>
    <MenuBar showItems={true} theme={theme} email={userInfo.email} setSignOut={setSignOut} />
    <main className={theme ? 'dark-main' : 'light-main'} >
      <div className={`spin-content ${theme ? 'dark-holder' : 'light-holder'}`}
      id={loaded ? 'hide-spin' : 'show-spin'} >
        <div className={'spin'} />
      </div>
      <div className={`drawer-holder ${drawer ? 'drawer-opened' : ''} 
      ${theme ? 'dark-border' : 'light-border'}`} >
        <Drawer show={drawer} drawer={setDrawer} theme={theme} id={userInfo.id} />
      </div>
      <div className={'list-content'} >
        <div className={`search-holder ${theme ? 'dark-border' : 'light-border'} 
        ${drawer ? 'drawer-pull' : ''} ${search ? 'show-search' : 'hide-search'}
        ${theme ? 'dark-holder' : 'light-holder'}`} >
          <input className={'search-input'} value={searchValue}
          onChange={({target}) => {changeText(target.value, 1)}}
          id={theme ? 'dark-search' : 'light-search'}
          placeholder={'Title, URL, date...'} />
          <button className={'search-hide-button  button-over'} onClick={() => {hideSearchHolder()}} >
            <ArrowUp fill={'#fff'} height={25} />
          </button>
        </div>
        <button className={`main-button search-button 
        ${search ? 'hide-search-button' : 'show-search-button'}`}
        id={theme ? 'dark-button' : 'light-button'}
        onClick={() => {changeSearchState()}} >
          <Search fill={'#fff'} height={25} width={25} />
        </button>
        <button className={'main-button add-button'} id={theme ? 'dark-button' : 'light-button'}
        onClick={() => {changeAddState()}} >
          <Plus fill={'#fff'} height={25} width={25} />
        </button>
        <button className={`main-button filter-button 
        ${search ? 'hide-search-button' : 'show-search-button'}`} id={theme ? 'dark-button' : 'light-button'}
        onClick={() => {changeDrawerState()}} >
          <Slider fill={'#fff'} height={25} width={25} />
        </button>
        <div className={'place-items-content'} >
          <div className={`${!drawer ? 'pull-items' : 'pull-hide'}`} />
          <div className={`place-items-content ${search ? 'place-items-content-pull' : ''}`} id={'list'} >
            {data !== null ?
            bypassData.reverse().map((item, index) =>
              <ItemLink drawer={drawer} theme={theme} index={index}
              title={item.title} url={item.url} date={item.date} id={userInfo.id}
              filter={currentFilter} datetime={item.datetime} />
            ) : <VoidLink />}
          </div>
          <div className={'pull-items'} />
        </div>
        <div className={`add-holder ${drawer ? 'drawer-pull' : ''} 
        ${theme ? 'dark-border' : 'light-border'}
        ${theme ? 'dark-holder' : 'light-holder'}`}
        id={addContent ? 'show-add' : 'hide-add'} >
          <button className={'main-button add-button-holder'} onClick={() => {addLink()}} >
            <Plus fill={'#fff'} width={25} />
          </button>
          <div className={'add-inputs-content'} >
            <input className={'add-input-holder'} value={titleValue} onChange={({target}) => {changeText(target.value, 2)}}
            id={theme ? 'dark-search' : 'light-search'} placeholder={'Title'}
            onKeyDown={({key}) => {handleKeyboardEnter(key)}} />
            <input className={'add-input-holder'} value={linkValue} onChange={({target}) => {changeText(target.value, 3)}}
            id={theme ? 'dark-search' : 'light-search'} placeholder={'URL'}
            onKeyDown={({key}) => {handleKeyboardEnter(key)}} />
          </div>
          <button className={'paste-button'} onClick={() => {pasteLink()}} >
            <Paste fill={'#fff'} width={15} />
          </button>
          <button className={'hide-add-content button-over'} onClick={() => {hideAddHolder()}}
          id={drawer ? 'take-to-left' : 'take-to-original'} >
            <ArrowDown fill={'#fff'} width={25} />
          </button>
        </div>
      </div>
      <div className={'modal'} onClick={() => {setQrURL()}}
      id={modal !== '' ? 'show-modal' : 'hide-modal'} />
      <div className={'qr-modal-content'} id={modal !== '' ? 'show-modal' : 'hide-modal'} >
        <QrCode size={250} value={modal} renderAs={'svg'} />
      </div>
      <SignOut signOut={signOut} setSignOut={setSignOut} theme={theme} />
    </main>
    </>
  )
}

export default Main