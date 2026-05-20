import { ChangeDetectionStrategy, Component } from '@angular/core'
import {
  ArkSliderControl,
  ArkSliderHiddenInput,
  ArkSliderLabel,
  ArkSliderRange,
  ArkSliderRoot,
  ArkSliderThumb,
  ArkSliderTrack,
} from '../public-api'
import { sliderExampleStyles } from '../slider-example-styles'

@Component({
  selector: 'slider-range-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ArkSliderRoot,
    ArkSliderLabel,
    ArkSliderControl,
    ArkSliderTrack,
    ArkSliderRange,
    ArkSliderThumb,
    ArkSliderHiddenInput,
  ],
  template: `
    <div arkSlider [defaultValue]="[30, 60]">
      <label arkSliderLabel>Label</label>
      <div arkSliderControl>
        <div arkSliderTrack>
          <div arkSliderRange></div>
        </div>
        <div arkSliderThumb index="0">
          <input arkSliderHiddenInput />
        </div>
        <div arkSliderThumb index="1">
          <input arkSliderHiddenInput />
        </div>
      </div>
    </div>
  `,
  styles: [sliderExampleStyles],
})
export class SliderRangeExample {}
