import { ChangeDetectionStrategy, Component } from '@angular/core'
import { ArkPortalComponent } from '@ark-ui/angular/portal'
import {
  ArkFloatingPanelBody,
  ArkFloatingPanelContent,
  ArkFloatingPanelHeader,
  ArkFloatingPanelPositioner,
  ArkFloatingPanelRoot,
  ArkFloatingPanelTitle,
  ArkFloatingPanelTrigger,
  type FloatingPanelAnchorPositionDetails,
  type FloatingPanelPoint,
} from '../public-api'
import { floatingPanelExampleStyles } from '../floating-panel-example-styles'

@Component({
  selector: 'floating-panel-anchor-position-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ArkFloatingPanelRoot,
    ArkFloatingPanelTrigger,
    ArkFloatingPanelPositioner,
    ArkFloatingPanelContent,
    ArkFloatingPanelHeader,
    ArkFloatingPanelTitle,
    ArkFloatingPanelBody,
    ArkPortalComponent,
  ],
  template: `
    <div arkFloatingPanel #root="arkFloatingPanel" [getAnchorPosition]="getAnchorPosition">
      <button type="button" arkFloatingPanelTrigger>Toggle Panel</button>
      <ark-portal [originInjector]="root.getContextCarrier().elementInjector">
        <div arkFloatingPanelPositioner>
          <div arkFloatingPanelContent>
            <div arkFloatingPanelHeader>
              <h2 arkFloatingPanelTitle>Floating Panel</h2>
            </div>
            <div arkFloatingPanelBody>Anchored to the trigger center.</div>
          </div>
        </div>
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
