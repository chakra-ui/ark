import { ChangeDetectionStrategy, Component, signal } from '@angular/core'
import { ArkPortalComponent } from '@ark-ui/angular/portal'
import {
  ArkFloatingPanelBody,
  ArkFloatingPanelContent,
  ArkFloatingPanelHeader,
  ArkFloatingPanelPositioner,
  ArkFloatingPanelResizeTrigger,
  ArkFloatingPanelRoot,
  ArkFloatingPanelTitle,
  ArkFloatingPanelTrigger,
  type FloatingPanelSize,
} from '../public-api'
import { floatingPanelExampleStyles } from '../floating-panel-example-styles'

@Component({
  selector: 'floating-panel-controlled-size-example',
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
    ArkFloatingPanelResizeTrigger,
    ArkPortalComponent,
  ],
  template: `
    <div arkFloatingPanel #root="arkFloatingPanel" [(size)]="size">
      <button type="button" arkFloatingPanelTrigger>Toggle Panel</button>
      <ark-portal [originInjector]="root.getContextCarrier().elementInjector">
        <div arkFloatingPanelPositioner>
          <div arkFloatingPanelContent>
            <div arkFloatingPanelHeader>
              <h2 arkFloatingPanelTitle>Floating Panel</h2>
            </div>
            <div arkFloatingPanelBody>Size: {{ size()?.width }} x {{ size()?.height }}</div>
            <div arkFloatingPanelResizeTrigger axis="se"></div>
          </div>
        </div>
      </ark-portal>
    </div>
  `,
  styles: [floatingPanelExampleStyles],
})
export class FloatingPanelControlledSizeExample {
  readonly size = signal<FloatingPanelSize | undefined>({ width: 400, height: 300 })
}
