import { ChangeDetectionStrategy, Component } from '@angular/core'
import {
  ArkDrawerBackdrop,
  ArkDrawerCloseTrigger,
  ArkDrawerContent,
  ArkDrawerGrabber,
  ArkDrawerGrabberIndicator,
  ArkDrawerIndent,
  ArkDrawerIndentBackground,
  ArkDrawerPositioner,
  ArkDrawerRoot,
  ArkDrawerStack,
  ArkDrawerTitle,
  ArkDrawerTrigger,
} from '@ark-ui/angular/drawer'
import { ArkPortalComponent } from '@ark-ui/angular/portal'
import { drawerExampleStyles } from '../drawer-example-styles'
import { DrawerXIcon } from './icons'

@Component({
  selector: 'drawer-indent-background-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ArkDrawerStack,
    ArkDrawerIndentBackground,
    ArkDrawerIndent,
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
    <ark-drawer-stack>
      <div arkDrawerIndentBackground></div>
      <div arkDrawerIndent>
        <div arkDrawer #root="arkDrawer">
          <button type="button" arkDrawerTrigger>Open Drawer</button>
          <ark-portal [originInjector]="root.getContextCarrier().elementInjector">
            <div arkDrawerBackdrop></div>
            <div arkDrawerPositioner>
              <div arkDrawerContent>
                <div arkDrawerGrabber>
                  <span arkDrawerGrabberIndicator></span>
                </div>
                <h2 arkDrawerTitle>Stacked Drawer</h2>
                <p>This drawer uses indent background and indent effects when swiped.</p>
                <button type="button" arkDrawerCloseTrigger aria-label="Close">
                  <drawer-x-icon />
                </button>
              </div>
            </div>
          </ark-portal>
        </div>
      </div>
    </ark-drawer-stack>
  `,
  styles: [drawerExampleStyles],
})
export class DrawerIndentBackgroundExample {}
