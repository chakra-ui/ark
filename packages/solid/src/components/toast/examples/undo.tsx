import { Portal } from 'solid-js/web'
import { For, createSignal } from 'solid-js'
import { Toast, Toaster, createToaster } from '@ark-ui/solid/toast'
import { XIcon } from 'lucide-solid'
import button from 'styles/button.module.css'
import styles from 'styles/toast.module.css'

const initialFiles = [
  { id: 'report', name: 'Q4 report.pdf' },
  { id: 'notes', name: 'Meeting notes.md' },
  { id: 'budget', name: 'Budget.xlsx' },
]

export const Undo = () => {
  const toaster = createToaster({
    placement: 'bottom-end',
    overlap: true,
    gap: 16,
  })
  const [files, setFiles] = createSignal(initialFiles)

  const archive = (id: string) => {
    const item = files().find((file) => file.id === id)
    if (!item) return

    setFiles((current) => current.filter((file) => file.id !== id))
    toaster.create({
      title: 'File archived',
      description: item.name,
      type: 'info',
      action: {
        label: 'Undo',
        onClick: () => {
          setFiles((current) => (current.some((file) => file.id === item.id) ? current : [item, ...current]))
        },
      },
    })
  }

  return (
    <div class="stack">
      <For each={files()}>
        {(file) => (
          <div class="hstack">
            <span>{file.name}</span>
            <button type="button" class={button.Root} onClick={() => archive(file.id)}>
              Archive
            </button>
          </div>
        )}
      </For>
      {files().length === 0 && <p>No files</p>}
      <Portal>
        <Toaster toaster={toaster}>
          {(toast) => (
            <Toast.Root class={styles.Root}>
              <Toast.Title class={styles.Title}>{toast().title}</Toast.Title>
              <Toast.Description class={styles.Description}>{toast().description}</Toast.Description>
              {toast().action && (
                <Toast.ActionTrigger class={styles.ActionTrigger}>{toast().action?.label}</Toast.ActionTrigger>
              )}
              <Toast.CloseTrigger class={styles.CloseTrigger}>
                <XIcon />
              </Toast.CloseTrigger>
            </Toast.Root>
          )}
        </Toaster>
      </Portal>
    </div>
  )
}
