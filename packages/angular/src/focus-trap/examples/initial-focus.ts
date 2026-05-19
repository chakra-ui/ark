import { ChangeDetectionStrategy, Component, type ElementRef, signal, viewChild } from '@angular/core'
import type { TrapFocusOptions } from '@zag-js/focus-trap'
import { ArkFocusTrapDirective } from '../public-api'

@Component({
  selector: 'focus-trap-initial-focus-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ArkFocusTrapDirective],
  template: `
    <button type="button" (click)="toggleTrap()">
      {{ trapped() ? 'End Trap' : 'Start Trap' }}
    </button>

    <div class="trap" [arkFocusTrap]="trapped()" [arkFocusTrapOptions]="trapOptions">
      <input type="text" placeholder="First input" />
      <input #initialFocusInput type="text" placeholder="Second input (initial focus)" />
      <textarea placeholder="textarea"></textarea>
      <button type="button" (click)="endTrap()">End Trap</button>
    </div>
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
      input,
      textarea {
        font: inherit;
      }
    `,
  ],
})
export class FocusTrapInitialFocusExample {
  readonly trapped = signal(false)
  private readonly initialFocusInput = viewChild<ElementRef<HTMLInputElement>>('initialFocusInput')

  readonly trapOptions: TrapFocusOptions = {
    initialFocus: () => this.initialFocusInput()?.nativeElement ?? false,
  }

  toggleTrap(): void {
    this.trapped.update((trapped) => !trapped)
  }

  endTrap(): void {
    this.trapped.set(false)
  }
}
