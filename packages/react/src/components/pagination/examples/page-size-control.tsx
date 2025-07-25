import { Pagination } from '@ark-ui/react/pagination'

export const PageSizeControl = () => {
  return (
    <Pagination.Root count={100} pageSize={10}>
      <Pagination.Context>
        {(pagination) => (
          <div>
            <div>
              <label>Items per page: </label>
              <select value={pagination.pageSize} onChange={(e) => pagination.setPageSize(Number(e.target.value))}>
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
              </select>
            </div>

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

            <p>
              Page {pagination.page} of {pagination.totalPages}
            </p>
          </div>
        )}
      </Pagination.Context>
    </Pagination.Root>
  )
}
