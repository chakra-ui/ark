import { ChangeDetectionStrategy, Component } from '@angular/core'
import {
  ArkMenuContent,
  ArkMenuContextTrigger,
  ArkMenuItem,
  ArkMenuPositioner,
  ArkMenuRoot,
  ArkMenuSeparator,
  ArkMenuTriggerItem,
} from '@ark-ui/angular/menu'
import { ArkPortalComponent } from '@ark-ui/angular/portal'
import { ArkPresenceComponent } from '@ark-ui/angular/presence'
import { menuExampleStyles } from '../menu-example-styles'

@Component({
  selector: 'menu-context-lazy-mount-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ArkMenuRoot,
    ArkMenuContextTrigger,
    ArkMenuTriggerItem,
    ArkMenuPositioner,
    ArkMenuContent,
    ArkMenuItem,
    ArkMenuSeparator,
    ArkPortalComponent,
    ArkPresenceComponent,
  ],
  template: `
    <div arkMenu #root="arkMenu">
      <div arkMenuContextTrigger>Right click here</div>
      <ark-presence
        [present]="root.api().open"
        lazyMount
        unmountOnExit
        [originInjector]="root.getContextCarrier().elementInjector"
      >
        <ng-template>
          <ark-portal [originInjector]="root.getContextCarrier().elementInjector">
            <div arkMenuPositioner>
              <div arkMenuContent>
                <div arkMenuItem value="cut">Cut</div>
                <div arkMenuItem value="copy">Copy</div>
                <div arkMenuItem value="paste">Paste</div>
                <div arkMenuSeparator></div>
                <div arkMenu #share="arkMenu">
                  <div arkMenuTriggerItem>Share</div>
                  <ark-presence
                    [present]="share.api().open"
                    lazyMount
                    unmountOnExit
                    [originInjector]="share.getContextCarrier().elementInjector"
                  >
                    <ng-template>
                      <ark-portal [originInjector]="share.getContextCarrier().elementInjector">
                        <div arkMenuPositioner>
                          <div arkMenuContent>
                            <div arkMenuItem value="email">Email</div>
                            <div arkMenuItem value="message">Message</div>
                            <div arkMenuItem value="airdrop">AirDrop</div>
                          </div>
                        </div>
                      </ark-portal>
                    </ng-template>
                  </ark-presence>
                </div>
              </div>
            </div>
          </ark-portal>
        </ng-template>
      </ark-presence>
    </div>
  `,
  styles: [menuExampleStyles],
})
export class MenuContextLazyMountExample {}
