import { ChangeDetectionStrategy, Component, signal } from '@angular/core'
import { ArkSwapIndicatorComponent, ArkSwapRootComponent } from '../public-api'

@Component({
  selector: 'swap-fade-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ArkSwapRootComponent, ArkSwapIndicatorComponent],
  template: `
    <button type="button" class="button" (click)="swapped.set(!swapped())" [attr.aria-pressed]="swapped()">
      <ark-swap [swap]="swapped()">
        <ark-swap-indicator type="on" class="indicator fade-indicator">Check</ark-swap-indicator>
        <ark-swap-indicator type="off" class="indicator fade-indicator">Close</ark-swap-indicator>
      </ark-swap>
    </button>
  `,
  styles: [
    `
      .button {
        min-width: 104px;
        min-height: 44px;
        border: 1px solid #d4d4d8;
        border-radius: 6px;
        background: white;
        color: #18181b;
        font: inherit;
        font-weight: 500;
        padding: 10px 14px;
        cursor: pointer;
      }

      .indicator {
        min-width: 56px;
        justify-content: center;
      }

      .fade-indicator {
        transition: opacity 150ms ease;
      }

      .fade-indicator[data-state='closed'] {
        opacity: 0;
      }
    `,
  ],
})
export class SwapFadeExample {
  readonly swapped = signal(false)
}
