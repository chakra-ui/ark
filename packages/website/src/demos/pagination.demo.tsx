import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'
import { Button, IconButton, Pagination } from '~/components/ui'

export const Demo = () => {
  return (
    <Pagination.Root count={90} pageSize={10} siblingCount={1} defaultPage={2}>
      {({ pages }) => (
        <>
          <Pagination.PrevTrigger asChild>
            <IconButton variant="ghost" aria-label="Next Page">
              <ChevronLeftIcon />
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
              <ChevronRightIcon />
            </IconButton>
          </Pagination.NextTrigger>
        </>
      )}
    </Pagination.Root>
  )
}
