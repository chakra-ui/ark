import { ChangeDetectionStrategy, Component, signal } from '@angular/core'
import { ArkPortalComponent } from '@ark-ui/angular/portal'
import {
  ArkFloatingPanelBody,
  ArkFloatingPanelCloseTrigger,
  ArkFloatingPanelContent,
  ArkFloatingPanelHeader,
  ArkFloatingPanelPositioner,
  ArkFloatingPanelRoot,
  ArkFloatingPanelTitle,
  ArkFloatingPanelTrigger,
} from '../public-api'
import { floatingPanelExampleStyles } from '../floating-panel-example-styles'

@Component({
  selector: 'floating-panel-controlled-open-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ArkFloatingPanelRoot,
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
    <div arkFloatingPanel #root="arkFloatingPanel" [(open)]="open">
      <button type="button" arkFloatingPanelTrigger>Toggle Panel</button>
      <ark-portal [originInjector]="root.getContextCarrier().elementInjector">
        <div arkFloatingPanelPositioner>
          <div arkFloatingPanelContent>
            <div arkFloatingPanelHeader>
              <h2 arkFloatingPanelTitle>Floating Panel</h2>
              <button type="button" arkFloatingPanelCloseTrigger>x</button>
            </div>
            <div arkFloatingPanelBody>Open: {{ open() }}</div>
          </div>
        </div>
      </ark-portal>
    </div>
  `,
  styles: [floatingPanelExampleStyles],
})
export class FloatingPanelControlledOpenExample {
  readonly open = signal<boolean | undefined>(false)
}
