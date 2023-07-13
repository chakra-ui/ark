import { render, screen } from '@testing-library/react'
import user from '@testing-library/user-event'
import {
  Carousel,
  CarouselControl,
  CarouselIndicator,
  CarouselIndicatorGroup,
  CarouselNextSlideTrigger,
  CarouselPrevSlideTrigger,
  CarouselSlide,
  CarouselSlideGroup,
  CarouselViewport,
} from './'

const ComponentUnderTest = () => {
  const images = [
    'https://tinyurl.com/5b6ka8jd',
    'https://tinyurl.com/7rmccdn5',
    'https://tinyurl.com/59jxz9uu',
  ]
  return (
    <Carousel>
      <CarouselControl>
        <CarouselPrevSlideTrigger>Previous</CarouselPrevSlideTrigger>
        <CarouselNextSlideTrigger>Next</CarouselNextSlideTrigger>
      </CarouselControl>
      <CarouselViewport>
        <CarouselSlideGroup>
          {images.map((image, index) => (
            <CarouselSlide key={index} index={index} data-testid="slide">
              <img
                src={image}
                alt={`image-${index}`}
                style={{ height: '300px', width: '100%', objectFit: 'cover' }}
              />
            </CarouselSlide>
          ))}
        </CarouselSlideGroup>
      </CarouselViewport>
      <CarouselIndicatorGroup data-testid="indicator-group">
        {images.map((_, index) => (
          <CarouselIndicator key={index} index={index} data-testid="indicator">
            {index + 1}
          </CarouselIndicator>
        ))}
      </CarouselIndicatorGroup>
    </Carousel>
  )
}

describe('Carousel', () => {
  it('should render', async () => {
    render(<ComponentUnderTest />)
  })

  it('should have the correct disabled / enabled states for control buttons', async () => {
    render(<ComponentUnderTest />)
    const prevButton = screen.getByRole('button', { name: 'Previous Slide' })
    const nextButton = screen.getByRole('button', { name: 'Next Slide' })

    // first slide
    expect(prevButton).toBeDisabled()
    expect(nextButton).toBeEnabled()

    // second slide
    await user.click(nextButton)
    expect(prevButton).toBeEnabled()
    expect(nextButton).toBeEnabled()

    // last slide
    await user.click(nextButton)
    expect(prevButton).toBeEnabled()
    expect(nextButton).toBeDisabled()
  })

  describe('indicators', () => {
    it('goes to the indicated slide on indicator click', async () => {
      const { getAllByTestId } = render(<ComponentUnderTest />)
      const indicators = getAllByTestId('indicator')
      const slides = getAllByTestId('slide')

      expect(slides[0]).toHaveAttribute('data-current', '')
      expect(indicators[0]).toHaveAttribute('data-current', '')

      await user.click(indicators[2])

      expect(indicators[0]).not.toHaveAttribute('data-current', '')
      expect(slides[0]).not.toHaveAttribute('data-current', '')
      expect(indicators[2]).toHaveAttribute('data-current', '')
      expect(slides[2]).toHaveAttribute('data-current', '')
    })
  })
})
