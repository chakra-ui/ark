import { Format } from '@ark-ui/solid/format'
import { LocaleProvider } from '@ark-ui/solid/locale'
import { For } from 'solid-js'
import styles from 'styles/format.module.css'

export const ByteWithLocale = () => {
  const locales = ['de-DE', 'zh-CN']

  return (
    <div class={styles.List}>
      <For each={locales}>
        {(locale) => (
          <LocaleProvider locale={locale}>
            <div class={styles.ListItem}>
              <span class={styles.InlineLabel}>{locale}:</span>
              <span class={styles.Value}>
                <Format.Byte value={1450.45} />
              </span>
            </div>
          </LocaleProvider>
        )}
      </For>
    </div>
  )
}
