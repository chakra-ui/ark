import { ChangeDetectionStrategy, Component, signal } from '@angular/core'
import { createListCollection, type ListCollection } from '@ark-ui/angular/collection'
import {
  ArkListboxContent,
  ArkListboxItem,
  ArkListboxItemIndicator,
  ArkListboxItemText,
  ArkListboxLabel,
  ArkListboxRoot,
} from '@ark-ui/angular/listbox'
import { ListboxCheckIcon } from './icons'
import { listboxExampleStyles } from '../listbox-example-styles'

interface Size {
  label: string
  value: string
}

@Component({
  selector: 'listbox-controlled-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ArkListboxRoot,
    ArkListboxLabel,
    ArkListboxContent,
    ArkListboxItem,
    ArkListboxItemText,
    ArkListboxItemIndicator,
    ListboxCheckIcon,
  ],
  template: `
    <div arkListboxRoot [collection]="collection" [(value)]="value">
      <span arkListboxLabel>Select Size</span>
      <div arkListboxContent>
        @for (item of collection.items; track item.value) {
          <div arkListboxItem [item]="item">
            <span arkListboxItemText>{{ item.label }}</span>
            <span arkListboxItemIndicator><listbox-check-icon /></span>
          </div>
        }
      </div>
    </div>
  `,
  styles: [listboxExampleStyles],
})
export class ListboxControlledExample {
  readonly value = signal<string[] | undefined>(['md'])
  readonly collection: ListCollection<Size> = createListCollection<Size>({
    items: [
      { label: 'Small', value: 'sm' },
      { label: 'Medium', value: 'md' },
      { label: 'Large', value: 'lg' },
      { label: 'Extra Large', value: 'xl' },
    ],
  })
}
