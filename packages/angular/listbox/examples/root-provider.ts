import { ChangeDetectionStrategy, Component } from '@angular/core'
import { createListCollection, type ListCollection } from '@ark-ui/angular/collection'
import {
  ArkListboxContent,
  ArkListboxItem,
  ArkListboxItemIndicator,
  ArkListboxItemText,
  ArkListboxLabel,
  ArkListboxRootProvider,
  useListbox,
} from '@ark-ui/angular/listbox'
import { listboxExampleStyles } from '../listbox-example-styles'

interface Priority {
  label: string
  value: string
}

@Component({
  selector: 'listbox-root-provider-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ArkListboxRootProvider,
    ArkListboxLabel,
    ArkListboxContent,
    ArkListboxItem,
    ArkListboxItemText,
    ArkListboxItemIndicator,
  ],
  template: `
    <div arkListboxRootProvider [value]="listbox">
      <span arkListboxLabel>Select Priority</span>
      <div arkListboxContent>
        @for (item of collection.items; track item.value) {
          <div arkListboxItem [item]="item">
            <span arkListboxItemText>{{ item.label }}</span>
            <span arkListboxItemIndicator>✓</span>
          </div>
        }
      </div>
    </div>
  `,
  styles: [listboxExampleStyles],
})
export class ListboxRootProviderExample {
  readonly collection: ListCollection<Priority> = createListCollection<Priority>({
    items: [
      { label: 'Low', value: 'low' },
      { label: 'Medium', value: 'medium' },
      { label: 'High', value: 'high' },
      { label: 'Critical', value: 'critical' },
    ],
  })
  readonly listbox = useListbox<Priority>({ context: () => ({ collection: this.collection }) })
}
