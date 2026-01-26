import { Clipboard } from '@ark-ui/solid/clipboard'
import { CheckIcon, ClipboardCopyIcon } from 'lucide-solid'
import styles from 'styles/clipboard.module.css'

export const Basic = () => {
  return (
    <Clipboard.Root class={styles.Root} value="https://ark-ui.com">
      <Clipboard.Label class={styles.Label}>Copy this link</Clipboard.Label>
      <Clipboard.Control class={styles.Control}>
        <Clipboard.Input class={styles.Input} />
        <Clipboard.Trigger class={styles.Trigger}>
          <Clipboard.Indicator class={styles.Indicator} copied={<CheckIcon />}>
            <ClipboardCopyIcon />
          </Clipboard.Indicator>
        </Clipboard.Trigger>
      </Clipboard.Control>
    </Clipboard.Root>
  )
}
