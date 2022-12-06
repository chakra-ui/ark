import { Pagination } from './pagination'
import { PaginationEllipsis } from './pagination-ellipsis'
import { PaginationItem } from './pagination-item'
import { PaginationList } from './pagination-list'
import { PaginationNextItem } from './pagination-next-item'
import { PaginationPrevItem } from './pagination-prev-item'
import './pagination.css'

export const Basic = () => (
  <Pagination count={5000} pageSize={10} siblingCount={2}>
    {({ pages }) => (
      <PaginationList>
        <PaginationPrevItem>
          <button>
            Previous <span className="visually-hidden">Page</span>
          </button>
        </PaginationPrevItem>

        {pages.map((page, index) =>
          page.type === 'page' ? (
            <PaginationItem key={index} value={page.value}>
              <button>{page.value}</button>
            </PaginationItem>
          ) : (
            <PaginationEllipsis key={index} index={index}>
              &#8230;
            </PaginationEllipsis>
          ),
        )}

        <PaginationNextItem>
          <button>
            Next <span className="visually-hidden">Page</span>
          </button>
        </PaginationNextItem>
      </PaginationList>
    )}
  </Pagination>
)
