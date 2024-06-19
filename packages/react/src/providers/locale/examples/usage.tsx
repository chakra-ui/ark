import { useLocaleContext } from '../use-locale-context'

export const Usage = () => {
  const { locale, dir } = useLocaleContext()

  return <pre>{JSON.stringify({ locale, dir }, null, 2)}</pre>
}
