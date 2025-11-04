import { LocaleProvider } from '@ark-ui/react/locale'

export const App = () => {
  return (
    <LocaleProvider locale="de-DE" supportedLocales={['en-US', 'es-ES', 'fr-FR', 'de-DE', 'ar-SA', 'he-IL', 'ja-JP']}>
      {/* Your App */}
    </LocaleProvider>
  )
}
