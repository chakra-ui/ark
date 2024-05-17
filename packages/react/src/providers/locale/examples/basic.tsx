import { LocaleProvider } from '../'
import { Usage } from './usage'

export const Basic = () => {
  return (
    <LocaleProvider locale="ar-BH">
      <Usage />
    </LocaleProvider>
  )
}
