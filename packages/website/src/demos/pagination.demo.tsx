import { Pagination, type PaginationProps } from '~/components/ui/pagination'

export const Demo = (props: Omit<PaginationProps, 'count'>) => {
  return <Pagination {...props} count={90} pageSize={10} siblingCount={1} defaultPage={2} />
}
