import { ChangeDetectionStrategy, Component } from '@angular/core'
import {
  ArkDrawerBackdrop,
  ArkDrawerCloseTrigger,
  ArkDrawerContent,
  ArkDrawerPositioner,
  ArkDrawerRoot,
  ArkDrawerTitle,
  ArkDrawerTrigger,
} from '@ark-ui/angular/drawer'
import { ArkPortalComponent } from '@ark-ui/angular/portal'
import { drawerExampleStyles } from '../drawer-example-styles'
import { DrawerXIcon } from './icons'

@Component({
  selector: 'drawer-swipe-direction-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ArkDrawerRoot,
    ArkDrawerTrigger,
    ArkDrawerBackdrop,
    ArkDrawerPositioner,
    ArkDrawerContent,
    ArkDrawerTitle,
    ArkDrawerCloseTrigger,
    ArkPortalComponent,
    DrawerXIcon,
  ],
  template: `
    <div arkDrawer swipeDirection="end" #root="arkDrawer">
      <button type="button" arkDrawerTrigger>Open Right</button>
      <ark-portal [originInjector]="root.getContextCarrier().elementInjector">
        <div arkDrawerBackdrop></div>
        <div arkDrawerPositioner>
          <div arkDrawerContent>
            <h2 arkDrawerTitle>Right Drawer</h2>
            <p>This drawer slides in from the right side.</p>
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
export class DrawerSwipeDirectionExample {}
