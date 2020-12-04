import { combineReducers, createStore } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import ThemeSwitcher from './reducers/ThemeSwitcher'
import UserInfo from './reducers/UserInfo'
import Route from './reducers/Route'
import Links from './reducers/Links'
import Filter from './reducers/Filter'
import CurrentFilter from './reducers/CurrentFilter'
import QrModal from './reducers/QrModal'

const rootReducer = combineReducers({
  theme: ThemeSwitcher,
  userInfo: UserInfo,
  route: Route,
  links: Links,
  filter: Filter,
  currentFilter: CurrentFilter,
  qrModal: QrModal
})

const persistConfig = {
  key: 'root',
  storage,
  withelist: [
    'theme',
    'userInfo',
    'route',
    'links',
    'filter',
    'currentFilter'
  ],
  blacklist: ['qrModal']
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = createStore(persistedReducer)
export const persistor = persistStore(store)