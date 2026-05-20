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
import { MenuChevronDownIcon } from './icons'

@Component({
  selector: 'menu-nested-example',
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
              <div arkMenuTriggerItem>Share</div>
              <ark-portal [originInjector]="share.getContextCarrier().elementInjector">
                <div arkMenuPositioner>
                  <div arkMenuContent>
                    <div arkMenuItem value="email">Email</div>
                    <div arkMenuItem value="message">Message</div>
                    <div arkMenuItem value="airdrop">AirDrop</div>
                    <div arkMenuItem value="test1">Test1</div>
                    <div arkMenuItem value="test2">Test2</div>
                    <div arkMenuItem value="test3">Test3</div>
                    <div arkMenuItem value="test4">Test4</div>
                  </div>
                </div>
              </ark-portal>
            </div>
            <div arkMenu #exportMenu="arkMenu">
              <div arkMenuTriggerItem>Export</div>
              <ark-portal [originInjector]="exportMenu.getContextCarrier().elementInjector">
                <div arkMenuPositioner>
                  <div arkMenuContent>
                    <div arkMenuItem value="pdf">PDF</div>
                    <div arkMenuItem value="png">PNG</div>
                    <div arkMenuItem value="svg">SVG</div>
                  </div>
                </div>
              </ark-portal>
            </div>
            <div arkMenu #shareSecond="arkMenu">
              <div arkMenuTriggerItem>Share</div>
              <ark-portal [originInjector]="shareSecond.getContextCarrier().elementInjector">
                <div arkMenuPositioner>
                  <div arkMenuContent>
                    <div arkMenuItem value="email">Email</div>
                    <div arkMenuItem value="message">Message</div>
                    <div arkMenuItem value="airdrop">AirDrop</div>
                    <div arkMenuItem value="test1">Test1</div>
                    <div arkMenuItem value="test2">Test2</div>
                    <div arkMenuItem value="test3">Test3</div>
                    <div arkMenuItem value="test4">Test4</div>
                  </div>
                </div>
              </ark-portal>
            </div>
            <div arkMenu #shareThird="arkMenu">
              <div arkMenuTriggerItem>Share</div>
              <ark-portal [originInjector]="shareThird.getContextCarrier().elementInjector">
                <div arkMenuPositioner>
                  <div arkMenuContent>
                    <div arkMenuItem value="email">Email</div>
                    <div arkMenuItem value="message">Message</div>
                    <div arkMenuItem value="airdrop">AirDrop</div>
                    <div arkMenuItem value="test1">Test1</div>
                    <div arkMenuItem value="test2">Test2</div>
                    <div arkMenuItem value="test3">Test3</div>
                    <div arkMenuItem value="test4">Test4</div>
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
export class MenuNestedExample {}
