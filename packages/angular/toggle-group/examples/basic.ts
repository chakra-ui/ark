import { ChangeDetectionStrategy, Component } from '@angular/core'
import { ArkToggleGroupItem, ArkToggleGroupRoot } from '@ark-ui/angular/toggle-group'
import { toggleGroupExampleStyles } from '../toggle-group-example-styles'
import {
  ToggleGroupAlignCenterIcon,
  ToggleGroupAlignJustifyIcon,
  ToggleGroupAlignLeftIcon,
  ToggleGroupAlignRightIcon,
} from './icons'

@Component({
  selector: 'toggle-group-basic-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ArkToggleGroupRoot,
    ArkToggleGroupItem,
    ToggleGroupAlignLeftIcon,
    ToggleGroupAlignCenterIcon,
    ToggleGroupAlignRightIcon,
    ToggleGroupAlignJustifyIcon,
  ],
  template: `
    <div arkToggleGroup [defaultValue]="['left']">
      <button arkToggleGroupItem value="left">
        <toggle-group-align-left-icon />
      </button>
      <button arkToggleGroupItem value="center">
        <toggle-group-align-center-icon />
      </button>
      <button arkToggleGroupItem value="right">
        <toggle-group-align-right-icon />
      </button>
      <button arkToggleGroupItem value="justify">
        <toggle-group-align-justify-icon />
      </button>
    </div>
  `,
  styles: [toggleGroupExampleStyles],
})
export class ToggleGroupBasicExample {}
