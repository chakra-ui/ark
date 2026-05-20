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
import {
  FloatingPanelArrowDownLeftIcon,
  FloatingPanelGripVerticalIcon,
  FloatingPanelMaximizeIcon,
  FloatingPanelMinusIcon,
  FloatingPanelXIcon,
} from './icons'

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
    FloatingPanelArrowDownLeftIcon,
    FloatingPanelGripVerticalIcon,
    FloatingPanelMaximizeIcon,
    FloatingPanelMinusIcon,
    FloatingPanelXIcon,
  ],
  template: `
    <div arkFloatingPanelPositioner>
      <div arkFloatingPanelContent>
        <div arkFloatingPanelDragTrigger>
          <div arkFloatingPanelHeader>
            <h2 arkFloatingPanelTitle>
              <floating-panel-grip-vertical-icon />
              Floating Panel
            </h2>
            <div arkFloatingPanelControl>
              <button type="button" arkFloatingPanelStageTrigger stage="minimized" aria-label="Minimize">
                <floating-panel-minus-icon />
              </button>
              <button type="button" arkFloatingPanelStageTrigger stage="maximized" aria-label="Maximize">
                <floating-panel-maximize-icon />
              </button>
              <button type="button" arkFloatingPanelStageTrigger stage="default" aria-label="Restore">
                <floating-panel-arrow-down-left-icon />
              </button>
              <button type="button" arkFloatingPanelCloseTrigger aria-label="Close">
                <floating-panel-x-icon />
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
