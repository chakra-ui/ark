import { ChangeDetectionStrategy, Component } from '@angular/core'
import { ArkPortalComponent } from '@ark-ui/angular/portal'
import { ArkPresenceComponent } from '@ark-ui/angular/presence'
import { ArkFloatingPanelRoot, ArkFloatingPanelTrigger } from '../public-api'
import { floatingPanelExampleStyles } from '../floating-panel-example-styles'
import { FloatingPanelDemoPanel } from './panel'

@Component({
  selector: 'floating-panel-lazy-mount-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ArkFloatingPanelRoot,
    ArkFloatingPanelTrigger,
    ArkPortalComponent,
    ArkPresenceComponent,
    FloatingPanelDemoPanel,
  ],
  template: `
    <div arkFloatingPanel #root="arkFloatingPanel" (openChange)="onOpenChange()">
      <button type="button" arkFloatingPanelTrigger>Toggle Panel</button>
      <ark-presence
        [present]="root.api().open"
        lazyMount
        unmountOnExit
        [originInjector]="root.getContextCarrier().elementInjector"
        (exitComplete)="onExitComplete()"
      >
        <ng-template>
          <ark-portal [originInjector]="root.getContextCarrier().elementInjector">
            <floating-panel-demo-panel>
              <p>Some content</p>
            </floating-panel-demo-panel>
          </ark-portal>
        </ng-template>
      </ark-presence>
    </div>
  `,
  styles: [floatingPanelExampleStyles],
})
export class FloatingPanelLazyMountExample {
  onOpenChange(): void {}
  onExitComplete(): void {}
}
