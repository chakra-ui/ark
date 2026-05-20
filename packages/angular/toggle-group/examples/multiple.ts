import { ChangeDetectionStrategy, Component } from '@angular/core'
import { ArkToggleGroupItem, ArkToggleGroupRoot } from '@ark-ui/angular/toggle-group'
import { toggleGroupExampleStyles } from '../toggle-group-example-styles'
import { ToggleGroupBoldIcon, ToggleGroupItalicIcon, ToggleGroupUnderlineIcon } from './icons'

@Component({
  selector: 'toggle-group-multiple-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ArkToggleGroupRoot,
    ArkToggleGroupItem,
    ToggleGroupBoldIcon,
    ToggleGroupItalicIcon,
    ToggleGroupUnderlineIcon,
  ],
  template: `
    <div arkToggleGroup [defaultValue]="['bold']" multiple>
      <button arkToggleGroupItem value="bold">
        <toggle-group-bold-icon />
      </button>
      <button arkToggleGroupItem value="italic">
        <toggle-group-italic-icon />
      </button>
      <button arkToggleGroupItem value="underline">
        <toggle-group-underline-icon />
      </button>
    </div>
  `,
  styles: [toggleGroupExampleStyles],
})
export class ToggleGroupMultipleExample {}
