import { Dialog } from '@ark-ui/react/dialog'
import { Portal } from '@ark-ui/react/portal'
import { XIcon } from 'lucide-react'
import { useState } from 'react'
import button from 'styles/button.module.css'
import styles from 'styles/dialog.module.css'
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
    <Dialog.Root
      onTriggerValueChange={(e) => {
        setActiveUser(users.find((u) => u.id === e.value) ?? null)
      }}
    >
      <div className={button.Group}>
        {users.map((user) => (
          <Dialog.Trigger key={user.id} value={user.id} className={button.Root}>
            Edit {user.name}
          </Dialog.Trigger>
        ))}
      </div>
      <Portal>
        <Dialog.Backdrop className={styles.Backdrop} />
        <Dialog.Positioner className={styles.Positioner}>
          <Dialog.Content className={styles.Content}>
            <Dialog.Title className={styles.Title}>Edit User</Dialog.Title>
            <Dialog.Description className={styles.Description}>Update the user's information below.</Dialog.Description>
            {activeUser && (
              <>
                <div className={styles.Body}>
                  <div className={field.Root}>
                    <label className={field.Label}>Name</label>
                    <input className={field.Input} value={activeUser.name} />
                  </div>
                  <div className={field.Root}>
                    <label className={field.Label}>Email</label>
                    <input className={field.Input} value={activeUser.email} />
                  </div>
                </div>
                <div className={styles.Actions}>
                  <Dialog.CloseTrigger className={button.Root}>Cancel</Dialog.CloseTrigger>
                  <Dialog.CloseTrigger className={button.Root} data-variant="solid">
                    Save Changes
                  </Dialog.CloseTrigger>
                </div>
              </>
            )}
            <Dialog.CloseTrigger className={styles.CloseTrigger}>
              <XIcon />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  )
}
