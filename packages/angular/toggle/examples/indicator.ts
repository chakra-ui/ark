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
        <toggle-heart-icon [filled]="toggle.api().pressed" />
      </span>
    </button>
  `,
  styles: [toggleExampleStyles],
})
export class ToggleIndicatorExample {}
