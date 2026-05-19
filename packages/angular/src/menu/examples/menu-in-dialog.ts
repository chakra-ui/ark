import { ChangeDetectionStrategy, Component } from '@angular/core'
import {
  ArkDialogBackdrop,
  ArkDialogCloseTrigger,
  ArkDialogContent,
  ArkDialogDescription,
  ArkDialogPositioner,
  ArkDialogRoot,
  ArkDialogTitle,
  ArkDialogTrigger,
} from '@ark-ui/angular/dialog'
import {
  ArkMenuArrow,
  ArkMenuArrowTip,
  ArkMenuContent,
  ArkMenuIndicator,
  ArkMenuItem,
  ArkMenuPositioner,
  ArkMenuRoot,
  ArkMenuTrigger,
} from '@ark-ui/angular/menu'
import { ArkPortalComponent } from '@ark-ui/angular/portal'
import { ArkPresenceComponent } from '@ark-ui/angular/presence'
import { menuExampleStyles } from '../menu-example-styles'
import { MenuChevronDownIcon } from './icons'

@Component({
  selector: 'menu-in-dialog-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ArkDialogRoot,
    ArkDialogTrigger,
    ArkDialogBackdrop,
    ArkDialogPositioner,
    ArkDialogContent,
    ArkDialogTitle,
    ArkDialogDescription,
    ArkDialogCloseTrigger,
    ArkMenuRoot,
    ArkMenuTrigger,
    ArkMenuIndicator,
    ArkMenuPositioner,
    ArkMenuContent,
    ArkMenuArrow,
    ArkMenuArrowTip,
    ArkMenuItem,
    ArkPortalComponent,
    ArkPresenceComponent,
    MenuChevronDownIcon,
  ],
  template: `
    <div arkDialog #dialog="arkDialog">
      <button type="button" arkDialogTrigger>Open Dialog</button>
      <ark-portal [originInjector]="dialog.getContextCarrier().elementInjector">
        <div arkDialogBackdrop></div>
        <div arkDialogPositioner>
          <div arkDialogContent>
            <h2 arkDialogTitle>Settings</h2>
            <p arkDialogDescription>Configure your preferences below.</p>
            <button type="button" arkDialogCloseTrigger aria-label="Close">x</button>
            <div arkMenu #menu="arkMenu">
              <button type="button" arkMenuTrigger>
                Select theme
                <span arkMenuIndicator>
                  <menu-chevron-down-icon />
                </span>
              </button>
              <ark-presence
                [present]="menu.api().open"
                lazyMount
                unmountOnExit
                [originInjector]="menu.getContextCarrier().elementInjector"
              >
                <ng-template>
                  <ark-portal [originInjector]="menu.getContextCarrier().elementInjector">
                    <div arkMenuPositioner>
                      <div arkMenuContent>
                        <div arkMenuArrow>
                          <div arkMenuArrowTip></div>
                        </div>
                        <div arkMenuItem value="light">Light</div>
                        <div arkMenuItem value="dark">Dark</div>
                        <div arkMenuItem value="system">System</div>
                      </div>
                    </div>
                  </ark-portal>
                </ng-template>
              </ark-presence>
            </div>
          </div>
        </div>
      </ark-portal>
    </div>
  `,
  styles: [menuExampleStyles],
})
export class MenuInDialogExample {}
