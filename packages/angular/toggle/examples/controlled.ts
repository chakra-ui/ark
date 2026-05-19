import { ChangeDetectionStrategy, Component, signal } from '@angular/core'
import { ArkToggleIndicator, ArkToggleRoot } from '@ark-ui/angular/toggle'
import { toggleExampleStyles } from '../toggle-example-styles'
import { ToggleHeartIcon } from './icons'

@Component({
  selector: 'toggle-controlled-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ArkToggleRoot, ArkToggleIndicator, ToggleHeartIcon],
  template: `
    <button arkToggle [(pressed)]="pressed">
      <span arkToggleIndicator>
        @if (pressed()) {
          <toggle-heart-icon [filled]="true" />
        } @else {
          <toggle-heart-icon />
        }
      </span>
    </button>
  `,
  styles: [toggleExampleStyles],
})
export class ToggleControlledExample {
  readonly pressed = signal<boolean | undefined>(false)
}
