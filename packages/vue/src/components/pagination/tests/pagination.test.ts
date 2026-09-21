import user from '@testing-library/user-event'
import { render, screen } from '@testing-library/vue'
import ComponentUnderTest from './pagination.test.vue'
import LinkComponentUnderTest from './pagination-link.test.vue'

describe('Pagination', () => {
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

  it('should render items and triggers as buttons by default', async () => {
    render(ComponentUnderTest)

    expect(screen.getByLabelText('page 2')).toHaveProperty('tagName', 'BUTTON')
    expect(screen.getByText(/next/i)).toHaveProperty('tagName', 'BUTTON')
  })

  it('should render items and triggers as links when type is link', async () => {
    render(LinkComponentUnderTest)

    const pageThree = screen.getByLabelText('page 3')
    expect(pageThree).toHaveProperty('tagName', 'A')
    expect(pageThree).toHaveAttribute('href', '/page/3')

    const nextTrigger = screen.getByText(/next/i)
    expect(nextTrigger).toHaveProperty('tagName', 'A')
    expect(nextTrigger).toHaveAttribute('href', '/page/3')
  })
})
