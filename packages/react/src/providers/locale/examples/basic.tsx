import { LocaleProvider } from '@ark-ui/react/locale'
import { Usage } from './usage'

export const Basic = () => {
  return (
    <LocaleProvider locale="ar-BH">
      <Usage />
    </LocaleProvider>
  )
}
