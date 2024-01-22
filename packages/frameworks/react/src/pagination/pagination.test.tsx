import { paginationAnatomy } from '@ark-ui/anatomy'
import { render, screen } from '@testing-library/react'
import user from '@testing-library/user-event'
import { getExports, getParts } from '../setup-test'
import { Pagination, type PaginationRootProps } from './'

const ComponentUnderTest = (props: PaginationRootProps) => (
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

describe('Pagination', () => {
  it.each(getParts(paginationAnatomy))('should render part! %s', async (part) => {
    render(<ComponentUnderTest count={100} pageSize={10} />)
    // eslint-disable-next-line testing-library/no-node-access
    expect(document.querySelector(part)).toBeInTheDocument()
  })

  it.each(getExports(paginationAnatomy))('should export %s', async (part) => {
    expect(Pagination[part]).toBeDefined()
  })

  it('should update page when item is clicked', async () => {
    render(<ComponentUnderTest count={100} pageSize={10} />)

    const pageTwoLink = screen.getByLabelText('page 2')
    expect(pageTwoLink).not.toHaveAttribute('aria-current', 'page')

    await user.click(pageTwoLink)
    expect(pageTwoLink).toHaveAttribute('aria-current', 'page')
  })

  it('should update page when next button is clicked', async () => {
    render(<ComponentUnderTest count={100} pageSize={10} />)

    const pageOneLink = screen.getByLabelText('page 1')
    expect(pageOneLink).toHaveAttribute('aria-current', 'page')

    const nextPageLink = screen.getByText(/next/i)
    await user.click(nextPageLink)

    const pageTwoLink = screen.getByLabelText('page 2')
    expect(pageTwoLink).toHaveAttribute('aria-current', 'page')
  })

  it('should update page when prev button is clicked', async () => {
    render(<ComponentUnderTest count={100} pageSize={10} />)

    const pageTwoLink = screen.getByLabelText('page 2')

    await user.click(pageTwoLink)
    expect(pageTwoLink).toHaveAttribute('aria-current', 'page')

    const prevPageLink = screen.getByText(/prev/i)
    await user.click(prevPageLink)

    const pageOneLink = screen.getByLabelText('page 1')
    expect(pageOneLink).toHaveAttribute('aria-current', 'page')
  })
})
