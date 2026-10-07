import { NumberFlow } from '@ark-ui/solid/number-flow'
import { MinusIcon, PlusIcon } from 'lucide-solid'
import { createSignal } from 'solid-js'
import button from 'styles/button.module.css'
import styles from 'styles/number-flow.module.css'

export const Basic = () => {
  const [value, setValue] = createSignal(1248)

  return (
    <div class={styles.Card}>
      <span class={styles.Label}>Followers</span>
      <NumberFlow.Root value={value()} class={`${styles.Root} ${styles.Display}`}>
        <NumberFlow.Segments />
        <NumberFlow.HiddenValueText />
      </NumberFlow.Root>
      <div class={styles.Actions}>
        <button type="button" class={button.Root} onClick={() => setValue((v) => v - 1)}>
          <MinusIcon /> Unfollow
        </button>
        <button type="button" class={button.Root} data-variant="solid" onClick={() => setValue((v) => v + 1)}>
          <PlusIcon /> Follow
        </button>
      </div>
    </div>
  )
}
