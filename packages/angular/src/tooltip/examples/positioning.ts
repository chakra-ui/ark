import { ChangeDetectionStrategy, Component } from '@angular/core'
import {
  ArkTooltipContent,
  ArkTooltipPositioner,
  ArkTooltipRoot,
  ArkTooltipTrigger,
  type TooltipPositioningOptions,
} from '@ark-ui/angular/tooltip'
import { ArkPortalComponent } from '@ark-ui/angular/portal'
import { tooltipExampleStyles } from '../tooltip-example-styles'

@Component({
  selector: 'tooltip-positioning-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ArkTooltipRoot, ArkTooltipTrigger, ArkTooltipPositioner, ArkTooltipContent, ArkPortalComponent],
  template: `
    <div arkTooltip [positioning]="positioning" #root="arkTooltip">
      <button type="button" arkTooltipTrigger>Hover Me</button>
      <ark-portal [originInjector]="root.getContextCarrier().elementInjector">
        <div arkTooltipPositioner>
          <div arkTooltipContent>I am a tooltip!</div>
        </div>
      </ark-portal>
    </div>
  `,
  styles: [tooltipExampleStyles],
})
export class TooltipPositioningExample {
  readonly positioning: TooltipPositioningOptions = {
    placement: 'left-start',
    offset: { mainAxis: 12, crossAxis: 12 },
  }
}
