import { Format } from '../..'
import { LocaleProvider } from '../../../providers'

export const NumberWithLocale = () => {
  return (
    <LocaleProvider locale="de-DE">
      <Format.Number value={1450.45} />
    </LocaleProvider>
  )
}
