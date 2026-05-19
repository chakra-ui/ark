import { ChangeDetectionStrategy, Component } from '@angular/core'
import { ArkToggleIndicator, ArkToggleRoot } from '@ark-ui/angular/toggle'
import { toggleExampleStyles } from '../toggle-example-styles'
import { ToggleHeartIcon } from './icons'

@Component({
  selector: 'toggle-indicator-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ArkToggleRoot, ArkToggleIndicator, ToggleHeartIcon],
  template: `
    <button arkToggle #toggle="arkToggle">
      <span arkToggleIndicator>
        @if (toggle.api().pressed) {
          <toggle-heart-icon [filled]="true" />
        } @else {
          <toggle-heart-icon />
        }
      </span>
    </button>
  `,
  styles: [toggleExampleStyles],
})
export class ToggleIndicatorExample {}
