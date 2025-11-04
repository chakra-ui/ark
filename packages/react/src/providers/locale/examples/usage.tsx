import { useLocaleContext } from '@ark-ui/react/locale'
import { Format } from '@ark-ui/react/format'

export const Usage = () => {
  const { locale, dir, setLocale, supportedLocales } = useLocaleContext()

  return (
    <div dir={dir}>
      <h2>Locale Demonstration</h2>

      <div>
        <label htmlFor="locale-select">Select Language: </label>
        <select id="locale-select" value={locale} onChange={(e) => setLocale(e.target.value)}>
          {supportedLocales?.map((loc) => (
            <option key={loc} value={loc}>
              {loc}
            </option>
          ))}
        </select>
      </div>
      <p>
        <Format.Byte value={1024.32} /> bytes in {locale} locale.
      </p>
      <p>
        <Format.RelativeTime value={new Date('2025-12-12')} /> from now in {locale} locale.
      </p>
    </div>
  )
}
