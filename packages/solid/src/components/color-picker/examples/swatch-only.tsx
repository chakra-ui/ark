import { ColorPicker, parseColor } from '@ark-ui/solid/color-picker'
import { Check } from 'lucide-solid'
import { For } from 'solid-js'
import styles from 'styles/color-picker.module.css'

const swatches = ['red', 'pink', 'orange', 'purple']

export const SwatchOnly = () => {
  return (
    <ColorPicker.Root class={styles.Root} inline defaultValue={parseColor('#eb5e41')}>
      <output>
        Selected color: <ColorPicker.ValueText class={styles.ValueText} />
      </output>
      <ColorPicker.SwatchGroup class={styles.SwatchGroup}>
        <For each={swatches}>
          {(color) => (
            <ColorPicker.SwatchTrigger class={styles.SwatchTrigger} value={color}>
              <ColorPicker.Swatch class={styles.Swatch} value={color}>
                <ColorPicker.SwatchIndicator class={styles.SwatchIndicator}>
                  <Check />
                </ColorPicker.SwatchIndicator>
              </ColorPicker.Swatch>
            </ColorPicker.SwatchTrigger>
          )}
        </For>
      </ColorPicker.SwatchGroup>
    </ColorPicker.Root>
  )
}
