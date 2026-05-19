import { ChangeDetectionStrategy, Component, signal } from '@angular/core'
import { ArkPortalComponent } from '@ark-ui/angular/portal'
import { ArkFloatingPanelRoot, ArkFloatingPanelTrigger, type FloatingPanelSize } from '../public-api'
import { floatingPanelExampleStyles } from '../floating-panel-example-styles'
import { FloatingPanelDemoPanel } from './panel'

@Component({
  selector: 'floating-panel-controlled-size-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ArkFloatingPanelRoot, ArkFloatingPanelTrigger, ArkPortalComponent, FloatingPanelDemoPanel],
  template: `
    <div arkFloatingPanel #root="arkFloatingPanel" [(size)]="size">
      <button type="button" arkFloatingPanelTrigger>Toggle Panel</button>
      <ark-portal [originInjector]="root.getContextCarrier().elementInjector">
        <floating-panel-demo-panel>
          <p>Size: {{ size()?.width }} x {{ size()?.height }}</p>
        </floating-panel-demo-panel>
      </ark-portal>
    </div>
  `,
  styles: [floatingPanelExampleStyles],
})
export class FloatingPanelControlledSizeExample {
  readonly size = signal<FloatingPanelSize | undefined>({ width: 400, height: 300 })
}
