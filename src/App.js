import Sign from './pages/Sign'
import Main from './pages/Main'
import { useSelector } from 'react-redux'

const App = () => {
  const route = useSelector(state => state.route)
  return (
    route === '/' ? <Sign /> : <Main />
  )
}

export default App