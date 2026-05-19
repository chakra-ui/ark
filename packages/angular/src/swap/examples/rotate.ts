import { ChangeDetectionStrategy, Component, signal } from '@angular/core'
import { ArkSwapIndicatorComponent, ArkSwapRootComponent } from '../public-api'

@Component({
  selector: 'swap-rotate-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ArkSwapRootComponent, ArkSwapIndicatorComponent],
  template: `
    <button type="button" class="button" (click)="swapped.set(!swapped())" [attr.aria-pressed]="swapped()">
      <ark-swap [swap]="swapped()">
        <ark-swap-indicator type="on" class="indicator rotate-indicator">Sun</ark-swap-indicator>
        <ark-swap-indicator type="off" class="indicator rotate-indicator">Moon</ark-swap-indicator>
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

      .rotate-indicator {
        transition:
          opacity 150ms ease,
          transform 150ms ease;
      }

      .rotate-indicator[data-state='closed'] {
        opacity: 0;
        transform: rotate(-90deg);
      }
    `,
  ],
})
export class SwapRotateExample {
  readonly swapped = signal(false)
}
