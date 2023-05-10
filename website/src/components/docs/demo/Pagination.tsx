import { Button } from '@/components/shared/Button'
import { pagination } from '@/panda/recipes'
import {
  Pagination,
  PaginationEllipsis,
  PaginationList,
  PaginationNextPageTrigger,
  PaginationPageTrigger,
  PaginationPrevPageTrigger,
  type PaginationProps,
} from '@ark-ui/react'

export const DemoPagination = (props: Partial<PaginationProps>) => (
  <Pagination count={5000} pageSize={10} siblingCount={2} className={pagination()} {...props}>
    {({ pages }) => (
      <>
        <PaginationList>
          <PaginationPrevPageTrigger asChild>
            <Button variant="secondary" size="md">
              Previous
            </Button>
          </PaginationPrevPageTrigger>

          {pages.map((page, index) =>
            page.type === 'page' ? (
              <PaginationPageTrigger key={index} {...page} asChild>
                <Button variant="tertiary" size="md">
                  {page.value}
                </Button>
              </PaginationPageTrigger>
            ) : (
              <PaginationEllipsis key={index} index={index}>
                &#8230;
              </PaginationEllipsis>
            ),
          )}

          <PaginationNextPageTrigger asChild>
            <Button variant="secondary" size="md">
              Next
            </Button>
          </PaginationNextPageTrigger>
        </PaginationList>
      </>
    )}
  </Pagination>
)
