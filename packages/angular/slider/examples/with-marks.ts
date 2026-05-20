import { ChangeDetectionStrategy, Component } from '@angular/core'
import {
  ArkSliderControl,
  ArkSliderHiddenInput,
  ArkSliderLabel,
  ArkSliderMarker,
  ArkSliderMarkerGroup,
  ArkSliderRange,
  ArkSliderRoot,
  ArkSliderThumb,
  ArkSliderTrack,
  ArkSliderValueText,
} from '../public-api'
import { sliderExampleStyles } from '../slider-example-styles'

@Component({
  selector: 'slider-with-marks-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ArkSliderRoot,
    ArkSliderLabel,
    ArkSliderValueText,
    ArkSliderControl,
    ArkSliderTrack,
    ArkSliderRange,
    ArkSliderThumb,
    ArkSliderHiddenInput,
    ArkSliderMarkerGroup,
    ArkSliderMarker,
  ],
  template: `
    <div arkSlider [defaultValue]="[50]">
      <div class="slider-example-header">
        <label arkSliderLabel>Label</label>
        <span arkSliderValueText #valueText="arkSliderValueText">{{ valueText.valueAsString() }}</span>
      </div>
      <div arkSliderControl>
        <div arkSliderTrack>
          <div arkSliderRange></div>
        </div>
        <div arkSliderThumb index="0">
          <input arkSliderHiddenInput />
        </div>
      </div>
      <div arkSliderMarkerGroup>
        @for (value of values; track value) {
          <span arkSliderMarker [value]="value">{{ value }}</span>
        }
      </div>
    </div>
  `,
  styles: [sliderExampleStyles],
})
export class SliderWithMarksExample {
  readonly values = [0, 25, 50, 75, 100]
}
