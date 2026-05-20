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

interface Framework {
  label: string
  value: string
}

@Component({
  selector: 'listbox-extended-select-example',
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
    <div arkListboxRoot [collection]="collection" selectionMode="extended">
      <span arkListboxLabel>
        Hold
        <kbd>⌘</kbd>
        or
        <kbd>Ctrl</kbd>
        to select multiple
      </span>
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
export class ListboxExtendedSelectExample {
  readonly collection: ListCollection<Framework> = createListCollection<Framework>({
    items: [
      { label: 'React', value: 'react' },
      { label: 'Vue', value: 'vue' },
      { label: 'Angular', value: 'angular' },
      { label: 'Svelte', value: 'svelte' },
      { label: 'Solid', value: 'solid' },
      { label: 'Preact', value: 'preact' },
    ],
  })
}
