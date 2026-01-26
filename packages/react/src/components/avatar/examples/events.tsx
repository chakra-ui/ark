import { Avatar } from '@ark-ui/react/avatar'
import { useState } from 'react'
import styles from 'styles/avatar.module.css'

export const Events = () => {
  const [status, setStatus] = useState('loading...')

  return (
    <div className="vstack">
      <output>Status: {status}</output>
      <Avatar.Root className={styles.Root} onStatusChange={(e) => setStatus(e.status)}>
        <Avatar.Fallback className={styles.Fallback}>PA</Avatar.Fallback>
        <Avatar.Image className={styles.Image} src="https://i.pravatar.cc/3000?u=a" alt="avatar" />
      </Avatar.Root>
    </div>
  )
}
