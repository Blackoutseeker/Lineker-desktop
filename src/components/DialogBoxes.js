import { memo } from 'react'
import { ReactComponent as Alert } from '../svgs/exclamation-triangle.svg'
import { ReactComponent as Inbox } from '../svgs/inbox.svg'
import { ReactComponent as Key } from '../svgs/key.svg'

const DialogBox = (props) => {

  const { type } = props

  return (
    <div className={`dialog-box ${
      type === 1 || type === 4 ? 'error' :
      type === 2 ? 'inbox' :
      type === 3 ? 'reset' : ''
    }`}
    id={type === null ? 'hide-box' : 'show-box'} >
      <div className={`dialog-message-content ${
        type === 1 || type === 4 ? 'error-message-content' :
        type === 2 ? 'inbox-message-content' :
        type === 3 ? 'reset-message-content' : ''
        }`} >
        <div className={'dialog-text-content'} >
          <span className={'messages title'} >
            {type === 1 ? 'Failed to sign in' : null}
            {type === 2 ? 'Check your inbox!' : null}
            {type === 3 ? 'Email sent to you!' : null}
            {type === 4 ? 'Failed to sign up' : null}
          </span>
        </div>
        <div className={'dialog-text-content'} >
          <span className={'messages subtitle'} >
            {type === 1 || type === 4 ? 'Email/password invalid' : null}
            {type === 2 ? 'Confirm your email' : null}
            {type === 3 ? 'Reset your password' : null}
          </span>
        </div>
      </div>
      <div className={`dialog-icon-content ${
        type === 1 || type === 4 ? 'error-icon-content' :
        type === 2 ? 'inbox-icon-content' :
        type === 3 ? 'reset-icon-content' : ''
        }`} >
          {type === 1 || type === 4 ? <Alert fill={'#fff'} width={30} /> : null}
          {type === 2 ? <Inbox fill={'#fff'} width={30} /> : null}
          {type === 3 ? <Key fill={'#fff'} width={30} /> : null}
      </div>
    </div>
  )
}

export default memo(DialogBox)