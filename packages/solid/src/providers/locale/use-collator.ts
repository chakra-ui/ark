import { createCollator } from '@zag-js/i18n-utils'
import { createMemo } from 'solid-js'
import { useLocaleContext } from './use-locale-context.ts'

export interface UseCollatorProps extends Intl.CollatorOptions {
  locale?: string
}

export interface UseCollatorReturn extends Intl.Collator {}

export function useCollator(props: UseCollatorProps = {}): UseCollatorReturn {
  const env = useLocaleContext()
  const collator = createMemo(() => {
    const { locale, ...options } = props
    return createCollator(locale ?? env().locale, options)
  })
  return {
    compare: (x, y) => collator().compare(x, y),
    resolvedOptions: () => collator().resolvedOptions(),
  }
}
