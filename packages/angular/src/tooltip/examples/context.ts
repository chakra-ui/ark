import { ChangeDetectionStrategy, Component } from '@angular/core'
import { ArkTooltipContent, ArkTooltipPositioner, ArkTooltipRoot, ArkTooltipTrigger } from '@ark-ui/angular/tooltip'
import { ArkPortalComponent } from '@ark-ui/angular/portal'
import { tooltipExampleStyles } from '../tooltip-example-styles'

@Component({
  selector: 'tooltip-context-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ArkTooltipRoot, ArkTooltipTrigger, ArkTooltipPositioner, ArkTooltipContent, ArkPortalComponent],
  template: `
    <div arkTooltip #root="arkTooltip">
      <button type="button" arkTooltipTrigger>Hover Me</button>
      <ark-portal [originInjector]="root.getContextCarrier().elementInjector">
        <div arkTooltipPositioner>
          <div arkTooltipContent>This tooltip is open: {{ root.api().open }}</div>
        </div>
      </ark-portal>
    </div>
  `,
  styles: [tooltipExampleStyles],
})
export class TooltipContextExample {}
