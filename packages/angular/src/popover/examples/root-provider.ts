import { ChangeDetectionStrategy, Component, Injector, computed, inject, runInInjectionContext } from '@angular/core'
import {
  ArkPopoverCloseTrigger,
  ArkPopoverContent,
  ArkPopoverDescription,
  ArkPopoverPositioner,
  ArkPopoverRootProvider,
  ArkPopoverTitle,
  ArkPopoverTrigger,
  usePopover,
  type UsePopoverReturn,
} from '@ark-ui/angular/popover'
import { ArkPortalComponent } from '@ark-ui/angular/portal'
import { popoverExampleStyles } from '../popover-example-styles'
import { PopoverXIcon } from './icons'

@Component({
  selector: 'popover-root-provider-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ArkPopoverRootProvider,
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
    <div class="stack">
      <div>Popover is {{ openLabel() }}</div>
      <div arkPopoverRootProvider [value]="popover" #provider="arkPopoverRootProvider">
        <button type="button" arkPopoverTrigger>Toggle Popover</button>
        <ark-portal [originInjector]="provider.getContextCarrier().elementInjector">
          <div arkPopoverPositioner>
            <div arkPopoverContent>
              <button type="button" arkPopoverCloseTrigger aria-label="Close">
                <popover-x-icon />
              </button>
              <h2 arkPopoverTitle>Controlled Externally</h2>
              <p arkPopoverDescription>This popover is controlled via the usePopover hook.</p>
            </div>
          </div>
        </ark-portal>
      </div>
    </div>
  `,
  styles: [popoverExampleStyles],
})
export class PopoverRootProviderExample {
  readonly popover: UsePopoverReturn = runInInjectionContext(inject(Injector), () =>
    usePopover({ context: () => ({}) }),
  )
  readonly openLabel = computed(() => (this.popover.api().open ? 'open' : 'closed'))
}
