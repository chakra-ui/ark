import { LocaleProvider } from '@ark-ui/solid/locale'
import { Usage } from './usage'

export const Basic = () => {
  return (
    <LocaleProvider locale="ar-BH">
      <Usage />
    </LocaleProvider>
  )
}
