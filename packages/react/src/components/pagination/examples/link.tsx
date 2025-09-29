import { Pagination, usePagination } from '@ark-ui/react/pagination'

export const Link = () => {
  const pagination = usePagination({
    type: 'link',
    count: 100,
    pageSize: 10,
    siblingCount: 2,
    getPageUrl: ({ page }) => `/page=${page}`,
  })

  return (
    <Pagination.RootProvider value={pagination}>
      <a {...pagination.getPrevTriggerProps()}>Previous</a>
      {pagination.pages.map((page, index) =>
        page.type === 'page' ? (
          <a key={index} {...pagination.getItemProps(page)}>
            {page.value}
          </a>
        ) : (
          <span key={index} {...pagination.getEllipsisProps({ index })}>
            &#8230;
          </span>
        ),
      )}
      <a {...pagination.getNextTriggerProps()}>Next</a>
    </Pagination.RootProvider>
  )
}
