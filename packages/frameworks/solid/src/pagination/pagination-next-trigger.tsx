import { mergeProps } from '@zag-js/solid'
import { ark, type ArkComponent, type HTMLArkProps } from '../factory'
import { usePaginationContext } from './pagination-context'

export interface PaginationNextTriggerProps extends HTMLArkProps<'button'> {}

export const PaginationNextTrigger: ArkComponent<'button'> = (
  props: PaginationNextTriggerProps,
) => {
  const api = usePaginationContext()
  const mergedProps = mergeProps(() => api().nextTriggerProps, props)

  return <ark.button {...mergedProps} />
}
