import { memo } from 'react'
import { SET_FILTER } from '../store/actions/CurrentFilter'
import { useSelector, useDispatch } from 'react-redux'
import { ReactComponent as ArrowLeft } from '../svgs/arrow-left.svg'
import { ReactComponent as Times } from "../svgs/times.svg";
import ScrollContainer from 'react-indiana-drag-scroll'
import AddFilter from './AddFilter'
import firebase from '../utils/Firebase'

const Drawer = (props) => {

  require('../styles/components/Drawer.css')
  const filters = useSelector(state => state.filter)
  const currentFilter = useSelector(state => state.currentFilter)
  const dispatch = useDispatch()
  const { show, theme, id, backButton, drawer } = props

  const deleteFilter = async(filter) => {
    await firebase.database().ref(`users/${id}/filters/${filter}`).remove()
    await firebase.database().ref(`users/${id}/links/${filter}`).remove()
    .then(() => {
      dispatch({type: SET_FILTER, payload: {setFilter: 'Default'}})
    })
  }

  const closeDrawer = () => {
    drawer(false)
  }

  return (
    <>
    <div className={`drawer-content ${show ? 'show-drawer' : 'hide-drawer'}`}
    id={theme ? 'dark-drawer' : 'light-drawer'} >
      <div className={'drawer-header'} >
        {backButton}
        <button className={'back-content button-over'} onClick={() => {closeDrawer()}} >
          <ArrowLeft fill={'#fff'} width={20} />
        </button>
        <h4 className={'drawer-title'} >Filters</h4>
      </div>
      <div className={'add-filter-content'} >
        <AddFilter theme={theme} id={id} />
      </div>
      <ScrollContainer className={'handle-filters'} >
        {filters.map((item, index) => 
          <div className={`filter-container 
          ${currentFilter === item.filter ? theme ? 'dark-container-selected' : 'light-container-selected' : ''}`}
          id={theme ? 'dark-container-over' : 'light-container-over'} key={index.toString()}
          onClick={() => {dispatch({type: SET_FILTER, payload: {setFilter: item.filter}})}} >
            <div className={`filter-content 
            ${currentFilter === item.filter ? theme ? 'dark-content-selected' : 'light-content-selected' : ''}`}
            id={theme ? 'dark-content-over' : 'light-content-over'} title={item.filter} >
              <h4 className={'filter-name'} >
                {String(item.filter).length < 20 ? item.filter : String(item.filter).slice(0, 20) + '...'}
              </h4>
              {item.filter !== 'Default' ?
              <div className={'del-filter-content'} onClick={() => {deleteFilter(item.filter)}} >
                <Times fill={'#fff'} width={8} />
              </div>
              : null}
            </div>
          </div>
        )}
      </ScrollContainer>
    </div>
    </>
  )
}

export default memo(Drawer)