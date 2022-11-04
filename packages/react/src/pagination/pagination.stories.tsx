import { Pagination } from './pagination'
import { PaginationEllipsis } from './pagination-ellipsis'
import { PaginationNextPage } from './pagination-next-page'
import { PaginationPage } from './pagination-page'
import { PaginationPages } from './pagination-pages'
import { PaginationPrevPage } from './pagination-prev-page'

export const Basic = () => (
  <Pagination count={500} pageSize={10} siblingCount={1}>
    <ul>
      <li>
        <PaginationPrevPage>
          Previous <span className="visually-hidden">Page</span>
        </PaginationPrevPage>
      </li>

      <PaginationPages>
        {(page, index) => (
          <li key={index}>
            {page.type === 'page' ? (
              <PaginationPage value={page.value}>{page.value}</PaginationPage>
            ) : (
              <PaginationEllipsis index={index}>&#8230;</PaginationEllipsis>
            )}
          </li>
        )}
      </PaginationPages>

      <li>
        <PaginationNextPage>
          Next <span className="visually-hidden">Page</span>
        </PaginationNextPage>
      </li>
    </ul>
  </Pagination>
)
