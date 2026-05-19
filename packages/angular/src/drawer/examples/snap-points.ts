import { ChangeDetectionStrategy, Component } from '@angular/core'
import {
  ArkDrawerBackdrop,
  ArkDrawerCloseTrigger,
  ArkDrawerContent,
  ArkDrawerGrabber,
  ArkDrawerGrabberIndicator,
  ArkDrawerPositioner,
  ArkDrawerRoot,
  ArkDrawerTitle,
  ArkDrawerTrigger,
} from '@ark-ui/angular/drawer'
import { ArkPortalComponent } from '@ark-ui/angular/portal'
import { drawerExampleStyles } from '../drawer-example-styles'
import { DrawerXIcon } from './icons'

@Component({
  selector: 'drawer-snap-points-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ArkDrawerRoot,
    ArkDrawerTrigger,
    ArkDrawerBackdrop,
    ArkDrawerPositioner,
    ArkDrawerContent,
    ArkDrawerGrabber,
    ArkDrawerGrabberIndicator,
    ArkDrawerTitle,
    ArkDrawerCloseTrigger,
    ArkPortalComponent,
    DrawerXIcon,
  ],
  template: `
    <div arkDrawer [snapPoints]="[0.25, 0.5, 1]" [defaultSnapPoint]="0.5" #root="arkDrawer">
      <button type="button" arkDrawerTrigger>Open</button>
      <ark-portal [originInjector]="root.getContextCarrier().elementInjector">
        <div arkDrawerBackdrop></div>
        <div arkDrawerPositioner>
          <div arkDrawerContent>
            <div arkDrawerGrabber>
              <span arkDrawerGrabberIndicator></span>
            </div>
            <h2 arkDrawerTitle>Drawer with Snap Points</h2>
            <p>This drawer has multiple snap points at 25%, 50%, and 100% of the viewport height.</p>
            <p>Drag the grabber to snap between different heights, or swipe to dismiss.</p>
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
export class DrawerSnapPointsExample {}
