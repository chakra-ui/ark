import { ChangeDetectionStrategy, Component } from '@angular/core'
import {
  ArkDrawerBackdrop,
  ArkDrawerCloseTrigger,
  ArkDrawerContent,
  ArkDrawerDescription,
  ArkDrawerPositioner,
  ArkDrawerRoot,
  ArkDrawerTitle,
  ArkDrawerTrigger,
} from '@ark-ui/angular/drawer'
import { ArkPortalComponent } from '@ark-ui/angular/portal'
import { drawerExampleStyles } from '../drawer-example-styles'
import { DrawerXIcon } from './icons'

@Component({
  selector: 'drawer-with-title-description-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ArkDrawerRoot,
    ArkDrawerTrigger,
    ArkDrawerBackdrop,
    ArkDrawerPositioner,
    ArkDrawerContent,
    ArkDrawerTitle,
    ArkDrawerDescription,
    ArkDrawerCloseTrigger,
    ArkPortalComponent,
    DrawerXIcon,
  ],
  template: `
    <div arkDrawer #root="arkDrawer">
      <button type="button" arkDrawerTrigger>Open</button>
      <ark-portal [originInjector]="root.getContextCarrier().elementInjector">
        <div arkDrawerBackdrop></div>
        <div arkDrawerPositioner>
          <div arkDrawerContent>
            <h2 arkDrawerTitle>Settings</h2>
            <p arkDrawerDescription>Manage your application preferences.</p>
            <button type="button" arkDrawerCloseTrigger aria-label="Close">
              <drawer-x-icon />
            </button>
          </div>
        </div>
      </ark-portal>
    </div>
  `,
  styles: [drawerExampleStyles],
})
export class DrawerWithTitleDescriptionExample {}
