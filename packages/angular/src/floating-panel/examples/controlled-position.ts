import { ChangeDetectionStrategy, Component, signal } from '@angular/core'
import { ArkPortalComponent } from '@ark-ui/angular/portal'
import {
  ArkFloatingPanelBody,
  ArkFloatingPanelContent,
  ArkFloatingPanelDragTrigger,
  ArkFloatingPanelHeader,
  ArkFloatingPanelPositioner,
  ArkFloatingPanelRoot,
  ArkFloatingPanelTitle,
  ArkFloatingPanelTrigger,
  type FloatingPanelPoint,
} from '../public-api'
import { floatingPanelExampleStyles } from '../floating-panel-example-styles'

@Component({
  selector: 'floating-panel-controlled-position-example',
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
    ArkFloatingPanelBody,
    ArkPortalComponent,
  ],
  template: `
    <div arkFloatingPanel #root="arkFloatingPanel" [(position)]="position">
      <button type="button" arkFloatingPanelTrigger>Toggle Panel</button>
      <ark-portal [originInjector]="root.getContextCarrier().elementInjector">
        <div arkFloatingPanelPositioner>
          <div arkFloatingPanelContent>
            <div arkFloatingPanelDragTrigger>
              <div arkFloatingPanelHeader>
                <h2 arkFloatingPanelTitle>Floating Panel</h2>
              </div>
            </div>
            <div arkFloatingPanelBody>Position: {{ position()?.x }}, {{ position()?.y }}</div>
          </div>
        </div>
      </ark-portal>
    </div>
  `,
  styles: [floatingPanelExampleStyles],
})
export class FloatingPanelControlledPositionExample {
  readonly position = signal<FloatingPanelPoint | undefined>({ x: 200, y: 200 })
}
