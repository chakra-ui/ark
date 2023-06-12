import user from '@testing-library/user-event'
import { render } from '@testing-library/vue'
import {
  Carousel,
  CarouselNextSlideTrigger,
  CarouselPrevSlideTrigger,
  CarouselSlide,
  CarouselSlideGroup,
  CarouselViewport,
} from '.'
import BasicComponentStory from './carousel.stories.vue'


describe('Carousel', () => {
  it('should render', async () => {
    const { getByText } = render(BasicComponentStory)

    expect(getByText('Prev')).toBeInTheDocument()
    expect(getByText('Next')).toBeInTheDocument()
  })
})