import { ChangeDetectionStrategy, Component, type ElementRef, signal, viewChild } from '@angular/core'
import type { TrapFocusOptions } from '@zag-js/focus-trap'
import { ArkFocusTrapDirective } from '../public-api'

@Component({
  selector: 'focus-trap-autofocus-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ArkFocusTrapDirective],
  template: `
    <button #trigger type="button" (click)="toggleTrap()">
      {{ trapped() ? 'End Trap' : 'Start Trap' }}
    </button>

    @if (trapped()) {
      <div class="trap" [arkFocusTrap]="trapped()" [arkFocusTrapOptions]="trapOptions">
        <input type="text" placeholder="Regular input" />
        <input type="text" placeholder="Autofocused input" autofocus />
        <button type="button" (click)="endTrap()">End Trap</button>
      </div>
    }
  `,
  styles: [
    `
      :host {
        display: block;
      }

      .trap {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        padding-block: 1rem;
      }

      button,
      input {
        font: inherit;
      }
    `,
  ],
})
export class FocusTrapAutofocusExample {
  readonly trapped = signal(false)
  private readonly trigger = viewChild<ElementRef<HTMLButtonElement>>('trigger')

  readonly trapOptions: TrapFocusOptions = {
    setReturnFocus: () => this.trigger()?.nativeElement ?? false,
  }

  toggleTrap(): void {
    this.trapped.update((trapped) => !trapped)
  }

  endTrap(): void {
    this.trapped.set(false)
  }
}
