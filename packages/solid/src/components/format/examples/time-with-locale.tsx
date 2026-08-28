import { Format } from '@ark-ui/solid/format'
import { LocaleProvider } from '@ark-ui/solid/locale'
import styles from 'styles/format.module.css'

export const TimeWithLocale = () => {
  return (
    <LocaleProvider locale="ar-EG">
      <span class={styles.Value}>
        <Format.Time value="13:05" format="12h" />
      </span>
    </LocaleProvider>
  )
}
