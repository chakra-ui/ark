import { paginationAnatomy } from '@ark-ui/anatomy'
import { mergeProps } from '@zag-js/solid'
import { ark, type HTMLArkProps } from '../factory'

export type PaginationListProps = HTMLArkProps<'ul'>

export const PaginationList = (props: PaginationListProps) => {
  const mergedProps = mergeProps(() => paginationAnatomy.build().list.attrs, props)

  return <ark.ul {...mergedProps} />
}
