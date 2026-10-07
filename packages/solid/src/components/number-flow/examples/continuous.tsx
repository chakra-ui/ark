import { NumberFlow } from '@ark-ui/solid/number-flow'
import { createSignal } from 'solid-js'
import button from 'styles/button.module.css'
import styles from 'styles/number-flow.module.css'

export const Continuous = () => {
  const [value, setValue] = createSignal(120)

  return (
    <div class={styles.Card}>
      <span class={styles.Label}>Points</span>
      <NumberFlow.Root value={value()} continuous={true} class={`${styles.Root} ${styles.Display}`}>
        <NumberFlow.Segments />
        <NumberFlow.HiddenValueText />
      </NumberFlow.Root>
      <span class={styles.Caption}>Every digit spins through the values in between.</span>
      <div class={styles.Actions}>
        <button type="button" class={button.Root} onClick={() => setValue((v) => v + 12)}>
          +12
        </button>
        <button type="button" class={button.Root} onClick={() => setValue((v) => v + 125)}>
          +125
        </button>
        <button type="button" class={button.Root} onClick={() => setValue(120)}>
          Reset
        </button>
      </div>
    </div>
  )
}
