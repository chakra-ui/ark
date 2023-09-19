import { paginationAnatomy } from '@ark-ui/anatomy'
import { mergeProps } from '@zag-js/solid'
import { ark, type HTMLArkProps } from '../factory'

export type PaginationListItemProps = HTMLArkProps<'li'>

export const PaginationListItem = (props: PaginationListItemProps) => {
  const mergedProps = mergeProps(() => paginationAnatomy.build().listItem.attrs, props)

  return <ark.li {...mergedProps} />
}
