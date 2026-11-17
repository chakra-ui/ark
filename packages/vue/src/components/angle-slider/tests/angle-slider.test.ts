import { render, screen } from '@testing-library/vue'
import AriaLabelComponentUnderTest from './angle-slider-aria-label.test.vue'

describe('AngleSlider', () => {
  it('should name the thumb with the root aria-label', () => {
    render(AriaLabelComponentUnderTest)

    expect(screen.getByRole('slider')).toHaveAttribute('aria-label', 'Rotation')
  })
})
