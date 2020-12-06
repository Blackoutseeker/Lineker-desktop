import { memo } from 'react'
import { ReactComponent as Drawer } from '../svgs/drawer.svg'

const VoidLink = () => {
  return (
    <div className={'void-content'} >
      <span className={'no-link'} >No link found!</span>
      <Drawer width={150} height={150} />
      <span className={'no-link'} >Add a link to get started!</span>
    </div>
  )
}

export default memo(VoidLink)