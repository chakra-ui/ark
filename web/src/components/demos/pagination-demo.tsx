import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useMediaQuery } from 'usehooks-ts'
import { Button } from '~/components/ui/button'
import { IconButton } from '~/components/ui/icon-button'
import {
  Pagination,
  PaginationEllipsis,
  PaginationList,
  PaginationNextPageTrigger,
  PaginationPageTrigger,
  PaginationPrevPageTrigger,
} from '~/components/ui/pagination'

export const PaginationDemo = (props: any) => {
  const matches = useMediaQuery('(max-width: 600px)')
  return (
    <Pagination count={90} pageSize={10} siblingCount={matches ? 0 : 1} defaultPage={2} {...props}>
      {({ pages }) => (
        <>
          <PaginationList>
            <PaginationPrevPageTrigger asChild>
              <IconButton variant="tertiary" aria-label="Next Page">
                <ChevronLeft />
              </IconButton>
            </PaginationPrevPageTrigger>

            {pages.map((page, index) =>
              page.type === 'page' ? (
                <PaginationPageTrigger key={index} {...page} asChild>
                  <Button variant="secondary">{page.value}</Button>
                </PaginationPageTrigger>
              ) : (
                <PaginationEllipsis key={index} index={index}>
                  &#8230;
                </PaginationEllipsis>
              ),
            )}

            <PaginationNextPageTrigger asChild>
              <IconButton variant="tertiary" aria-label="Next Page">
                <ChevronRight />
              </IconButton>
            </PaginationNextPageTrigger>
          </PaginationList>
        </>
      )}
    </Pagination>
  )
}
