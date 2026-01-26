import { Clipboard, useClipboard } from '@ark-ui/react/clipboard'
import { CheckIcon, ClipboardCopyIcon } from 'lucide-react'
import styles from 'styles/clipboard.module.css'

export const RootProvider = () => {
  const clipboard = useClipboard({ value: 'https://ark-ui.com' })

  return (
    <div className="stack">
      <output>
        value: {clipboard.value}, copied: {String(clipboard.copied)}
      </output>
      <Clipboard.RootProvider className={styles.Root} value={clipboard}>
        <Clipboard.Label className={styles.Label}>Copy this link</Clipboard.Label>
        <Clipboard.Control className={styles.Control}>
          <Clipboard.Input className={styles.Input} />
          <Clipboard.Trigger className={styles.Trigger}>
            <Clipboard.Indicator className={styles.Indicator} copied={<CheckIcon />}>
              <ClipboardCopyIcon />
            </Clipboard.Indicator>
          </Clipboard.Trigger>
        </Clipboard.Control>
      </Clipboard.RootProvider>
    </div>
  )
}
