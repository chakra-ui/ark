import { ChangeDetectionStrategy, Component } from '@angular/core'
import {
  ArkAngleSliderControl,
  ArkAngleSliderHiddenInput,
  ArkAngleSliderLabel,
  ArkAngleSliderMarker,
  ArkAngleSliderMarkerGroup,
  ArkAngleSliderRoot,
  ArkAngleSliderThumb,
  ArkAngleSliderValueText,
} from '../public-api'
import { angleSliderExampleStyles } from '../angle-slider-example-styles'

@Component({
  selector: 'angle-slider-disabled-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ArkAngleSliderRoot,
    ArkAngleSliderLabel,
    ArkAngleSliderControl,
    ArkAngleSliderMarkerGroup,
    ArkAngleSliderMarker,
    ArkAngleSliderThumb,
    ArkAngleSliderValueText,
    ArkAngleSliderHiddenInput,
  ],
  template: `
    <div arkAngleSlider disabled [defaultValue]="45" #angleSlider="arkAngleSlider">
      <label arkAngleSliderLabel>Rotation</label>
      <div arkAngleSliderControl>
        <div arkAngleSliderMarkerGroup>
          @for (value of markers; track value) {
            <div arkAngleSliderMarker [value]="value"></div>
          }
        </div>
        <div arkAngleSliderThumb></div>
      </div>
      <div arkAngleSliderValueText>{{ angleSlider.api().valueAsDegree }}</div>
      <input arkAngleSliderHiddenInput />
    </div>
  `,
  styles: [angleSliderExampleStyles],
})
export class AngleSliderDisabledExample {
  protected readonly markers = [0, 45, 90, 135, 180, 225, 270, 315]
}
