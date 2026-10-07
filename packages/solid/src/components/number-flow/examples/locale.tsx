import { NumberFlow } from '@ark-ui/solid/number-flow'
import { For, createSignal } from 'solid-js'
import button from 'styles/button.module.css'
import styles from 'styles/number-flow.module.css'

const locales = [
  { locale: 'en-US', label: 'English' },
  { locale: 'de-DE', label: 'Deutsch' },
  { locale: 'ar-EG', label: 'العربية' },
  { locale: 'hi-IN-u-nu-deva', label: 'हिन्दी' },
]

export const Locale = () => {
  const [value, setValue] = createSignal(1_234_567.89)

  return (
    <div class="stack">
      <div class={styles.Grid}>
        <For each={locales}>
          {(item) => (
            <div class={styles.Stat}>
              <span class={styles.Label}>{item.label}</span>
              <NumberFlow.Root value={value()} locale={item.locale} class={styles.Root}>
                <NumberFlow.Segments />
                <NumberFlow.HiddenValueText />
              </NumberFlow.Root>
            </div>
          )}
        </For>
      </div>
      <button type="button" class={button.Root} onClick={() => setValue(Math.round(Math.random() * 10_000_000) / 100)}>
        Randomize
      </button>
    </div>
  )
}
