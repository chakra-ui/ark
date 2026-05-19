import { ChangeDetectionStrategy, Component } from '@angular/core'
import {
  ArkMenuContent,
  ArkMenuIndicator,
  ArkMenuItem,
  ArkMenuItemGroup,
  ArkMenuItemGroupLabel,
  ArkMenuPositioner,
  ArkMenuRoot,
  ArkMenuTrigger,
} from '@ark-ui/angular/menu'
import { ArkPortalComponent } from '@ark-ui/angular/portal'
import { menuExampleStyles } from '../menu-example-styles'
import { MenuChevronDownIcon } from './icons'

@Component({
  selector: 'menu-group-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ArkMenuRoot,
    ArkMenuTrigger,
    ArkMenuIndicator,
    ArkMenuPositioner,
    ArkMenuContent,
    ArkMenuItem,
    ArkMenuItemGroup,
    ArkMenuItemGroupLabel,
    ArkPortalComponent,
    MenuChevronDownIcon,
  ],
  template: `
    <div arkMenu #root="arkMenu">
      <button type="button" arkMenuTrigger>
        Edit
        <span arkMenuIndicator>
          <menu-chevron-down-icon />
        </span>
      </button>
      <ark-portal [originInjector]="root.getContextCarrier().elementInjector">
        <div arkMenuPositioner>
          <div arkMenuContent>
            <div arkMenuItemGroup>
              <div arkMenuItemGroupLabel>Clipboard</div>
              <div arkMenuItem value="cut">Cut</div>
              <div arkMenuItem value="copy">Copy</div>
              <div arkMenuItem value="paste">Paste</div>
            </div>
            <div arkMenuItemGroup>
              <div arkMenuItemGroupLabel>Selection</div>
              <div arkMenuItem value="select-all">Select All</div>
              <div arkMenuItem value="deselect">Deselect</div>
            </div>
          </div>
        </div>
      </ark-portal>
    </div>
  `,
  styles: [menuExampleStyles],
})
export class MenuGroupExample {}
