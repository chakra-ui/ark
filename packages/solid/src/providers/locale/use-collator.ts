import { createCollator } from '@zag-js/i18n-utils'
import { createMemo, type Accessor } from 'solid-js'
import { useLocaleContext } from './use-locale-context'

export interface UseCollatorProps extends Intl.CollatorOptions {
  locale?: string
}

export interface UseCollatorReturn extends Accessor<Intl.Collator> {}

export function useCollator(props: UseCollatorProps = {}): UseCollatorReturn {
  const env = useLocaleContext()
  const locale = () => props.locale ?? env().locale
  return createMemo(() => {
    const { locale: _, ...options } = props
    return createCollator(locale(), options)
  })
}
