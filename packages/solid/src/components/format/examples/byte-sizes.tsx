import { Format } from '@ark-ui/solid/format'
import { For } from 'solid-js'
import styles from 'styles/format.module.css'

export const ByteSizes = () => {
  const byteSizes = [50, 5000, 5000000, 5000000000]

  return (
    <div class={styles.List}>
      <For each={byteSizes}>
        {(size) => (
          <div class={styles.ListItem}>
            <span class={styles.Value}>
              <Format.Byte value={size} />
            </span>
          </div>
        )}
      </For>
    </div>
  )
}
