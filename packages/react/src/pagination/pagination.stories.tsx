import { Pagination } from './pagination'
import { PaginationEllipsis } from './pagination-ellipsis'
import { PaginationItem } from './pagination-item'
import { PaginationNextItem } from './pagination-next-item'
import { PaginationPrevItem } from './pagination-prev-item'

export const Basic = () => (
  <Pagination count={5000} pageSize={10} siblingCount={2}>
    {(pages) => (
      <ul>
        <li>
          <PaginationPrevItem>
            Previous <span className="visually-hidden">Page</span>
          </PaginationPrevItem>
        </li>

        {pages.map((page, index) => (
          <li key={index}>
            {page.type === 'page' ? (
              <PaginationItem value={page.value}>{page.value}</PaginationItem>
            ) : (
              <PaginationEllipsis index={index}>&#8230;</PaginationEllipsis>
            )}
          </li>
        ))}

        <li>
          <PaginationNextItem>
            Next <span className="visually-hidden">Page</span>
          </PaginationNextItem>
        </li>
      </ul>
    )}
  </Pagination>
)
