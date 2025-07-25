import { Pagination } from '@ark-ui/react/pagination'

const items = Array.from({ length: 100 }, (_, i) => `Item ${i + 1}`)

export const DataSlicing = () => {
  return (
    <Pagination.Root count={items.length} pageSize={10}>
      <Pagination.Context>
        {(pagination) => (
          <div>
            <div>
              <h3>Current Page Items:</h3>
              <ul>
                {pagination.slice(items).map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
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
          </div>
        )}
      </Pagination.Context>
    </Pagination.Root>
  )
}
