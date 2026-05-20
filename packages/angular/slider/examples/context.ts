import { ChangeDetectionStrategy, Component } from '@angular/core'
import {
  ArkSliderContext,
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
  selector: 'slider-context-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ArkSliderRoot,
    ArkSliderContext,
    ArkSliderLabel,
    ArkSliderValueText,
    ArkSliderControl,
    ArkSliderTrack,
    ArkSliderRange,
    ArkSliderThumb,
    ArkSliderHiddenInput,
  ],
  template: `
    <div arkSlider [defaultValue]="[40]">
      <ng-template arkSliderContext let-api>
        <div class="slider-example-header">
          <label arkSliderLabel>Dragging: {{ api().dragging }}</label>
          <span arkSliderValueText>{{ api().value.join(', ') }}</span>
        </div>
      </ng-template>
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
export class SliderContextExample {}
