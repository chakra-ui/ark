import { ChangeDetectionStrategy, Component } from '@angular/core'
import { ArkToggleRoot, injectArkToggleContext } from '@ark-ui/angular/toggle'
import { toggleExampleStyles } from '../toggle-example-styles'
import { ToggleBoldIcon } from './icons'

@Component({
  selector: 'toggle-context-label',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<span>{{ context.api().pressed ? "On" : "Off" }}</span>',
})
export class ToggleContextLabel {
  readonly context = injectArkToggleContext()
}

@Component({
  selector: 'toggle-context-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ArkToggleRoot, ToggleBoldIcon, ToggleContextLabel],
  template: `
    <button arkToggle>
      <toggle-bold-icon />
      <toggle-context-label />
    </button>
  `,
  styles: [toggleExampleStyles],
})
export class ToggleContextExample {}
