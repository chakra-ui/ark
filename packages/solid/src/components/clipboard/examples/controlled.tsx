import { Clipboard } from '@ark-ui/solid/clipboard'
import { CheckIcon, ClipboardCopyIcon } from 'lucide-solid'
import { createSignal } from 'solid-js'
import button from 'styles/button.module.css'
import styles from 'styles/clipboard.module.css'

export const Controlled = () => {
  const [url, setUrl] = createSignal('https://ark-ui.com')

  return (
    <div class="stack">
      <Clipboard.Root class={styles.Root} value={url()} onValueChange={(details) => setUrl(details.value)}>
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

      <button class={button.Root} onClick={() => setUrl('https://chakra-ui.com')}>
        Change Url
      </button>
    </div>
  )
}
