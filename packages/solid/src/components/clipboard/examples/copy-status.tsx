import { Clipboard } from '@ark-ui/solid/clipboard'
import { CheckIcon, ClipboardCopyIcon } from 'lucide-solid'
import { createSignal } from 'solid-js'
import styles from 'styles/clipboard.module.css'

export const CopyStatus = () => {
  const [copyCount, setCopyCount] = createSignal(0)

  return (
    <Clipboard.Root
      class={styles.Root}
      value="https://ark-ui.com"
      onStatusChange={(details) => {
        if (details.copied) {
          setCopyCount((prev) => prev + 1)
        }
      }}
    >
      <Clipboard.Control class={styles.Control}>
        <Clipboard.Trigger class={styles.Trigger}>
          <Clipboard.Indicator class={styles.Indicator} copied={<CheckIcon />}>
            <ClipboardCopyIcon />
          </Clipboard.Indicator>
        </Clipboard.Trigger>
      </Clipboard.Control>
      <p>Copied {copyCount()} times</p>
    </Clipboard.Root>
  )
}
