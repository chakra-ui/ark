import { render, waitFor } from '@testing-library/vue'
import BasicComponentStory from './carousel.stories.vue'
import user from '@testing-library/user-event'

describe('Carousel', () => {
  it('should render', async () => {
    const { getByText, getByTestId, getAllByTestId } = render(BasicComponentStory)

    const prevTrigger = getByText('Prev')
    expect(prevTrigger).toBeInTheDocument()
    expect(prevTrigger).toHaveAttribute('data-part', 'previous-trigger')
    expect(prevTrigger).toHaveAttribute('type', 'button')
    expect(prevTrigger).toHaveAttribute('aria-label', 'Previous Slide')

    const nextTrigger = getByText('Next')
    expect(nextTrigger).toBeInTheDocument()
    expect(nextTrigger).toHaveAttribute('data-part', 'next-trigger')
    expect(nextTrigger).toHaveAttribute('type', 'button')
    expect(nextTrigger).toHaveAttribute('aria-label', 'Next Slide')

    const indicatorGroup = getByTestId('indicator-group')
    expect(indicatorGroup).toBeInTheDocument()
    expect(indicatorGroup).toHaveAttribute('data-part', 'indicator-group')

    const indicators = getAllByTestId('indicator')
    expect(indicators).toHaveLength(5)
    expect(indicators[0]).toHaveAttribute('data-part', 'indicator')
    expect(indicators[0]).toHaveAttribute('data-index', '0')
    expect(indicators[0]).toHaveAttribute('data-current', '')
  })

  describe('indicators', () => {
    it('goes to the indicated slide on indicator click', async () => {
      const { getAllByTestId } = render(BasicComponentStory)
      const indicators = getAllByTestId('indicator')
      const slides = getAllByTestId('slide')

      expect(slides[0]).toHaveAttribute('data-current', '')
      expect(indicators[0]).toHaveAttribute('data-current', '')
      await user.click(indicators[2])

      await waitFor(() => {
        expect(indicators[0]).not.toHaveAttribute('data-current', '')
        expect(slides[0]).not.toHaveAttribute('data-current', '')
        expect(indicators[2]).toHaveAttribute('data-current', '')
        expect(slides[2]).toHaveAttribute('data-current', '')
      })
    })
  })
})
