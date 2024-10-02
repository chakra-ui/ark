import { Format } from '@ark-ui/react/format'
import { LocaleProvider } from '@ark-ui/react/locale'

export const NumberWithLocale = () => {
  return (
    <LocaleProvider locale="de-DE">
      <Format.Number value={1450.45} />
    </LocaleProvider>
  )
}
