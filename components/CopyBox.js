import { useState } from 'react'
import { ReactComponent as Copy } from '../svgs/copy.svg'

const CopyBox = (props) => {

  const { clipboard } = window.require('electron')
  const [copied, setCopied] = useState(false)
  const { theme, url } = props

  const copyUrl = () => {
    clipboard.writeText(url)
    setCopied(true)
    setTimeout(() => {setCopied(false)}, 500)
  }

  return (
    <div className={`boxes-contents left-border-boxe ${theme ? 'dark-boxes-border' : 'light-boxes-border'} 
    ${copied ? 'copied' : ''} ${theme ? 'dark-boxe-over' : 'light-boxe-over'}`}
    onClick={() => {copyUrl()}} >
      <Copy fill={'#fff'} width={20} />
    </div>
  )
}

export default CopyBox