import { ChangeDetectionStrategy, Component } from '@angular/core'
import { ArkPortalComponent } from '@ark-ui/angular/portal'
import { ArkFloatingPanelContext, ArkFloatingPanelRoot, ArkFloatingPanelTrigger } from '../public-api'
import { floatingPanelExampleStyles } from '../floating-panel-example-styles'
import { FloatingPanelDemoPanel } from './panel'

@Component({
  selector: 'floating-panel-context-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ArkFloatingPanelRoot,
    ArkFloatingPanelTrigger,
    ArkFloatingPanelContext,
    ArkPortalComponent,
    FloatingPanelDemoPanel,
  ],
  template: `
    <div arkFloatingPanel #root="arkFloatingPanel">
      <button type="button" arkFloatingPanelTrigger>Toggle Panel</button>
      <ng-container *arkFloatingPanelContext="let floatingPanel">
        <p>floatingPanel is {{ floatingPanel().open ? 'open' : 'closed' }}</p>
      </ng-container>
      <ark-portal [originInjector]="root.getContextCarrier().elementInjector">
        <floating-panel-demo-panel>
          <p>Some content</p>
        </floating-panel-demo-panel>
      </ark-portal>
    </div>
  `,
  styles: [floatingPanelExampleStyles],
})
export class FloatingPanelContextExample {}
