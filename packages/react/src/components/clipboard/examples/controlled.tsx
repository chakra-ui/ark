import { Clipboard } from '@ark-ui/react/clipboard'
import { CheckIcon, ClipboardCopyIcon } from 'lucide-react'
import { useState } from 'react'
import button from 'styles/button.module.css'
import styles from 'styles/clipboard.module.css'

export const Controlled = () => {
  const [url, setUrl] = useState('https://ark-ui.com')

  return (
    <div className="stack">
      <Clipboard.Root className={styles.Root} value={url} onValueChange={(details) => setUrl(details.value)}>
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

      <button className={button.Root} onClick={() => setUrl('https://chakra-ui.com')}>
        Change Url
      </button>
    </div>
  )
}
