import { ChangeDetectionStrategy, Component, signal } from '@angular/core'
import { ArkSwapIndicatorComponent, ArkSwapRootComponent } from '../public-api'
import { swapExampleStyles } from '../swap-example-styles'
import { SwapVolumeIcon, SwapVolumeXIcon } from './icons'

@Component({
  selector: 'swap-scale-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ArkSwapRootComponent, ArkSwapIndicatorComponent, SwapVolumeIcon, SwapVolumeXIcon],
  template: `
    <button
      type="button"
      class="Button"
      aria-label="Toggle sound"
      (click)="swapped.set(!swapped())"
      [attr.aria-pressed]="swapped()"
    >
      <ark-swap [swap]="swapped()">
        <ark-swap-indicator type="on" class="ScaleIndicator"><swap-volume-icon /></ark-swap-indicator>
        <ark-swap-indicator type="off" class="ScaleIndicator"><swap-volume-x-icon /></ark-swap-indicator>
      </ark-swap>
    </button>
  `,
  styles: [swapExampleStyles],
})
export class SwapScaleExample {
  readonly swapped = signal(false)
}
