import { Portal } from '@ark-ui/react/portal'
import { Toast, Toaster, createToaster } from '@ark-ui/react/toast'
import { useState } from 'react'
import button from 'styles/button.module.css'
import styles from 'styles/toast.module.css'

const toaster = createToaster({
  placement: 'bottom-end',
  gap: 24,
})

const initialFiles = [
  { id: 'report', name: 'Q4 report.pdf' },
  { id: 'notes', name: 'Meeting notes.md' },
  { id: 'budget', name: 'Budget.xlsx' },
]

export const Undo = () => {
  const [files, setFiles] = useState(initialFiles)

  const archive = (id: string) => {
    const item = files.find((file) => file.id === id)
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
    <div className="stack">
      {files.map((file) => (
        <div key={file.id} className="hstack">
          <span>{file.name}</span>
          <button type="button" className={button.Root} onClick={() => archive(file.id)}>
            Archive
          </button>
        </div>
      ))}
      {files.length === 0 && <p>No files</p>}
      <Portal>
        <Toaster toaster={toaster}>
          {(toast) => (
            <Toast.Root key={toast.id} className={styles.Root}>
              <Toast.Title className={styles.Title}>{toast.title}</Toast.Title>
              <Toast.Description className={styles.Description}>{toast.description}</Toast.Description>
              {toast.action && (
                <Toast.ActionTrigger className={styles.ActionTrigger}>{toast.action?.label}</Toast.ActionTrigger>
              )}
            </Toast.Root>
          )}
        </Toaster>
      </Portal>
    </div>
  )
}
