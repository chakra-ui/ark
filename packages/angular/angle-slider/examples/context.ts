import { ChangeDetectionStrategy, Component } from '@angular/core'
import {
  ArkAngleSliderContext,
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
  selector: 'angle-slider-context-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ArkAngleSliderRoot,
    ArkAngleSliderContext,
    ArkAngleSliderLabel,
    ArkAngleSliderControl,
    ArkAngleSliderMarkerGroup,
    ArkAngleSliderMarker,
    ArkAngleSliderThumb,
    ArkAngleSliderValueText,
    ArkAngleSliderHiddenInput,
  ],
  template: `
    <div arkAngleSlider #angleSlider="arkAngleSlider">
      <ng-template arkAngleSliderContext let-angleSliderContext="api">
        <label arkAngleSliderLabel>{{ angleSliderContext().value }} degrees</label>
      </ng-template>
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
export class AngleSliderContextExample {
  protected readonly markers = [0, 45, 90, 135, 180, 225, 270, 315]
}
