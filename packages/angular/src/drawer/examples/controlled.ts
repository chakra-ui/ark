import { ChangeDetectionStrategy, Component, signal } from '@angular/core'
import {
  ArkDrawerBackdrop,
  ArkDrawerCloseTrigger,
  ArkDrawerContent,
  ArkDrawerGrabber,
  ArkDrawerGrabberIndicator,
  ArkDrawerPositioner,
  ArkDrawerRoot,
  ArkDrawerTitle,
} from '@ark-ui/angular/drawer'
import { ArkPortalComponent } from '@ark-ui/angular/portal'
import { drawerExampleStyles } from '../drawer-example-styles'
import { DrawerXIcon } from './icons'

@Component({
  selector: 'drawer-controlled-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ArkDrawerRoot,
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
    <button type="button" class="button" (click)="open.set(!open())">{{ open() ? 'Close' : 'Open' }} Drawer</button>
    <div arkDrawer #root="arkDrawer" [(open)]="open">
      <ark-portal [originInjector]="root.getContextCarrier().elementInjector">
        <div arkDrawerBackdrop></div>
        <div arkDrawerPositioner>
          <div arkDrawerContent>
            <div arkDrawerGrabber>
              <span arkDrawerGrabberIndicator></span>
            </div>
            <h2 arkDrawerTitle>Controlled Drawer</h2>
            <p>This drawer is controlled via state.</p>
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
export class DrawerControlledExample {
  readonly open = signal<boolean | undefined>(false)
}
