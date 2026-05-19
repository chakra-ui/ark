import { ChangeDetectionStrategy, Component, signal } from '@angular/core'
import type { TrapFocusOptions } from '@zag-js/focus-trap'
import { ArkFocusTrapDirective } from '../public-api'

@Component({
  selector: 'focus-trap-basic-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ArkFocusTrapDirective],
  template: `
    <button type="button" (click)="startTrap()">Start Trap</button>

    <div class="trap" [arkFocusTrap]="trapped()" [arkFocusTrapOptions]="trapOptions">
      <input type="text" placeholder="input" />
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
export class FocusTrapBasicExample {
  readonly trapped = signal(false)
  readonly trapOptions: TrapFocusOptions = { returnFocusOnDeactivate: false }

  startTrap(): void {
    this.trapped.set(true)
  }

  endTrap(): void {
    this.trapped.set(false)
  }
}
