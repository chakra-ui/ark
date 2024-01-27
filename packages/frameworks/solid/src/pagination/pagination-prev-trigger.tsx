import { mergeProps } from '@zag-js/solid'
import { ark, type ArkComponent, type HTMLArkProps } from '../factory'
import { usePaginationContext } from './pagination-context'

export interface PaginationPrevTriggerProps extends HTMLArkProps<'button'> {}

export const PaginationPrevTrigger: ArkComponent<'button'> = (
  props: PaginationPrevTriggerProps,
) => {
  const api = usePaginationContext()
  const mergedProps = mergeProps(() => api().prevTriggerProps, props)

  return <ark.button {...mergedProps} />
}
