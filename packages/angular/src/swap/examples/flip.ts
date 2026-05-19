import { ChangeDetectionStrategy, Component, signal } from '@angular/core'
import { ArkSwapIndicatorComponent, ArkSwapRootComponent } from '../public-api'
import { swapExampleStyles } from '../swap-example-styles'
import { SwapPauseIcon, SwapPlayIcon } from './icons'

@Component({
  selector: 'swap-flip-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ArkSwapRootComponent, ArkSwapIndicatorComponent, SwapPauseIcon, SwapPlayIcon],
  template: `
    <button
      type="button"
      class="Button"
      aria-label="Toggle playback"
      (click)="swapped.set(!swapped())"
      [attr.aria-pressed]="swapped()"
    >
      <ark-swap [swap]="swapped()" style="perspective: 200px">
        <ark-swap-indicator type="on" class="FlipIndicator"><swap-play-icon /></ark-swap-indicator>
        <ark-swap-indicator type="off" class="FlipIndicator"><swap-pause-icon /></ark-swap-indicator>
      </ark-swap>
    </button>
  `,
  styles: [swapExampleStyles],
})
export class SwapFlipExample {
  readonly swapped = signal(false)
}
