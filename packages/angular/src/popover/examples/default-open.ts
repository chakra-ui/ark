import { ChangeDetectionStrategy, Component } from '@angular/core'
import {
  ArkPopoverContent,
  ArkPopoverDescription,
  ArkPopoverPositioner,
  ArkPopoverRoot,
  ArkPopoverTitle,
  ArkPopoverTrigger,
} from '@ark-ui/angular/popover'
import { ArkPortalComponent } from '@ark-ui/angular/portal'
import { popoverExampleStyles } from '../popover-example-styles'

@Component({
  selector: 'popover-default-open-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ArkPopoverRoot,
    ArkPopoverTrigger,
    ArkPopoverPositioner,
    ArkPopoverContent,
    ArkPopoverTitle,
    ArkPopoverDescription,
    ArkPortalComponent,
  ],
  template: `
    <div arkPopover defaultOpen #root="arkPopover">
      <button type="button" arkPopoverTrigger>Click Me</button>
      <ark-portal [originInjector]="root.getContextCarrier().elementInjector">
        <div arkPopoverPositioner>
          <div arkPopoverContent>
            <h2 arkPopoverTitle>Welcome</h2>
            <p arkPopoverDescription>This popover starts open by default.</p>
          </div>
        </div>
      </ark-portal>
    </div>
  `,
  styles: [popoverExampleStyles],
})
export class PopoverDefaultOpenExample {}
