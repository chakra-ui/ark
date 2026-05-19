import { ChangeDetectionStrategy, Component } from '@angular/core'
import {
  ArkFloatingPanelBody,
  ArkFloatingPanelCloseTrigger,
  ArkFloatingPanelContent,
  ArkFloatingPanelControl,
  ArkFloatingPanelDragTrigger,
  ArkFloatingPanelHeader,
  ArkFloatingPanelPositioner,
  ArkFloatingPanelResizeTrigger,
  ArkFloatingPanelStageTrigger,
  ArkFloatingPanelTitle,
} from '../public-api'

@Component({
  selector: 'floating-panel-demo-panel',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ArkFloatingPanelPositioner,
    ArkFloatingPanelContent,
    ArkFloatingPanelDragTrigger,
    ArkFloatingPanelHeader,
    ArkFloatingPanelTitle,
    ArkFloatingPanelControl,
    ArkFloatingPanelStageTrigger,
    ArkFloatingPanelCloseTrigger,
    ArkFloatingPanelBody,
    ArkFloatingPanelResizeTrigger,
  ],
  template: `
    <div arkFloatingPanelPositioner>
      <div arkFloatingPanelContent>
        <div arkFloatingPanelDragTrigger>
          <div arkFloatingPanelHeader>
            <h2 arkFloatingPanelTitle>
              <span aria-hidden="true">::</span>
              Floating Panel
            </h2>
            <div arkFloatingPanelControl>
              <button type="button" arkFloatingPanelStageTrigger stage="minimized" aria-label="Minimize">
                <span aria-hidden="true">-</span>
              </button>
              <button type="button" arkFloatingPanelStageTrigger stage="maximized" aria-label="Maximize">
                <span aria-hidden="true">+</span>
              </button>
              <button type="button" arkFloatingPanelStageTrigger stage="default" aria-label="Restore">
                <span aria-hidden="true">\\</span>
              </button>
              <button type="button" arkFloatingPanelCloseTrigger aria-label="Close">
                <span aria-hidden="true">x</span>
              </button>
            </div>
          </div>
        </div>
        <div arkFloatingPanelBody>
          <ng-content></ng-content>
        </div>

        @for (axis of axes; track axis) {
          <div arkFloatingPanelResizeTrigger [axis]="axis"></div>
        }
      </div>
    </div>
  `,
})
export class FloatingPanelDemoPanel {
  readonly axes = ['n', 'e', 'w', 's', 'ne', 'se', 'sw', 'nw'] as const
}
