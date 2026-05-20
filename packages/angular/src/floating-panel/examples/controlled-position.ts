import { ChangeDetectionStrategy, Component, signal } from '@angular/core'
import { ArkPortalComponent } from '@ark-ui/angular/portal'
import { ArkFloatingPanelRoot, ArkFloatingPanelTrigger, type FloatingPanelPoint } from '../public-api'
import { floatingPanelExampleStyles } from '../floating-panel-example-styles'
import { FloatingPanelDemoPanel } from './panel'

@Component({
  selector: 'floating-panel-controlled-position-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ArkFloatingPanelRoot, ArkFloatingPanelTrigger, ArkPortalComponent, FloatingPanelDemoPanel],
  template: `
    <div arkFloatingPanel #root="arkFloatingPanel" [(position)]="position">
      <button type="button" arkFloatingPanelTrigger>Toggle Panel</button>
      <ark-portal [originInjector]="root.getContextCarrier().elementInjector">
        <floating-panel-demo-panel>
          <p>Some content</p>
        </floating-panel-demo-panel>
      </ark-portal>
    </div>
  `,
  styles: [floatingPanelExampleStyles],
})
export class FloatingPanelControlledPositionExample {
  readonly position = signal<FloatingPanelPoint | undefined>({ x: 200, y: 200 })
}
