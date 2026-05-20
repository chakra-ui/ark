import { ChangeDetectionStrategy, Component, signal } from '@angular/core'
import { ArkTooltipContent, ArkTooltipPositioner, ArkTooltipRoot, ArkTooltipTrigger } from '@ark-ui/angular/tooltip'
import { ArkPortalComponent } from '@ark-ui/angular/portal'
import { tooltipExampleStyles } from '../tooltip-example-styles'

@Component({
  selector: 'tooltip-controlled-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ArkTooltipRoot, ArkTooltipTrigger, ArkTooltipPositioner, ArkTooltipContent, ArkPortalComponent],
  template: `
    <div class="stack">
      <button type="button" class="Button" (click)="toggle()">Toggle</button>
      <div arkTooltip #root="arkTooltip" [(open)]="open">
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
export class TooltipControlledExample {
  readonly open = signal<boolean | undefined>(false)
  toggle() {
    this.open.set(!this.open())
  }
}
