import { Format } from '@ark-ui/react/format'
import { LocaleProvider } from '@ark-ui/react/locale'
import styles from 'styles/format.module.css'

export const ByteWithLocale = () => {
  const locales = ['de-DE', 'zh-CN']

  return (
    <div className={styles.List}>
      {locales.map((locale) => (
        <LocaleProvider key={locale} locale={locale}>
          <div className={styles.ListItem}>
            <span className={styles.InlineLabel}>{locale}:</span>
            <span className={styles.Value}>
              <Format.Byte value={1450.45} />
            </span>
          </div>
        </LocaleProvider>
      ))}
    </div>
  )
}
