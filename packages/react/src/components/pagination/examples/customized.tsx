import { Pagination } from '../..'

export const Customized = () => (
  <Pagination.Root
    count={5000}
    pageSize={20}
    siblingCount={3}
    translations={{
      nextTriggerLabel: 'Next',
      prevTriggerLabel: 'Prev',
      itemLabel: (details) => `Page ${details.page}`,
    }}
  >
    <Pagination.PrevTrigger>Previous</Pagination.PrevTrigger>
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
  </Pagination.Root>
)
