import { Pagination, type PaginationRootProps } from '../'

export const ComponentUnderTest = (props: PaginationRootProps) => (
  <Pagination.Root {...props}>
    {({ pages }) => (
      <>
        <Pagination.PrevTrigger>
          Previous <span className="visually-hidden">Page</span>
        </Pagination.PrevTrigger>
        {pages.map((page, index) =>
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
        <Pagination.NextTrigger>
          Next <span className="visually-hidden">Page</span>
        </Pagination.NextTrigger>
      </>
    )}
  </Pagination.Root>
)
