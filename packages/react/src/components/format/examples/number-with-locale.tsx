import { Format } from '@ark-ui/react/format'
import { LocaleProvider } from '@ark-ui/react/locale'
import styles from 'styles/format.module.css'

export const NumberWithLocale = () => {
  return (
    <LocaleProvider locale="de-DE">
      <span className={styles.Value}>
        <Format.Number value={1450.45} />
      </span>
    </LocaleProvider>
  )
}
