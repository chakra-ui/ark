import { Format } from '@ark-ui/react/format'
import { LocaleProvider } from '@ark-ui/react/locale'
import styles from 'styles/format.module.css'

export const TimeWithLocale = () => {
  return (
    <LocaleProvider locale="ar-EG">
      <span className={styles.Value}>
        <Format.Time value="13:05" format="12h" />
      </span>
    </LocaleProvider>
  )
}
