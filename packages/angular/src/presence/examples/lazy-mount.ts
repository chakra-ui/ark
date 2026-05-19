import { ChangeDetectionStrategy, Component, signal } from '@angular/core'
import { presenceExampleStyles } from '../presence-example-styles'
import { ArkPresenceComponent } from '../public-api'

@Component({
  selector: 'presence-lazy-mount-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ArkPresenceComponent],
  template: `
    <div class="root">
      <button class="ToggleButton" type="button" (click)="present.set(!present())">Toggle</button>

      <ark-presence [present]="present()" lazyMount>
        <ng-template>Lazy Mounted</ng-template>
      </ark-presence>
    </div>
  `,
  styles: [presenceExampleStyles],
})
export class PresenceLazyMountExample {
  readonly present = signal(false)
}
