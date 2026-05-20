import { ChangeDetectionStrategy, Component } from '@angular/core'
import {
  ArkSliderControl,
  ArkSliderHiddenInput,
  ArkSliderLabel,
  ArkSliderRange,
  ArkSliderRoot,
  ArkSliderThumb,
  ArkSliderTrack,
  ArkSliderValueText,
} from '../public-api'
import { sliderExampleStyles } from '../slider-example-styles'

@Component({
  selector: 'slider-min-max-example',
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
  ],
  template: `
    <div arkSlider [min]="-10" [max]="10" [defaultValue]="[5]">
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
    </div>
  `,
  styles: [sliderExampleStyles],
})
export class SliderMinMaxExample {}
