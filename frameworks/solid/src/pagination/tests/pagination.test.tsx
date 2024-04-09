import { paginationAnatomy } from '@ark-ui/anatomy'
import { render, screen } from '@solidjs/testing-library'
import user from '@testing-library/user-event'
import { Pagination } from '../'
import { getExports, getParts } from '../../setup-test'
import { ComponentUnderTest } from './basic'

describe('Pagination', () => {
  it.each(getParts(paginationAnatomy))('should render part! %s', async (part) => {
    render(() => <ComponentUnderTest count={100} pageSize={10} />)
    // eslint-disable-next-line testing-library/no-node-access
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
