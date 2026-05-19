import { ChangeDetectionStrategy, Component } from '@angular/core'
import { ArkToggleContext, ArkToggleRoot } from '@ark-ui/angular/toggle'
import { toggleExampleStyles } from '../toggle-example-styles'
import { ToggleBoldIcon } from './icons'

@Component({
  selector: 'toggle-context-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ArkToggleRoot, ArkToggleContext, ToggleBoldIcon],
  template: `
    <button arkToggle>
      <toggle-bold-icon />
      <ng-template arkToggleContext let-toggle="api">
        <span>{{ toggle().pressed ? 'On' : 'Off' }}</span>
      </ng-template>
    </button>
  `,
  styles: [toggleExampleStyles],
})
export class ToggleContextExample {}
