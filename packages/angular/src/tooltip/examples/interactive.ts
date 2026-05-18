import { ChangeDetectionStrategy, Component } from '@angular/core'
import { ArkTooltipContent, ArkTooltipPositioner, ArkTooltipRoot, ArkTooltipTrigger } from '@ark-ui/angular/tooltip'
import { ArkPortalComponent } from '@ark-ui/angular/portal'
import { tooltipExampleStyles } from '../tooltip-example-styles'

@Component({
  selector: 'tooltip-interactive-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ArkTooltipRoot, ArkTooltipTrigger, ArkTooltipPositioner, ArkTooltipContent, ArkPortalComponent],
  template: `
    <div arkTooltip [interactive]="true" #root="arkTooltip">
      <button type="button" arkTooltipTrigger>Hover Me</button>
      <ark-portal [originInjector]="root.getContextCarrier().elementInjector">
        <div arkTooltipPositioner>
          <div arkTooltipContent>
            <a href="https://ark-ui.com">Read the docs</a>
          </div>
        </div>
      </ark-portal>
    </div>
  `,
  styles: [tooltipExampleStyles],
})
export class TooltipInteractiveExample {}
