import { Pagination } from '../'

export const ComponentUnderTest = (props: Pagination.RootProps) => (
  <Pagination.Root {...props}>
    <Pagination.PrevTrigger>
      Previous <span className="visually-hidden">Page</span>
    </Pagination.PrevTrigger>
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
    <Pagination.NextTrigger>
      Next <span className="visually-hidden">Page</span>
    </Pagination.NextTrigger>
  </Pagination.Root>
)
