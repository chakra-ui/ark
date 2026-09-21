import { Pagination } from '@ark-ui/react/pagination'

export const ComponentUnderTest = (props: Pagination.RootProps) => (
  <Pagination.Root type="link" getPageUrl={({ page }) => `/page/${page}`} {...props}>
    <Pagination.FirstTrigger>First</Pagination.FirstTrigger>
    <Pagination.PrevTrigger>Prev</Pagination.PrevTrigger>
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
    <Pagination.NextTrigger>Next</Pagination.NextTrigger>
    <Pagination.LastTrigger>Last</Pagination.LastTrigger>
  </Pagination.Root>
)
