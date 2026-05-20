import { ChangeDetectionStrategy, Component, Injector, computed, inject, runInInjectionContext } from '@angular/core'
import {
  ArkDrawerBackdrop,
  ArkDrawerCloseTrigger,
  ArkDrawerContent,
  ArkDrawerGrabber,
  ArkDrawerGrabberIndicator,
  ArkDrawerPositioner,
  ArkDrawerRootProvider,
  ArkDrawerTitle,
  useDrawer,
  type UseDrawerReturn,
} from '@ark-ui/angular/drawer'
import { ArkPortalComponent } from '@ark-ui/angular/portal'
import { drawerExampleStyles } from '../drawer-example-styles'
import { DrawerXIcon } from './icons'

@Component({
  selector: 'drawer-root-provider-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ArkDrawerRootProvider,
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
    <div class="stack">
      <div class="hstack">
        <button type="button" class="button" (click)="drawer.api().setOpen(true)">Open via API</button>
        <button type="button" class="button" (click)="drawer.api().setSnapPoint(0.25)">Set to 25%</button>
        <button type="button" class="button" (click)="drawer.api().setSnapPoint(1)">Set to 100%</button>
      </div>
      <div arkDrawerRootProvider [value]="drawer" #provider="arkDrawerRootProvider">
        <ark-portal [originInjector]="provider.getContextCarrier().elementInjector">
          <div arkDrawerBackdrop></div>
          <div arkDrawerPositioner>
            <div arkDrawerContent>
              <div arkDrawerGrabber>
                <span arkDrawerGrabberIndicator></span>
              </div>
              <h2 arkDrawerTitle>Drawer with RootProvider</h2>
              <p>This drawer is controlled via the useDrawer hook and RootProvider.</p>
              <p>Active snap point: {{ drawer.api().snapPoint }}</p>
              <button type="button" arkDrawerCloseTrigger aria-label="Close">
                <drawer-x-icon />
              </button>
            </div>
          </div>
        </ark-portal>
      </div>
    </div>
  `,
  styles: [drawerExampleStyles],
})
export class DrawerRootProviderExample {
  readonly drawer: UseDrawerReturn = runInInjectionContext(inject(Injector), () =>
    useDrawer({ context: () => ({ defaultSnapPoint: 0.5, snapPoints: [0.25, 0.5, 1] }) }),
  )
  readonly openLabel = computed(() => (this.drawer.api().open ? 'open' : 'closed'))
}
