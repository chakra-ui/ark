import { useLocaleContext } from '@ark-ui/solid/locale'

export const Usage = () => {
  const locale = useLocaleContext()

  return <pre>{JSON.stringify(locale(), null, 2)}</pre>
}
