import { Format, LocaleProvider } from '@ark-ui/react'

export const ByteWithLocale = () => {
  const locales = ['de-DE', 'zh-CN']
  const value = 1450.45

  return (
    <div>
      {locales.map((locale) => (
        <LocaleProvider key={locale} locale={locale}>
          <Format.Byte value={value} />
        </LocaleProvider>
      ))}
    </div>
  )
}
