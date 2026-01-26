import { Avatar, useAvatar } from '@ark-ui/react/avatar'
import { useState } from 'react'
import button from 'styles/button.module.css'
import styles from 'styles/avatar.module.css'

export const RootProvider = () => {
  const [count, setCount] = useState(0)
  const avatar = useAvatar()

  return (
    <div className="vstack">
      <button className={button.Root} onClick={() => setCount(count + 1)}>
        Change Avatar
      </button>

      <Avatar.RootProvider className={styles.Root} value={avatar}>
        <Avatar.Fallback className={styles.Fallback}>PA</Avatar.Fallback>
        <Avatar.Image className={styles.Image} src={`https://i.pravatar.cc/300?u=${count}`} alt="avatar" />
      </Avatar.RootProvider>
    </div>
  )
}
