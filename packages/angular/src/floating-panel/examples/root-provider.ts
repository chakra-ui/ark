import { ChangeDetectionStrategy, Component, Injector, computed, inject, runInInjectionContext } from '@angular/core'
import { ArkPortalComponent } from '@ark-ui/angular/portal'
import {
  ArkFloatingPanelBody,
  ArkFloatingPanelCloseTrigger,
  ArkFloatingPanelContent,
  ArkFloatingPanelHeader,
  ArkFloatingPanelPositioner,
  ArkFloatingPanelRootProvider,
  ArkFloatingPanelTitle,
  ArkFloatingPanelTrigger,
  type UseFloatingPanelReturn,
  useFloatingPanel,
} from '../public-api'
import { floatingPanelExampleStyles } from '../floating-panel-example-styles'

@Component({
  selector: 'floating-panel-root-provider-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ArkFloatingPanelRootProvider,
    ArkFloatingPanelTrigger,
    ArkFloatingPanelPositioner,
    ArkFloatingPanelContent,
    ArkFloatingPanelHeader,
    ArkFloatingPanelTitle,
    ArkFloatingPanelCloseTrigger,
    ArkFloatingPanelBody,
    ArkPortalComponent,
  ],
  template: `
    <div class="stack">
      <p>Open: {{ openLabel() }}</p>
      <div arkFloatingPanelRootProvider #provider="arkFloatingPanelRootProvider" [value]="floatingPanel">
        <button type="button" arkFloatingPanelTrigger>Toggle Panel</button>
        <ark-portal [originInjector]="provider.getContextCarrier().elementInjector">
          <div arkFloatingPanelPositioner>
            <div arkFloatingPanelContent>
              <div arkFloatingPanelHeader>
                <h2 arkFloatingPanelTitle>Floating Panel</h2>
                <button type="button" arkFloatingPanelCloseTrigger>x</button>
              </div>
              <div arkFloatingPanelBody>Some content</div>
            </div>
          </div>
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
