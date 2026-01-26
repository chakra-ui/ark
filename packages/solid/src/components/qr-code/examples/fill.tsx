import { QrCode } from '@ark-ui/solid/qr-code'
import { For } from 'solid-js'
import styles from 'styles/qr-code.module.css'

export const Fill = () => {
  return (
    <div class="hstack">
      <For each={['#5417D7', '#EC5D5E']}>
        {(fill) => (
          <QrCode.Root class={styles.Root} defaultValue="http://ark-ui.com">
            <QrCode.Frame class={styles.Frame} style={{ fill }}>
              <QrCode.Pattern class={styles.Pattern} />
            </QrCode.Frame>
          </QrCode.Root>
        )}
      </For>
    </div>
  )
}
