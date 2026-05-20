import { ChangeDetectionStrategy, Component, signal } from '@angular/core'
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
  selector: 'angle-slider-controlled-example',
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
    <div arkAngleSlider [(value)]="value" #angleSlider="arkAngleSlider">
      <label arkAngleSliderLabel>Rotation</label>
      <div arkAngleSliderControl>
        <div arkAngleSliderMarkerGroup>
          @for (marker of markers; track marker) {
            <div arkAngleSliderMarker [value]="marker"></div>
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
export class AngleSliderControlledExample {
  protected readonly value = signal<number | undefined>(45)
  protected readonly markers = [0, 45, 90, 135, 180, 225, 270, 315]
}
