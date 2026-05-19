import { ChangeDetectionStrategy, Component, signal } from '@angular/core'
import { presenceExampleStyles } from '../presence-example-styles'
import { ArkPresenceComponent } from '../public-api'

@Component({
  selector: 'presence-basic-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ArkPresenceComponent],
  template: `
    <div class="root">
      <button class="ToggleButton" type="button" (click)="present.set(!present())">Toggle</button>

      <ark-presence [present]="present()">
        <ng-template>Content</ng-template>
      </ark-presence>
    </div>
  `,
  styles: [presenceExampleStyles],
})
export class PresenceBasicExample {
  readonly present = signal(false)
}
