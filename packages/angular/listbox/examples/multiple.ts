import { ChangeDetectionStrategy, Component } from '@angular/core'
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

interface Day {
  label: string
  value: string
}

@Component({
  selector: 'listbox-multiple-example',
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
    <div arkListboxRoot [collection]="collection" selectionMode="multiple">
      <span arkListboxLabel>Select Days</span>
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
export class ListboxMultipleExample {
  readonly collection: ListCollection<Day> = createListCollection<Day>({
    items: [
      { label: 'Monday', value: 'mon' },
      { label: 'Tuesday', value: 'tue' },
      { label: 'Wednesday', value: 'wed' },
      { label: 'Thursday', value: 'thu' },
      { label: 'Friday', value: 'fri' },
      { label: 'Saturday', value: 'sat' },
      { label: 'Sunday', value: 'sun' },
    ],
  })
}
