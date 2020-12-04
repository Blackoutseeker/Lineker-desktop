import { useState } from 'react'
import PlayStore from '../svgs/google-play-badge (english).png'
import AppStore from '../svgs/app store.png'
import QRCode from 'qrcode.react'

const QrApp = (props) => {

  const [qrOver, setQrOver] = useState(false)
  const { platform, qrValue } = props

  const setOver = () => {
    setQrOver(true)
  }

  const setOut = () => {
    setQrOver(false)
  }

  return (
    <>
    <div className={'publish-content'} >
    <img src={platform === 'app' ? AppStore : PlayStore} width={150} alt={'platform'} />
    <div className={'qr-content'} onMouseOver={() => {setOver()}} onMouseOut={() => {setOut()}} >
      <QRCode value={qrValue} size={108} renderAs={'svg'} className={'qrcode'}
      bgColor={'transparent'} fgColor={qrOver ? '#000' : '#fff'} />
    </div>
    </div>
    </>
  )
}

export default QrApp