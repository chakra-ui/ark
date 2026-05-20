import { ChangeDetectionStrategy, Component } from '@angular/core'
import { ArkToggleGroupItem, ArkToggleGroupRootProvider, useToggleGroup } from '@ark-ui/angular/toggle-group'
import { toggleGroupExampleStyles } from '../toggle-group-example-styles'
import {
  ToggleGroupAlignCenterIcon,
  ToggleGroupAlignJustifyIcon,
  ToggleGroupAlignLeftIcon,
  ToggleGroupAlignRightIcon,
} from './icons'

@Component({
  selector: 'toggle-group-root-provider-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ArkToggleGroupRootProvider,
    ArkToggleGroupItem,
    ToggleGroupAlignLeftIcon,
    ToggleGroupAlignCenterIcon,
    ToggleGroupAlignRightIcon,
    ToggleGroupAlignJustifyIcon,
  ],
  template: `
    <output>Set to Center: {{ String(toggleGroup.api().value) }}</output>
    <div arkToggleGroupRootProvider [value]="toggleGroup">
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
export class ToggleGroupRootProviderExample {
  protected readonly String = String
  readonly toggleGroup = useToggleGroup({ context: () => ({ defaultValue: ['left'] }) })
}
