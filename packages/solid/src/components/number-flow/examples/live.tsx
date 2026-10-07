import { NumberFlow } from '@ark-ui/solid/number-flow'
import { createSignal } from 'solid-js'
import button from 'styles/button.module.css'
import styles from 'styles/number-flow.module.css'

export const Live = () => {
  const [value, setValue] = createSignal(3)

  return (
    <div class={styles.Card}>
      <span class={styles.Label}>Items in cart</span>
      <NumberFlow.Root value={value()} live={true} class={`${styles.Root} ${styles.Display}`}>
        <NumberFlow.Segments />
        <NumberFlow.HiddenValueText />
      </NumberFlow.Root>
      <span class={styles.Caption}>Screen readers announce the count once it settles.</span>
      <div class={styles.Actions}>
        <button type="button" class={button.Root} onClick={() => setValue((v) => Math.max(0, v - 1))}>
          Remove item
        </button>
        <button type="button" class={button.Root} data-variant="solid" onClick={() => setValue((v) => v + 1)}>
          Add item
        </button>
      </div>
    </div>
  )
}
