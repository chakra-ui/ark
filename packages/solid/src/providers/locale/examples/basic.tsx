import { LocaleProvider } from '@ark-ui/solid/locale'
import { Usage } from './usage.tsx'

export const Basic = () => {
  return (
    <LocaleProvider locale="ar-BH">
      <Usage />
    </LocaleProvider>
  )
}
