import { ChangeDetectionStrategy, Component, signal } from '@angular/core'
import { ArkSwapIndicatorComponent, ArkSwapRootComponent } from '../public-api'
import { swapExampleStyles } from '../swap-example-styles'
import { SwapCheckIcon, SwapXIcon } from './icons'

@Component({
  selector: 'swap-fade-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ArkSwapRootComponent, ArkSwapIndicatorComponent, SwapCheckIcon, SwapXIcon],
  template: `
    <button
      type="button"
      class="Button"
      aria-label="Toggle completion"
      (click)="swapped.set(!swapped())"
      [attr.aria-pressed]="swapped()"
    >
      <ark-swap [swap]="swapped()">
        <ark-swap-indicator type="on" class="FadeIndicator"><swap-check-icon /></ark-swap-indicator>
        <ark-swap-indicator type="off" class="FadeIndicator"><swap-x-icon /></ark-swap-indicator>
      </ark-swap>
    </button>
  `,
  styles: [swapExampleStyles],
})
export class SwapFadeExample {
  readonly swapped = signal(false)
}
