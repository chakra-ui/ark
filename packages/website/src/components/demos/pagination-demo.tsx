import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '~/components/ui/button'
import { IconButton } from '~/components/ui/icon-button'
import { Pagination, type PaginationProps } from '~/components/ui/pagination'

export const PaginationDemo = (props: Omit<PaginationProps, 'page' | 'count'>) => {
  return (
    <Pagination {...props} count={90} pageSize={10} siblingCount={1} defaultPage={2}>
      {({ pages }) => (
        <>
          <Pagination.PrevTrigger asChild>
            <IconButton variant="ghost" aria-label="Next Page">
              <ChevronLeft />
            </IconButton>
          </Pagination.PrevTrigger>
          {pages.map((page, index) =>
            page.type === 'page' ? (
              <Pagination.Item key={index} {...page} asChild>
                <Button variant="outline">{page.value}</Button>
              </Pagination.Item>
            ) : (
              <Pagination.Ellipsis key={index} index={index}>
                &#8230;
              </Pagination.Ellipsis>
            ),
          )}
          <Pagination.NextTrigger asChild>
            <IconButton variant="ghost" aria-label="Next Page">
              <ChevronRight />
            </IconButton>
          </Pagination.NextTrigger>
        </>
      )}
    </Pagination>
  )
}
