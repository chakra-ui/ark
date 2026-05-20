import { ChangeDetectionStrategy, Component } from '@angular/core'
import {
  ArkAngleSliderControl,
  ArkAngleSliderHiddenInput,
  ArkAngleSliderLabel,
  ArkAngleSliderMarker,
  ArkAngleSliderMarkerGroup,
  ArkAngleSliderRootProvider,
  ArkAngleSliderThumb,
  ArkAngleSliderValueText,
  useAngleSlider,
} from '../public-api'
import { angleSliderExampleStyles } from '../angle-slider-example-styles'

@Component({
  selector: 'angle-slider-root-provider-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ArkAngleSliderRootProvider,
    ArkAngleSliderLabel,
    ArkAngleSliderControl,
    ArkAngleSliderMarkerGroup,
    ArkAngleSliderMarker,
    ArkAngleSliderThumb,
    ArkAngleSliderValueText,
    ArkAngleSliderHiddenInput,
  ],
  template: `
    <div class="stack">
      <div arkAngleSliderRootProvider [value]="angleSlider">
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

      <button class="button" type="button" (click)="angleSlider.api().setValue(90)">Set to 90</button>
    </div>
  `,
  styles: [angleSliderExampleStyles],
})
export class AngleSliderRootProviderExample {
  protected readonly angleSlider = useAngleSlider({ context: () => ({}) })
  protected readonly markers = [0, 45, 90, 135, 180, 225, 270, 315]
}
