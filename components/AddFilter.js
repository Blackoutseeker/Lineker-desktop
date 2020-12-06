import { useState, useEffect } from 'react'
import { ADD_FILTER, RES_FILTER } from '../store/actions/Filter'
import { SET_FILTER } from '../store/actions/CurrentFilter'
import { useSelector, useDispatch } from 'react-redux'
import { ReactComponent as Plus } from '../svgs/plus.svg'
import firebase from '../utils/Firebase'

const AddFilter = (props) => {
  
  const dispatch = useDispatch()
  const filters = useSelector(state => state.filter)
  const [value, setValue] = useState('')
  const { theme, id } = props

  useEffect(() => {
    getFilters()
  }, [])

  const getFilters = async() => {
    await firebase.database().ref(`users/${id}/filters/`).on('value', (snapshot) => {
      const getData = []
      snapshot.forEach((snapshotchild) => {
        getData.push({
          filter: snapshotchild.val().filter
        })
      })
      dispatch({type: RES_FILTER})
      getData.forEach(({filter}) => {
        dispatch({type: ADD_FILTER, payload: {filter: filter}})
      })
    })
  }

  const verify = () => {
    let confirm = 0
    filters.map(item => {
      if(String(item.filter) === value) {
        confirm += 1
      }
    })
    if(confirm === 0) {
      return true
    }
    else {
      return false
    }
  }

  const addFilter = async() => {
    if(value !== '') {
      if(verify()) {
        setValue('')
        await firebase.database().ref(`users/${id}/filters/${value}`).set({filter: value})
        .then(() => {
          dispatch({type: SET_FILTER, payload: {setFilter: value}})
        })
      }
    }
  }

  const handleKeyboardEnter = (key) => {
    if(key === 'Enter') {
      addFilter()
    }
  }

  const changeValue = (value) => {
    setValue(value)
  }

  return (
    <>
    <button className={'add-filter-button'}
    onClick={() => {addFilter()}} >
      <Plus fill={'#fff'} width={15} />
    </button>
    <input className={'add-input'} value={value}
    id={theme ? 'dark-input' : 'light-input'}
    onChange={({target}) => {changeValue(target.value)}}
    onKeyDown={({key}) => {handleKeyboardEnter(key)}}
    placeholder={'Create filter'} />
    </>
  )
}

export default AddFilter