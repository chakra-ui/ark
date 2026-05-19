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
  selector: 'tooltip-within-fixed-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ArkTooltipRoot, ArkTooltipTrigger, ArkTooltipPositioner, ArkTooltipContent, ArkPortalComponent],
  template: `
    <div class="FixedContainer">
      <div arkTooltip [positioning]="positioning" #root="arkTooltip">
        <button type="button" arkTooltipTrigger>Hover Me</button>
        <ark-portal [originInjector]="root.getContextCarrier().elementInjector">
          <div arkTooltipPositioner>
            <div arkTooltipContent>I am a tooltip!</div>
          </div>
        </ark-portal>
      </div>
    </div>
  `,
  styles: [tooltipExampleStyles],
})
export class TooltipWithinFixedExample {
  readonly positioning: TooltipPositioningOptions = { strategy: 'fixed' }
}
