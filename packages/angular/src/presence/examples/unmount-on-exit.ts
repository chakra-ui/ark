import { ChangeDetectionStrategy, Component, signal } from '@angular/core'
import { ArkPresenceComponent } from '../public-api'

@Component({
  selector: 'presence-unmount-on-exit-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ArkPresenceComponent],
  template: `
    <div class="root">
      <button type="button" (click)="present.set(!present())">
        {{ present() ? 'Hide content' : 'Show content' }}
      </button>

      <ark-presence [present]="present()" unmountOnExit>
        <ng-template>
          <div class="panel">This content is removed from the DOM after exit completes.</div>
        </ng-template>
      </ark-presence>
    </div>
  `,
  styles: [
    `
      .root {
        display: grid;
        gap: 16px;
        max-width: 360px;
      }

      button {
        min-height: 44px;
        justify-self: start;
        border: 0;
        border-radius: 6px;
        background: #18181b;
        color: white;
        font: inherit;
        font-weight: 500;
        padding: 10px 14px;
        cursor: pointer;
      }

      .panel {
        border-left: 4px solid #dc2626;
        background: #f4f4f5;
        color: #18181b;
        padding: 14px 16px;
      }
    `,
  ],
})
export class PresenceUnmountOnExitExample {
  readonly present = signal(false)
}
