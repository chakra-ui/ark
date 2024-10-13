import { Pagination, usePagination } from '@ark-ui/react/pagination'

export const RootProvider = () => {
  const pagination = usePagination({ count: 5000, pageSize: 10, siblingCount: 2 })

  return (
    <>
      <button onClick={() => pagination.goToNextPage()}>Next Page</button>

      <Pagination.RootProvider value={pagination}>
        <Pagination.PrevTrigger>Previous Page</Pagination.PrevTrigger>
        <Pagination.Context>
          {(pagination) =>
            pagination.pages.map((page, index) =>
              page.type === 'page' ? (
                <Pagination.Item key={index} {...page}>
                  {page.value}
                </Pagination.Item>
              ) : (
                <Pagination.Ellipsis key={index} index={index}>
                  &#8230;
                </Pagination.Ellipsis>
              ),
            )
          }
        </Pagination.Context>
        <Pagination.NextTrigger>Next Page</Pagination.NextTrigger>
      </Pagination.RootProvider>
    </>
  )
}
