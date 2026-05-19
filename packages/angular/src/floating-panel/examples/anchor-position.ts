import { ChangeDetectionStrategy, Component } from '@angular/core'
import { ArkPortalComponent } from '@ark-ui/angular/portal'
import {
  ArkFloatingPanelRoot,
  ArkFloatingPanelTrigger,
  type FloatingPanelAnchorPositionDetails,
  type FloatingPanelPoint,
} from '../public-api'
import { floatingPanelExampleStyles } from '../floating-panel-example-styles'
import { FloatingPanelDemoPanel } from './panel'

@Component({
  selector: 'floating-panel-anchor-position-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ArkFloatingPanelRoot, ArkFloatingPanelTrigger, ArkPortalComponent, FloatingPanelDemoPanel],
  template: `
    <div arkFloatingPanel #root="arkFloatingPanel" [getAnchorPosition]="getAnchorPosition">
      <button type="button" arkFloatingPanelTrigger>Toggle Panel</button>
      <ark-portal [originInjector]="root.getContextCarrier().elementInjector">
        <floating-panel-demo-panel>
          <p>Anchored to the trigger center.</p>
        </floating-panel-demo-panel>
      </ark-portal>
    </div>
  `,
  styles: [floatingPanelExampleStyles],
})
export class FloatingPanelAnchorPositionExample {
  readonly getAnchorPosition = ({ triggerRect }: FloatingPanelAnchorPositionDetails): FloatingPanelPoint => {
    if (!triggerRect) return { x: 0, y: 0 }
    return { x: triggerRect.x + triggerRect.width / 2, y: triggerRect.y + triggerRect.height / 2 }
  }
}
