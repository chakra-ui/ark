import { Clipboard } from '@ark-ui/react/clipboard'
import { CheckIcon, ClipboardCopyIcon } from 'lucide-react'
import styles from 'styles/clipboard.module.css'

export const Basic = () => {
  return (
    <Clipboard.Root className={styles.Root} value="https://ark-ui.com">
      <Clipboard.Label className={styles.Label}>Copy this link</Clipboard.Label>
      <Clipboard.Control className={styles.Control}>
        <Clipboard.Input className={styles.Input} />
        <Clipboard.Trigger className={styles.Trigger}>
          <Clipboard.Indicator className={styles.Indicator} copied={<CheckIcon />}>
            <ClipboardCopyIcon />
          </Clipboard.Indicator>
        </Clipboard.Trigger>
      </Clipboard.Control>
    </Clipboard.Root>
  )
}
