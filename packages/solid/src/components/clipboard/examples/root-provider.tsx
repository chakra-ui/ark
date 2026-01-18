import { Clipboard, useClipboard } from '@ark-ui/solid/clipboard'
import { CheckIcon, ClipboardCopyIcon } from 'lucide-solid'
import styles from 'styles/clipboard.module.css'

export const RootProvider = () => {
  const clipboard = useClipboard({ value: 'https://ark-ui.com' })

  return (
    <div class="stack">
      <output>
        value: {clipboard().value}, copied: {String(clipboard().copied)}
      </output>
      <Clipboard.RootProvider class={styles.Root} value={clipboard}>
        <Clipboard.Label class={styles.Label}>Copy this link</Clipboard.Label>
        <Clipboard.Control class={styles.Control}>
          <Clipboard.Input class={styles.Input} />
          <Clipboard.Trigger class={styles.Trigger}>
            <Clipboard.Indicator class={styles.Indicator} copied={<CheckIcon />}>
              <ClipboardCopyIcon />
            </Clipboard.Indicator>
          </Clipboard.Trigger>
        </Clipboard.Control>
      </Clipboard.RootProvider>
    </div>
  )
}
