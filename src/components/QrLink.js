import { useState } from 'react'
import { SET_QR_URL } from '../store/actions/QrModal'
import { useDispatch } from 'react-redux'
import QrCode from 'qrcode.react'

const QrLink = (props) => {

  const dispatch = useDispatch()
  const [qrOver, setQrOver] = useState(false)
  const { theme, value } = props

  const setModal = () => {
    dispatch({type: SET_QR_URL, payload: {setQrUrl: value}})
  }

  const setOver = () => {
    setQrOver(true)
  }

  const setOut = () => {
    setQrOver(false)
  }

  return (
    <div className={`boxes-contents ${theme ? 'dark-boxes-border' : 'light-boxes-border'}`}
    id={'qr-boxe'} onMouseOver={() => {setOver()}}
    onMouseOut={() => {setOut()}} onClick={() => {setModal()}} >
      <QrCode value={String(value)} size={50} bgColor={qrOver ? '#fff' : 'transparent'}
      fgColor={qrOver ? '#000' : '#fff'} renderAs={'svg'} />
    </div>
  )
}

export default QrLink