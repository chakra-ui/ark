import { render } from '@testing-library/react'
import { Slider, type SliderProps } from './slider'
import { SliderControl } from './slider-control'
import { SliderInput } from './slider-input'
import { SliderRange } from './slider-range'
import { SliderThumb } from './slider-thumb'
import { SliderTrack } from './slider-track'

const Component = (props: SliderProps) => (
  <Slider {...props}>
    <SliderControl>
      <SliderTrack>
        <SliderRange />
      </SliderTrack>
      <SliderThumb>
        <SliderInput />∏
      </SliderThumb>
    </SliderControl>
  </Slider>
)

describe('Slider', () => {
  it('should render!', async () => {
    render(<Component />)
  })
})
