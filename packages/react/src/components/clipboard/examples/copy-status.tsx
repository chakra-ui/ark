import { Clipboard } from '@ark-ui/react/clipboard'
import { CheckIcon, ClipboardCopyIcon } from 'lucide-react'
import { useState } from 'react'
import styles from 'styles/clipboard.module.css'

export const CopyStatus = () => {
  const [copyCount, setCopyCount] = useState(0)

  return (
    <Clipboard.Root
      className={styles.Root}
      value="https://ark-ui.com"
      onStatusChange={(details) => {
        if (details.copied) setCopyCount((prev) => prev + 1)
      }}
    >
      <Clipboard.Control className={styles.Control}>
        <Clipboard.Trigger className={styles.Trigger}>
          <Clipboard.Indicator className={styles.Indicator} copied={<CheckIcon />}>
            <ClipboardCopyIcon />
          </Clipboard.Indicator>
          <Clipboard.ValueText />
        </Clipboard.Trigger>
      </Clipboard.Control>
      <p>Copied {copyCount} times</p>
    </Clipboard.Root>
  )
}
