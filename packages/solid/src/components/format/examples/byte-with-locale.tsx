import { Format } from '@ark-ui/solid/format'
import { LocaleProvider } from '@ark-ui/solid/locale'
import { For } from 'solid-js'

export const ByteWithLocale = () => {
  const locales = ['de-DE', 'zh-CN']
  const value = 1450.45

  return (
    <div>
      <For each={locales}>
        {(locale) => (
          <LocaleProvider locale={locale}>
            <Format.Byte value={value} />
          </LocaleProvider>
        )}
      </For>
    </div>
  )
}
