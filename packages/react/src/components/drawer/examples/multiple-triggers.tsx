import { Drawer } from '@ark-ui/react/drawer'
import { XIcon } from 'lucide-react'
import { useState } from 'react'
import button from 'styles/button.module.css'
import styles from 'styles/drawer.module.css'
import field from 'styles/field.module.css'

interface User {
  id: string
  name: string
  email: string
}

const users: User[] = [
  { id: '1', name: 'Alice Johnson', email: 'alice@example.com' },
  { id: '2', name: 'Bob Smith', email: 'bob@example.com' },
  { id: '3', name: 'Carol Davis', email: 'carol@example.com' },
]

export const MultipleTriggers = () => {
  const [activeUser, setActiveUser] = useState<User | null>(null)

  return (
    <Drawer.Root
      onTriggerValueChange={(e) => {
        setActiveUser(users.find((u) => u.id === e.value) ?? null)
      }}
    >
      <div className={button.Group}>
        {users.map((user) => (
          <Drawer.Trigger key={user.id} value={user.id} className={button.Root}>
            Edit {user.name}
          </Drawer.Trigger>
        ))}
      </div>
      <Drawer.Backdrop className={styles.Backdrop} />
      <Drawer.Positioner className={styles.Positioner}>
        <Drawer.Content className={styles.Content}>
          <Drawer.Grabber className={styles.Grabber}>
            <Drawer.GrabberIndicator className={styles.GrabberIndicator} />
          </Drawer.Grabber>
          <Drawer.Title className={styles.Title}>Edit User</Drawer.Title>
          {activeUser && (
            <div className="stack">
              <div className={field.Root}>
                <label className={field.Label}>Name</label>
                <input className={field.Input} value={activeUser.name} />
              </div>
              <div className={field.Root}>
                <label className={field.Label}>Email</label>
                <input className={field.Input} value={activeUser.email} />
              </div>
              <div className={button.Group}>
                <Drawer.CloseTrigger className={button.Root}>Cancel</Drawer.CloseTrigger>
                <Drawer.CloseTrigger className={button.Root} data-variant="solid">
                  Save Changes
                </Drawer.CloseTrigger>
              </div>
            </div>
          )}
          <Drawer.CloseTrigger className={styles.CloseTrigger}>
            <XIcon />
          </Drawer.CloseTrigger>
        </Drawer.Content>
      </Drawer.Positioner>
    </Drawer.Root>
  )
}
