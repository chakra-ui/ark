import { Pagination } from '@ark-ui/solid/pagination'

export const Context = () => {
  return (
    <Pagination.Root count={100} pageSize={10}>
      <Pagination.Context>
        {(api) => (
          <div>
            <button onClick={() => api().goToFirstPage()}>First</button>
            <button onClick={() => api().goToPrevPage()}>Previous</button>
            <button onClick={() => api().setPage(5)}>Go to Page 5</button>
            <button onClick={() => api().goToNextPage()}>Next</button>
            <button onClick={() => api().goToLastPage()}>Last</button>

            <p>
              Page {api().page} of {api().totalPages}
            </p>
            <p>
              Items {api().pageRange.start + 1}-{api().pageRange.end}
            </p>

            <button onClick={() => api().setPageSize(20)}>20 per page</button>
          </div>
        )}
      </Pagination.Context>
    </Pagination.Root>
  )
}
