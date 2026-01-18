import { Clipboard } from '@ark-ui/react/clipboard'
import { CheckIcon, ClipboardCopyIcon } from 'lucide-react'
import styles from 'styles/clipboard.module.css'

export const ValueText = () => {
  return (
    <Clipboard.Root className={styles.Root} value="https://ark-ui.com">
      <Clipboard.Control className={styles.Control}>
        <Clipboard.ValueText className={styles.ValueText} />
        <Clipboard.Trigger className={styles.Trigger}>
          <Clipboard.Indicator className={styles.Indicator} copied={<CheckIcon />}>
            <ClipboardCopyIcon />
          </Clipboard.Indicator>
        </Clipboard.Trigger>
      </Clipboard.Control>
    </Clipboard.Root>
  )
}
