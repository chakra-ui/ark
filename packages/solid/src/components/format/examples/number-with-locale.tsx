import { Format } from '@ark-ui/solid/format'
import { LocaleProvider } from '@ark-ui/solid/locale'
import styles from 'styles/format.module.css'

export const NumberWithLocale = () => {
  return (
    <LocaleProvider locale="de-DE">
      <span class={styles.Value}>
        <Format.Number value={1450.45} />
      </span>
    </LocaleProvider>
  )
}
