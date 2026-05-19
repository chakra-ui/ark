import { ChangeDetectionStrategy, Component } from '@angular/core'
import { ArkPortalComponent } from '@ark-ui/angular/portal'
import {
  ArkFloatingPanelBody,
  ArkFloatingPanelCloseTrigger,
  ArkFloatingPanelContent,
  ArkFloatingPanelControl,
  ArkFloatingPanelDragTrigger,
  ArkFloatingPanelHeader,
  ArkFloatingPanelPositioner,
  ArkFloatingPanelResizeTrigger,
  ArkFloatingPanelRoot,
  ArkFloatingPanelStageTrigger,
  ArkFloatingPanelTitle,
  ArkFloatingPanelTrigger,
} from '../public-api'
import { floatingPanelExampleStyles } from '../floating-panel-example-styles'

@Component({
  selector: 'floating-panel-basic-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ArkFloatingPanelRoot,
    ArkFloatingPanelTrigger,
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
    ArkPortalComponent,
  ],
  template: `
    <div arkFloatingPanel #root="arkFloatingPanel">
      <button type="button" arkFloatingPanelTrigger>Toggle Panel</button>
      <ark-portal [originInjector]="root.getContextCarrier().elementInjector">
        <div arkFloatingPanelPositioner>
          <div arkFloatingPanelContent>
            <div arkFloatingPanelDragTrigger>
              <div arkFloatingPanelHeader>
                <h2 arkFloatingPanelTitle>Floating Panel</h2>
                <div arkFloatingPanelControl>
                  <button type="button" arkFloatingPanelStageTrigger stage="minimized">-</button>
                  <button type="button" arkFloatingPanelStageTrigger stage="maximized">+</button>
                  <button type="button" arkFloatingPanelStageTrigger stage="default">=</button>
                  <button type="button" arkFloatingPanelCloseTrigger>x</button>
                </div>
              </div>
            </div>
            <div arkFloatingPanelBody>
              <p>Some content</p>
            </div>

            @for (axis of axes; track axis) {
              <div arkFloatingPanelResizeTrigger [axis]="axis"></div>
            }
          </div>
        </div>
      </ark-portal>
    </div>
  `,
  styles: [floatingPanelExampleStyles],
})
export class FloatingPanelBasicExample {
  readonly axes = ['n', 'e', 's', 'w', 'ne', 'se', 'sw', 'nw'] as const
}
