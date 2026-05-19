import { ChangeDetectionStrategy, Component, Injector, computed, inject, runInInjectionContext } from '@angular/core'
import { ArkPortalComponent } from '@ark-ui/angular/portal'
import {
  ArkFloatingPanelRootProvider,
  ArkFloatingPanelTrigger,
  type UseFloatingPanelReturn,
  useFloatingPanel,
} from '../public-api'
import { floatingPanelExampleStyles } from '../floating-panel-example-styles'
import { FloatingPanelDemoPanel } from './panel'

@Component({
  selector: 'floating-panel-root-provider-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ArkFloatingPanelRootProvider, ArkFloatingPanelTrigger, ArkPortalComponent, FloatingPanelDemoPanel],
  template: `
    <div class="stack">
      <p>Open: {{ openLabel() }}</p>
      <div arkFloatingPanelRootProvider #provider="arkFloatingPanelRootProvider" [value]="floatingPanel">
        <button type="button" arkFloatingPanelTrigger>Toggle Panel</button>
        <ark-portal [originInjector]="provider.getContextCarrier().elementInjector">
          <floating-panel-demo-panel>
            <p>Some content</p>
          </floating-panel-demo-panel>
        </ark-portal>
      </div>
    </div>
  `,
  styles: [floatingPanelExampleStyles],
})
export class FloatingPanelRootProviderExample {
  readonly floatingPanel: UseFloatingPanelReturn = runInInjectionContext(inject(Injector), () =>
    useFloatingPanel({ context: () => ({}) }),
  )
  readonly openLabel = computed(() => (this.floatingPanel.api().open ? 'yes' : 'no'))
}
