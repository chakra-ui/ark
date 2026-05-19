import { ChangeDetectionStrategy, Component, signal } from '@angular/core'
import { presenceExampleStyles } from '../presence-example-styles'
import { ArkPresenceComponent } from '../public-api'

@Component({
  selector: 'presence-unmount-on-exit-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ArkPresenceComponent],
  template: `
    <div class="root">
      <button class="ToggleButton" type="button" (click)="present.set(!present())">Toggle</button>

      <ark-presence [present]="present()" unmountOnExit>
        <ng-template>Unmount on Exit</ng-template>
      </ark-presence>
    </div>
  `,
  styles: [presenceExampleStyles],
})
export class PresenceUnmountOnExitExample {
  readonly present = signal(false)
}
