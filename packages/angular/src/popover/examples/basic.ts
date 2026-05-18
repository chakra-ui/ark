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
  selector: 'popover-basic-example',
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
    <div arkPopover #root="arkPopover">
      <button type="button" arkPopoverTrigger>Click Me</button>
      <ark-portal [originInjector]="root.getContextCarrier().elementInjector">
        <div arkPopoverPositioner>
          <div arkPopoverContent>
            <h2 arkPopoverTitle>Favorite Frameworks</h2>
            <p arkPopoverDescription>Manage and organize your favorite web frameworks.</p>
          </div>
        </div>
      </ark-portal>
    </div>
  `,
  styles: [popoverExampleStyles],
})
export class PopoverBasicExample {}
