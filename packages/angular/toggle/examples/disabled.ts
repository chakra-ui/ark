import { ChangeDetectionStrategy, Component } from '@angular/core'
import { ArkToggleRoot } from '@ark-ui/angular/toggle'
import { toggleExampleStyles } from '../toggle-example-styles'
import { ToggleBoldIcon } from './icons'

@Component({
  selector: 'toggle-disabled-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ArkToggleRoot, ToggleBoldIcon],
  template: `
    <button arkToggle disabled>
      <toggle-bold-icon />
    </button>
  `,
  styles: [toggleExampleStyles],
})
export class ToggleDisabledExample {}
