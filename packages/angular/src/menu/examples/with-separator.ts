import { ChangeDetectionStrategy, Component } from '@angular/core'
import {
  ArkMenuContent,
  ArkMenuItem,
  ArkMenuPositioner,
  ArkMenuRoot,
  ArkMenuSeparator,
  ArkMenuTrigger,
} from '@ark-ui/angular/menu'
import { ArkPortalComponent } from '@ark-ui/angular/portal'
import { menuExampleStyles } from '../menu-example-styles'

@Component({
  selector: 'menu-with-separator-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ArkMenuRoot,
    ArkMenuTrigger,
    ArkMenuPositioner,
    ArkMenuContent,
    ArkMenuItem,
    ArkMenuSeparator,
    ArkPortalComponent,
  ],
  template: `
    <div arkMenu #root="arkMenu">
      <button type="button" arkMenuTrigger>Account</button>
      <ark-portal [originInjector]="root.getContextCarrier().elementInjector">
        <div arkMenuPositioner>
          <div arkMenuContent>
            <div arkMenuItem value="profile">Profile</div>
            <div arkMenuItem value="settings">Settings</div>
            <div arkMenuSeparator></div>
            <div arkMenuItem value="logout">Log Out</div>
          </div>
        </div>
      </ark-portal>
    </div>
  `,
  styles: [menuExampleStyles],
})
export class MenuWithSeparatorExample {}
