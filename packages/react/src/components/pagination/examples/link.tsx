import { Pagination, usePagination } from '@ark-ui/react/pagination'

export const Link = () => {
  const pagination = usePagination({
    type: 'link',
    count: 100,
    pageSize: 10,
    siblingCount: 2,
  })

  const getHref = (page: number | null) => (page != null ? `/page=${page}` : '/')

  return (
    <Pagination.RootProvider value={pagination}>
      <a {...pagination.getPrevTriggerProps()} href={getHref(pagination.previousPage)}>
        Previous
      </a>
      {pagination.pages.map((page, index) =>
        page.type === 'page' ? (
          <a key={index} {...pagination.getItemProps(page)} href={getHref(page.value)}>
            {page.value}
          </a>
        ) : (
          <span key={index} {...pagination.getEllipsisProps({ index })}>
            &#8230;
          </span>
        ),
      )}
      <a {...pagination.getNextTriggerProps()} href={getHref(pagination.nextPage)}>
        Next
      </a>
    </Pagination.RootProvider>
  )
}
