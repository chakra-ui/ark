import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core'
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

interface Item {
  id: string
  label: string
  detail: string
}

const items: Item[] = [
  { id: 'share', label: 'Share', detail: 'Share this item with others via link or email.' },
  { id: 'export', label: 'Export', detail: 'Export this item as PDF, CSV, or JSON.' },
  { id: 'archive', label: 'Archive', detail: 'Move this item to the archive for later reference.' },
]

@Component({
  selector: 'popover-multiple-triggers-example',
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
    <div arkPopover [(triggerValue)]="triggerValue" #root="arkPopover">
      <div class="button-group">
        @for (item of items; track item.id) {
          <button type="button" arkPopoverTrigger [value]="item.id">{{ item.label }}</button>
        }
      </div>
      <ark-portal [originInjector]="root.getContextCarrier().elementInjector">
        <div arkPopoverPositioner>
          <div arkPopoverContent>
            <h2 arkPopoverTitle>{{ activeItem()?.label ?? 'Select an action' }}</h2>
            <p arkPopoverDescription>{{ activeItem()?.detail ?? 'Click a button above' }}</p>
          </div>
        </div>
      </ark-portal>
    </div>
  `,
  styles: [popoverExampleStyles],
})
export class PopoverMultipleTriggersExample {
  readonly items = items
  readonly triggerValue = signal<string | null | undefined>(undefined)
  readonly activeItem = computed(() => items.find((item) => item.id === this.triggerValue()) ?? null)
}
