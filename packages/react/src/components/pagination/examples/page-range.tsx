import { Pagination } from '@ark-ui/react/pagination'

export const PageRange = () => {
  return (
    <Pagination.Root count={100} pageSize={10}>
      <Pagination.Context>
        {(pagination) => (
          <div>
            <div>
              <Pagination.PrevTrigger>Previous</Pagination.PrevTrigger>

              {pagination.pages.map((page, index) =>
                page.type === 'page' ? (
                  <Pagination.Item key={index} {...page}>
                    {page.value}
                  </Pagination.Item>
                ) : (
                  <Pagination.Ellipsis key={index} index={index}>
                    &#8230;
                  </Pagination.Ellipsis>
                ),
              )}

              <Pagination.NextTrigger>Next</Pagination.NextTrigger>
            </div>

            <div>
              <p>
                Showing {pagination.pageRange.start + 1}-{pagination.pageRange.end} of {pagination.count} results
              </p>
              <p>
                Page {pagination.page} of {pagination.totalPages}
              </p>
            </div>
          </div>
        )}
      </Pagination.Context>
    </Pagination.Root>
  )
}
