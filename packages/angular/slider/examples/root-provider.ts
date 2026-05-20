import { ChangeDetectionStrategy, Component } from '@angular/core'
import {
  ArkSliderControl,
  ArkSliderHiddenInput,
  ArkSliderLabel,
  ArkSliderRange,
  ArkSliderRootProvider,
  ArkSliderThumb,
  ArkSliderTrack,
  ArkSliderValueText,
  useSlider,
} from '../public-api'
import { sliderExampleStyles } from '../slider-example-styles'

@Component({
  selector: 'slider-root-provider-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ArkSliderRootProvider,
    ArkSliderLabel,
    ArkSliderValueText,
    ArkSliderControl,
    ArkSliderTrack,
    ArkSliderRange,
    ArkSliderThumb,
    ArkSliderHiddenInput,
  ],
  template: `
    <button class="slider-example-button" type="button" (click)="slider.api().focus()">Focus</button>

    <div arkSliderRootProvider [value]="slider">
      <label arkSliderLabel>Label</label>
      <span arkSliderValueText #valueText="arkSliderValueText">{{ valueText.valueAsString() }}</span>
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
export class SliderRootProviderExample {
  readonly slider = useSlider({ context: () => ({}) })
}
