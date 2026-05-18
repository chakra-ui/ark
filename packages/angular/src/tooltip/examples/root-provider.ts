import { ChangeDetectionStrategy, Component, Injector, computed, inject, runInInjectionContext } from '@angular/core'
import {
  ArkTooltipContent,
  ArkTooltipPositioner,
  ArkTooltipRootProvider,
  ArkTooltipTrigger,
  useTooltip,
  type UseTooltipReturn,
} from '@ark-ui/angular/tooltip'
import { ArkPortalComponent } from '@ark-ui/angular/portal'
import { tooltipExampleStyles } from '../tooltip-example-styles'

@Component({
  selector: 'tooltip-root-provider-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ArkTooltipRootProvider, ArkTooltipTrigger, ArkTooltipPositioner, ArkTooltipContent, ArkPortalComponent],
  template: `
    <div class="stack">
      <output>Open: {{ openLabel() }}</output>
      <div arkTooltipRootProvider [value]="tooltip" #provider="arkTooltipRootProvider">
        <button type="button" arkTooltipTrigger>Hover Me</button>
        <ark-portal [originInjector]="provider.getContextCarrier().elementInjector">
          <div arkTooltipPositioner>
            <div arkTooltipContent>I am a tooltip!</div>
          </div>
        </ark-portal>
      </div>
    </div>
  `,
  styles: [tooltipExampleStyles],
})
export class TooltipRootProviderExample {
  readonly tooltip: UseTooltipReturn = runInInjectionContext(inject(Injector), () =>
    useTooltip({ context: () => ({ openDelay: 0, closeDelay: 0 }) }),
  )
  readonly openLabel = computed(() => (this.tooltip.api().open ? 'open' : 'closed'))
}
