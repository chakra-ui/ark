import { NumberFlow } from '@ark-ui/solid/number-flow'
import { createSignal } from 'solid-js'
import button from 'styles/button.module.css'
import styles from 'styles/number-flow.module.css'

export const Timing = () => {
  const [value, setValue] = createSignal(31_415)

  return (
    <div class={styles.Card}>
      <span class={styles.Label}>Downloads</span>
      <NumberFlow.Root
        value={value()}
        stagger="60ms"
        spinTiming={{ duration: '1400ms', easing: 'cubic-bezier(0.16, 1, 0.3, 1)' }}
        transformTiming={{ duration: '700ms', easing: 'cubic-bezier(0.16, 1, 0.3, 1)' }}
        class={`${styles.Root} ${styles.Display}`}
      >
        <NumberFlow.Segments />
        <NumberFlow.HiddenValueText />
      </NumberFlow.Root>
      <span class={styles.Caption}>A slower spring with each digit trailing the one before it.</span>
      <button type="button" class={button.Root} onClick={() => setValue(Math.round(Math.random() * 999_999))}>
        Randomize
      </button>
    </div>
  )
}
