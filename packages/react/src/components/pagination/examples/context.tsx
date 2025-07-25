import { Pagination } from '@ark-ui/react/pagination'

export const Context = () => {
  return (
    <Pagination.Root count={100} pageSize={10}>
      <Pagination.Context>
        {(pagination) => (
          <div>
            <button onClick={() => pagination.goToFirstPage()}>First</button>
            <button onClick={() => pagination.goToPrevPage()}>Previous</button>
            <button onClick={() => pagination.setPage(5)}>Go to Page 5</button>
            <button onClick={() => pagination.goToNextPage()}>Next</button>
            <button onClick={() => pagination.goToLastPage()}>Last</button>

            <p>
              Page {pagination.page} of {pagination.totalPages}
            </p>
            <p>
              Items {pagination.pageRange.start + 1}-{pagination.pageRange.end}
            </p>

            <button onClick={() => pagination.setPageSize(20)}>20 per page</button>
          </div>
        )}
      </Pagination.Context>
    </Pagination.Root>
  )
}
