import { fireEvent, render, screen } from 'solid-testing-library'
import {
  Pagination,
  PaginationEllipsis,
  PaginationItem,
  PaginationList,
  PaginationNextItem,
  PaginationPrevItem,
  PaginationProps,
} from '.'

const ComponentUnderTest = (props: Omit<PaginationProps, 'children'>) => (
  <Pagination {...props}>
    {({ pages }) => (
      <PaginationList>
        <PaginationPrevItem>
          <button>
            Previous <span class="visually-hidden">Page</span>
          </button>
        </PaginationPrevItem>

        {pages.map((page, index) =>
          page.type === 'page' ? (
            <PaginationItem value={page.value}>
              <button>{page.value}</button>
            </PaginationItem>
          ) : (
            <PaginationEllipsis index={index}>&#8230;</PaginationEllipsis>
          ),
        )}
        <PaginationNextItem>
          <button>
            Next <span class="visually-hidden">Page</span>
          </button>
        </PaginationNextItem>
      </PaginationList>
    )}
  </Pagination>
)

describe('Pagination', () => {
  it('should update page when item is clicked', async () => {
    render(() => <ComponentUnderTest count={100} pageSize={10} />)
    const pageTwoLink = screen.getByLabelText('page 2')
    expect(pageTwoLink).not.toHaveAttribute('aria-current', 'page')
    fireEvent.click(pageTwoLink)
    expect(pageTwoLink).toHaveAttribute('aria-current', 'page')
  })

  it('should update page when next button is clicked', async () => {
    render(() => <ComponentUnderTest count={100} pageSize={10} />)
    const pageOneLink = screen.getByLabelText('page 1')
    expect(pageOneLink).toHaveAttribute('aria-current', 'page')
    const nextPageLink = screen.getByText(/next/i)
    fireEvent.click(nextPageLink)
    const pageTwoLink = screen.getByLabelText('page 2')
    expect(pageTwoLink).toHaveAttribute('aria-current', 'page')
  })

  it('should update page when prev button is clicked', async () => {
    render(() => <ComponentUnderTest count={100} pageSize={10} />)

    const pageTwoLink = screen.getByLabelText('page 2')
    fireEvent.click(pageTwoLink)
    expect(pageTwoLink).toHaveAttribute('aria-current', 'page')

    const prevPageLink = screen.getByText(/prev/i)
    fireEvent.click(prevPageLink)
    const pageOneLink = screen.getByLabelText('page 1')
    expect(pageOneLink).toHaveAttribute('aria-current', 'page')
  })
})
