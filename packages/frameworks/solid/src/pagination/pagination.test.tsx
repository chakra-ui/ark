import { paginationAnatomy } from '@ark-ui/anatomy'
import { render, screen } from '@solidjs/testing-library'
import user from '@testing-library/user-event'
import { For } from 'solid-js'
import { getExports, getParts } from '../setup-test'
import { Pagination, type PaginationProps } from './'

const ComponentUnderTest = (props: PaginationProps) => (
  <Pagination.Root {...props}>
    {(api) => (
      <>
        <Pagination.PrevTrigger>
          Previous <span class="visually-hidden">Page</span>
        </Pagination.PrevTrigger>
        <For each={api().pages}>
          {(page, index) =>
            page.type === 'page' ? (
              <Pagination.Item {...page}>{page.value}</Pagination.Item>
            ) : (
              <Pagination.Ellipsis index={index()}>&#8230;</Pagination.Ellipsis>
            )
          }
        </For>
        <Pagination.NextTrigger>
          Next <span class="visually-hidden">Page</span>
        </Pagination.NextTrigger>
      </>
    )}
  </Pagination.Root>
)

describe('Pagination', () => {
  it.each(getParts(paginationAnatomy))('should render part! %s', async (part) => {
    render(() => <ComponentUnderTest count={100} pageSize={10} />)
    expect(document.querySelector(part)).toBeInTheDocument()
  })

  it.each(getExports(paginationAnatomy))('should export %s', async (part) => {
    expect(Pagination[part]).toBeDefined()
  })

  it('should update page when item is clicked', async () => {
    render(() => <ComponentUnderTest count={100} pageSize={10} />)
    expect(screen.getByLabelText('page 2')).not.toHaveAttribute('aria-current', 'page')

    await user.click(screen.getByLabelText('page 2'))
    expect(screen.getByLabelText('page 2')).toHaveAttribute('aria-current', 'page')
  })

  it('should update page when next button is clicked', async () => {
    render(() => <ComponentUnderTest count={100} pageSize={10} />)
    expect(screen.getByLabelText('page 1')).toHaveAttribute('aria-current', 'page')

    await user.click(screen.getByText(/next/i))
    expect(screen.getByLabelText('page 2')).toHaveAttribute('aria-current', 'page')
  })

  it('should update page when prev button is clicked', async () => {
    render(() => <ComponentUnderTest count={100} pageSize={10} />)

    await user.click(screen.getByLabelText('page 2'))
    expect(screen.getByLabelText('page 2')).toHaveAttribute('aria-current', 'page')

    await user.click(screen.getByText(/prev/i))
    expect(screen.getByLabelText('page 1')).toHaveAttribute('aria-current', 'page')
  })
})
