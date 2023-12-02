import { paginationAnatomy } from '@ark-ui/anatomy'
import user from '@testing-library/user-event'
import { render, screen } from '@testing-library/vue'
import { getParts } from '../../setup-test'
import ComponentUnderTest from './pagination.test.vue'

describe('Pagination', () => {
  it.each(getParts(paginationAnatomy))('should render part! %s', async (part) => {
    render(ComponentUnderTest)
    expect(document.querySelector(part)).toBeInTheDocument()
  })

  it('should update page when item is clicked', async () => {
    render(ComponentUnderTest)

    const pageTwoLink = screen.getByLabelText('page 2')
    expect(pageTwoLink).not.toHaveAttribute('aria-current', 'page')

    await user.click(pageTwoLink)
    expect(screen.getByLabelText('page 2')).toHaveAttribute('aria-current', 'page')
  })

  it('should update page when next button is clicked', async () => {
    render(ComponentUnderTest)

    const pageOneLink = screen.getByLabelText('page 1')
    expect(pageOneLink).toHaveAttribute('aria-current', 'page')
    const nextPageLink = screen.getByText(/next/i)

    await user.click(nextPageLink)
    const pageTwoLink = screen.getByLabelText('page 2')
    expect(pageTwoLink).toHaveAttribute('aria-current', 'page')
  })

  it('should update page when prev button is clicked', async () => {
    render(ComponentUnderTest)

    const pageTwoLink = screen.getByLabelText('page 2')
    await user.click(pageTwoLink)
    expect(screen.getByLabelText('page 2')).toHaveAttribute('aria-current', 'page')

    const prevPageLink = screen.getByText(/prev/i)
    await user.click(prevPageLink)
    expect(screen.getByLabelText('page 1')).toHaveAttribute('aria-current', 'page')
  })
})
