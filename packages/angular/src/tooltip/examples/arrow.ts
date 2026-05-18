import { ChangeDetectionStrategy, Component } from '@angular/core'
import {
  ArkTooltipArrow,
  ArkTooltipArrowTip,
  ArkTooltipContent,
  ArkTooltipPositioner,
  ArkTooltipRoot,
  ArkTooltipTrigger,
} from '@ark-ui/angular/tooltip'
import { ArkPortalComponent } from '@ark-ui/angular/portal'
import { tooltipExampleStyles } from '../tooltip-example-styles'

@Component({
  selector: 'tooltip-arrow-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ArkTooltipRoot,
    ArkTooltipTrigger,
    ArkTooltipPositioner,
    ArkTooltipContent,
    ArkTooltipArrow,
    ArkTooltipArrowTip,
    ArkPortalComponent,
  ],
  template: `
    <div arkTooltip #root="arkTooltip">
      <button type="button" arkTooltipTrigger>Hover Me</button>
      <ark-portal [originInjector]="root.getContextCarrier().elementInjector">
        <div arkTooltipPositioner>
          <div arkTooltipContent>
            <div arkTooltipArrow>
              <div arkTooltipArrowTip></div>
            </div>
            I am a tooltip!
          </div>
        </div>
      </ark-portal>
    </div>
  `,
  styles: [tooltipExampleStyles],
})
export class TooltipArrowExample {}
