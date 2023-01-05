import { Button } from '@/components/shared/Button'
import { pagination } from '@/panda/recipes'
import {
  Pagination,
  PaginationEllipsis,
  PaginationList,
  PaginationNextPageTrigger,
  PaginationPageTrigger,
  PaginationPrevPageTrigger,
  PaginationProps,
} from '@ark-ui/react'

export const DemoPagination = (props: Partial<PaginationProps>) => (
  <Pagination count={5000} pageSize={10} siblingCount={2} className={pagination()} {...props}>
    {({ pages }) => (
      <>
        <PaginationList>
          <PaginationPrevPageTrigger>
            <Button variant="secondary" size="md">
              Previous
            </Button>
          </PaginationPrevPageTrigger>

          {pages.map((page, index) =>
            page.type === 'page' ? (
              <PaginationPageTrigger key={index} value={page.value}>
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

          <PaginationNextPageTrigger>
            <Button variant="secondary" size="md">
              Next
            </Button>
          </PaginationNextPageTrigger>
        </PaginationList>
      </>
    )}
  </Pagination>
)
