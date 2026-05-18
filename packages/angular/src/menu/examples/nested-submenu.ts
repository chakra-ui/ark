import { ChangeDetectionStrategy, Component } from '@angular/core'
import {
  ArkMenuContent,
  ArkMenuIndicator,
  ArkMenuItem,
  ArkMenuPositioner,
  ArkMenuRoot,
  ArkMenuSeparator,
  ArkMenuTrigger,
  ArkMenuTriggerItem,
} from '@ark-ui/angular/menu'
import { ArkPortalComponent } from '@ark-ui/angular/portal'
import { menuExampleStyles } from '../menu-example-styles'
import { MenuChevronDownIcon, MenuChevronRightIcon } from './icons'

@Component({
  selector: 'menu-nested-submenu-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ArkMenuRoot,
    ArkMenuTrigger,
    ArkMenuTriggerItem,
    ArkMenuIndicator,
    ArkMenuPositioner,
    ArkMenuContent,
    ArkMenuItem,
    ArkMenuSeparator,
    ArkPortalComponent,
    MenuChevronDownIcon,
    MenuChevronRightIcon,
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
            <div arkMenuItem value="new">New File</div>
            <div arkMenuItem value="open">Open...</div>
            <div arkMenuSeparator></div>
            <div arkMenu #share="arkMenu">
              <div arkMenuTriggerItem>
                <span>Share</span>
                <menu-chevron-right-icon />
              </div>
              <ark-portal [originInjector]="share.getContextCarrier().elementInjector">
                <div arkMenuPositioner>
                  <div arkMenuContent>
                    <div arkMenuItem value="email">Email</div>
                    <div arkMenuItem value="message">Message</div>
                    <div arkMenuItem value="airdrop">AirDrop</div>
                  </div>
                </div>
              </ark-portal>
            </div>
            <div arkMenuSeparator></div>
            <div arkMenuItem value="print">Print...</div>
          </div>
        </div>
      </ark-portal>
    </div>
  `,
  styles: [menuExampleStyles],
})
export class MenuNestedSubmenuExample {}
