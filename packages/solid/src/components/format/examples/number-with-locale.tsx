import { Format } from '@ark-ui/solid/format'
import { LocaleProvider } from '@ark-ui/solid/locale'

export const NumberWithLocale = () => {
  return (
    <LocaleProvider locale="de-DE">
      <Format.Number value={1450.45} />
    </LocaleProvider>
  )
}
