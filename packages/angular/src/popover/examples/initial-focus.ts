import { ChangeDetectionStrategy, Component, type ElementRef, viewChild } from '@angular/core'
import {
  ArkPopoverCloseTrigger,
  ArkPopoverContent,
  ArkPopoverDescription,
  ArkPopoverPositioner,
  ArkPopoverRoot,
  ArkPopoverTitle,
  ArkPopoverTrigger,
} from '@ark-ui/angular/popover'
import { ArkPortalComponent } from '@ark-ui/angular/portal'
import { popoverExampleStyles } from '../popover-example-styles'
import { PopoverXIcon } from './icons'

@Component({
  selector: 'popover-initial-focus-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ArkPopoverRoot,
    ArkPopoverTrigger,
    ArkPopoverPositioner,
    ArkPopoverContent,
    ArkPopoverTitle,
    ArkPopoverDescription,
    ArkPopoverCloseTrigger,
    ArkPortalComponent,
    PopoverXIcon,
  ],
  template: `
    <div arkPopover [initialFocusEl]="initialFocusEl" #root="arkPopover">
      <button type="button" arkPopoverTrigger>Update Profile</button>
      <ark-portal [originInjector]="root.getContextCarrier().elementInjector">
        <div arkPopoverPositioner>
          <div arkPopoverContent>
            <button type="button" arkPopoverCloseTrigger aria-label="Close">
              <popover-x-icon />
            </button>
            <h2 arkPopoverTitle>Enter your name</h2>
            <p arkPopoverDescription>Make changes to your profile here.</p>
            <div class="body">
              <input #firstNameInput class="field" placeholder="First Name" value="John" />
              <input class="field" placeholder="Last Name" />
              <textarea class="field" placeholder="Add details"></textarea>
              <button type="button" data-variant="solid">Save</button>
            </div>
          </div>
        </div>
      </ark-portal>
    </div>
  `,
  styles: [popoverExampleStyles],
})
export class PopoverInitialFocusExample {
  private readonly firstNameInput = viewChild<ElementRef<HTMLInputElement>>('firstNameInput')
  readonly initialFocusEl = () => this.firstNameInput()?.nativeElement ?? null
}
