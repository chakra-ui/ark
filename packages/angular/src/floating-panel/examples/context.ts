import { ChangeDetectionStrategy, Component } from '@angular/core'
import { ArkPortalComponent } from '@ark-ui/angular/portal'
import {
  ArkFloatingPanelBody,
  ArkFloatingPanelContent,
  ArkFloatingPanelContext,
  ArkFloatingPanelHeader,
  ArkFloatingPanelPositioner,
  ArkFloatingPanelRoot,
  ArkFloatingPanelTitle,
  ArkFloatingPanelTrigger,
} from '../public-api'
import { floatingPanelExampleStyles } from '../floating-panel-example-styles'

@Component({
  selector: 'floating-panel-context-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ArkFloatingPanelRoot,
    ArkFloatingPanelTrigger,
    ArkFloatingPanelContext,
    ArkFloatingPanelPositioner,
    ArkFloatingPanelContent,
    ArkFloatingPanelHeader,
    ArkFloatingPanelTitle,
    ArkFloatingPanelBody,
    ArkPortalComponent,
  ],
  template: `
    <div arkFloatingPanel #root="arkFloatingPanel">
      <button type="button" arkFloatingPanelTrigger>Toggle Panel</button>
      <ng-container *arkFloatingPanelContext="let floatingPanel">
        <p>Floating panel is {{ floatingPanel().open ? 'open' : 'closed' }}</p>
      </ng-container>
      <ark-portal [originInjector]="root.getContextCarrier().elementInjector">
        <div arkFloatingPanelPositioner>
          <div arkFloatingPanelContent>
            <div arkFloatingPanelHeader>
              <h2 arkFloatingPanelTitle>Floating Panel</h2>
            </div>
            <div arkFloatingPanelBody>Some content</div>
          </div>
        </div>
      </ark-portal>
    </div>
  `,
  styles: [floatingPanelExampleStyles],
})
export class FloatingPanelContextExample {}
