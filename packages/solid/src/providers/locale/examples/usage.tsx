import { useLocaleContext } from '../use-locale-context'

export const Usage = () => {
  const locale = useLocaleContext()

  return <pre>{JSON.stringify(locale(), null, 2)}</pre>
}
