import { render } from '@testing-library/vue'
import BasicComponentStory from './carousel.stories.vue'

describe('Carousel', () => {
  it('should render', async () => {
    const { getByText } = render(BasicComponentStory)

    const prevTrigger = getByText('Prev')
    expect(prevTrigger).toBeInTheDocument()
    expect(prevTrigger).toHaveAttribute('data-part', 'previous-trigger')
    expect(prevTrigger).toHaveAttribute('type', 'button')
    expect(prevTrigger).toHaveAttribute('aria-label', 'Previous Slide')

    const nextTrigger = getByText('Next')
    expect(nextTrigger).toBeInTheDocument()
    expect(nextTrigger).toBeInTheDocument()
    expect(nextTrigger).toHaveAttribute('data-part', 'next-trigger')
    expect(nextTrigger).toHaveAttribute('type', 'button')
    expect(nextTrigger).toHaveAttribute('aria-label', 'Next Slide')
  })
})
