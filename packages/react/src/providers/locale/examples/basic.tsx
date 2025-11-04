import { LocaleProvider } from '@ark-ui/react/locale'
import { Usage } from './usage'

export const Basic = () => {
  return (
    <LocaleProvider locale="de-DE" supportedLocales={['en-US', 'es-ES', 'fr-FR', 'de-DE', 'ar-SA', 'he-IL', 'ja-JP']}>
      <Usage />
    </LocaleProvider>
  )
}
