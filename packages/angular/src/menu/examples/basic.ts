import { ChangeDetectionStrategy, Component } from '@angular/core'
import {
  ArkMenuContent,
  ArkMenuIndicator,
  ArkMenuItem,
  ArkMenuPositioner,
  ArkMenuRoot,
  ArkMenuTrigger,
} from '@ark-ui/angular/menu'
import { ArkPortalComponent } from '@ark-ui/angular/portal'
import { menuExampleStyles } from '../menu-example-styles'
import { MenuChevronDownIcon } from './icons'

@Component({
  selector: 'menu-basic-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ArkMenuRoot,
    ArkMenuTrigger,
    ArkMenuIndicator,
    ArkMenuPositioner,
    ArkMenuContent,
    ArkMenuItem,
    ArkPortalComponent,
    MenuChevronDownIcon,
  ],
  template: `
    <div arkMenu #root="arkMenu">
      <button type="button" arkMenuTrigger>
        File
        <span arkMenuIndicator>
          <menu-chevron-down-icon />
        </span>
      </button>
      <ark-portal [originInjector]="root.getContextCarrier().elementInjector">
        <div arkMenuPositioner>
          <div arkMenuContent>
            <div arkMenuItem value="new-file">New File</div>
            <div arkMenuItem value="open">Open...</div>
            <div arkMenuItem value="save">Save</div>
            <div arkMenuItem value="save-as">Save As...</div>
          </div>
        </div>
      </ark-portal>
    </div>
  `,
  styles: [menuExampleStyles],
})
export class MenuBasicExample {}
