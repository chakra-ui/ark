import { ark, HTMLArkProps } from '../factory'

export type PaginationListProps = HTMLArkProps<'ul'>

export const PaginationList = (props: PaginationListProps) => <ark.ul {...props} />
