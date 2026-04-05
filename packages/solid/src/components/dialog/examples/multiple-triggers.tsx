import { Dialog } from '@ark-ui/solid/dialog'
import { Portal } from 'solid-js/web'
import { XIcon } from 'lucide-solid'
import { For, Show, createSignal } from 'solid-js'
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
  const [activeUser, setActiveUser] = createSignal<User | null>(null)

  return (
    <Dialog.Root
      onTriggerValueChange={(e) => {
        setActiveUser(users.find((u) => u.id === e.value) ?? null)
      }}
    >
      <div class={button.Group}>
        <For each={users}>
          {(user) => (
            <Dialog.Trigger value={user.id} class={button.Root}>
              Edit {user.name}
            </Dialog.Trigger>
          )}
        </For>
      </div>
      <Portal>
        <Dialog.Backdrop class={styles.Backdrop} />
        <Dialog.Positioner class={styles.Positioner}>
          <Dialog.Content class={styles.Content}>
            <Dialog.Title class={styles.Title}>Edit User</Dialog.Title>
            <Dialog.Description class={styles.Description}>Update the user's information below.</Dialog.Description>
            <Show when={activeUser()}>
              {(user) => (
                <>
                  <div class={styles.Body}>
                    <div class={field.Root}>
                      <label class={field.Label}>Name</label>
                      <input class={field.Input} value={user().name} />
                    </div>
                    <div class={field.Root}>
                      <label class={field.Label}>Email</label>
                      <input class={field.Input} value={user().email} />
                    </div>
                  </div>
                  <div class={styles.Actions}>
                    <Dialog.CloseTrigger class={button.Root}>Cancel</Dialog.CloseTrigger>
                    <Dialog.CloseTrigger class={button.Root} data-variant="solid">
                      Save Changes
                    </Dialog.CloseTrigger>
                  </div>
                </>
              )}
            </Show>
            <Dialog.CloseTrigger class={styles.CloseTrigger}>
              <XIcon />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  )
}
