import user from '@testing-library/user-event'
import { render } from '@testing-library/vue'
import BasicComponentStory from './stories/basic.stories.vue'

describe('Pagination', () => {
  it('should update page when item is clicked', async () => {
    const { getByLabelText } = render(BasicComponentStory)

    const pageTwoLink = getByLabelText('Page 2')
    expect(pageTwoLink).not.toHaveAttribute('aria-current', 'page')
    await user.click(pageTwoLink)
    expect(pageTwoLink).toHaveAttribute('aria-current', 'page')
  })

  it('should update page when next button is clicked', async () => {
    const { getByLabelText, getByText } = render(BasicComponentStory)

    const pageOneLink = getByLabelText('Page 1')
    expect(pageOneLink).toHaveAttribute('aria-current', 'page')
    const nextPageLink = getByText(/next/i)
    await user.click(nextPageLink)
    const pageTwoLink = getByLabelText('Page 2')
    expect(pageTwoLink).toHaveAttribute('aria-current', 'page')
  })

  it('should update page when prev button is clicked', async () => {
    const { getByLabelText, getByText } = render(BasicComponentStory)

    const pageTwoLink = getByLabelText('Page 2')
    await user.click(pageTwoLink)

    expect(pageTwoLink).toHaveAttribute('aria-current', 'page')

    const prevPageLink = getByText(/prev/i)
    await user.click(prevPageLink)
    const pageOneLink = getByLabelText('Page 1')
    expect(pageOneLink).toHaveAttribute('aria-current', 'page')
  })
})
