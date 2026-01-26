import { Format } from '@ark-ui/solid/format'
import { For } from 'solid-js'
import styles from 'styles/format.module.css'

export const ByteWithUnitDisplay = () => {
  const unitDisplays = ['narrow', 'short', 'long'] as const

  return (
    <div class={styles.List}>
      <For each={unitDisplays}>
        {(unitDisplay) => (
          <div class={styles.ListItem}>
            <span class={styles.InlineLabel}>{unitDisplay}:</span>
            <span class={styles.Value}>
              <Format.Byte value={50345.53} unitDisplay={unitDisplay} />
            </span>
          </div>
        )}
      </For>
    </div>
  )
}
