import { ChangeDetectionStrategy, Component } from '@angular/core'
import { ArkToggleRoot, injectArkToggleContext } from '@ark-ui/angular/toggle'
import { toggleExampleStyles } from '../toggle-example-styles'

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
  imports: [ArkToggleRoot, ToggleContextLabel],
  template: `
    <button arkToggle>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        aria-hidden="true"
      >
        <path d="M6 12h9a4 4 0 0 1 0 8H7a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h7a4 4 0 0 1 0 8H6" />
      </svg>
      <toggle-context-label />
    </button>
  `,
  styles: [toggleExampleStyles],
})
export class ToggleContextExample {}
