import { ChangeDetectionStrategy, Component, signal } from '@angular/core'
import { ArkSwapIndicatorComponent, ArkSwapRootComponent } from '../public-api'

@Component({
  selector: 'swap-flip-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ArkSwapRootComponent, ArkSwapIndicatorComponent],
  template: `
    <button type="button" class="button" (click)="swapped.set(!swapped())" [attr.aria-pressed]="swapped()">
      <ark-swap [swap]="swapped()" class="root">
        <ark-swap-indicator type="on" class="indicator flip-indicator">Play</ark-swap-indicator>
        <ark-swap-indicator type="off" class="indicator flip-indicator">Pause</ark-swap-indicator>
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

      .root {
        perspective: 200px;
      }

      .indicator {
        min-width: 56px;
        justify-content: center;
      }

      .flip-indicator {
        backface-visibility: hidden;
        transform-origin: center;
        transition:
          opacity 150ms ease,
          transform 150ms ease;
      }

      .flip-indicator[data-state='closed'] {
        opacity: 0;
        transform: rotateX(90deg);
      }
    `,
  ],
})
export class SwapFlipExample {
  readonly swapped = signal(false)
}
