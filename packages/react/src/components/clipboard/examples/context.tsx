import { Clipboard } from '@ark-ui/react/clipboard'
import { CheckIcon, ClipboardCopyIcon } from 'lucide-react'
import button from 'styles/button.module.css'
import styles from 'styles/clipboard.module.css'

export const Context = () => {
  return (
    <Clipboard.Root className={styles.Root} value="https://ark-ui.com">
      <Clipboard.Label className={styles.Label}>Copy this link</Clipboard.Label>
      <Clipboard.Context>
        {(clipboard) => (
          <button className={button.Root} onClick={() => clipboard.copy()}>
            {clipboard.copied ? <CheckIcon /> : <ClipboardCopyIcon />}
            {clipboard.copied ? 'Copied!' : 'Copy'}
          </button>
        )}
      </Clipboard.Context>
    </Clipboard.Root>
  )
}
