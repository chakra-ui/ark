import { For } from 'solid-js'
import {
  Pagination,
  PaginationEllipsis,
  PaginationList,
  PaginationListItem,
  PaginationNextPageTrigger,
  PaginationPageTrigger,
  PaginationPrevPageTrigger,
} from './'
import './pagination.css'

export const Basic = () => (
  <Pagination count={5000} pageSize={10} siblingCount={2}>
    {({ pages }) => (
      <PaginationList>
        <PaginationListItem>
          <PaginationPrevPageTrigger>
            <button>
              Previous <span class="visually-hidden">Page</span>
            </button>
          </PaginationPrevPageTrigger>
        </PaginationListItem>

        <For each={pages}>
          {(page, index) =>
            page.type === 'page' ? (
              <PaginationListItem>
                <PaginationPageTrigger value={page.value}>
                  <button>{page.value}</button>
                </PaginationPageTrigger>
              </PaginationListItem>
            ) : (
              <PaginationListItem>
                <PaginationEllipsis index={index()}>&#8230;</PaginationEllipsis>
              </PaginationListItem>
            )
          }
        </For>
        <PaginationListItem>
          <PaginationNextPageTrigger>
            <button>
              Next <span class="visually-hidden">Page</span>
            </button>
          </PaginationNextPageTrigger>
        </PaginationListItem>
      </PaginationList>
    )}
  </Pagination>
)
