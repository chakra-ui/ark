import { QrCode } from '@ark-ui/solid/qr-code'
import { RadioGroup } from '@ark-ui/solid/radio-group'
import { For, createSignal } from 'solid-js'
import styles from 'styles/qr-code.module.css'
import radio from 'styles/radio-group.module.css'

type ErrorLevel = 'L' | 'M' | 'Q' | 'H'

export const ErrorCorrection = () => {
  const [errorLevel, setErrorLevel] = createSignal<ErrorLevel>('L')

  return (
    <div class="stack">
      <QrCode.Root class={styles.Root} defaultValue="http://ark-ui.com" encoding={{ ecc: errorLevel() }}>
        <QrCode.Frame class={styles.Frame}>
          <QrCode.Pattern class={styles.Pattern} />
        </QrCode.Frame>
      </QrCode.Root>
      <RadioGroup.Root
        class={radio.Root}
        defaultValue="L"
        orientation="horizontal"
        onValueChange={(e) => setErrorLevel(e.value as ErrorLevel)}
      >
        <div class="hstack">
          <For each={['L', 'M', 'Q', 'H']}>
            {(level) => (
              <RadioGroup.Item class={radio.Item} value={level}>
                <RadioGroup.ItemControl class={radio.ItemControl} />
                <RadioGroup.ItemText class={radio.ItemText}>{level}</RadioGroup.ItemText>
                <RadioGroup.ItemHiddenInput />
              </RadioGroup.Item>
            )}
          </For>
        </div>
      </RadioGroup.Root>
    </div>
  )
}
