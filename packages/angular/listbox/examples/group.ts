import { ChangeDetectionStrategy, Component } from '@angular/core'
import { createListCollection, type ListCollection } from '@ark-ui/angular/collection'
import {
  ArkListboxContent,
  ArkListboxItem,
  ArkListboxItemGroup,
  ArkListboxItemGroupLabel,
  ArkListboxItemIndicator,
  ArkListboxItemText,
  ArkListboxLabel,
  ArkListboxRoot,
} from '@ark-ui/angular/listbox'
import { ListboxCheckIcon } from './icons'
import { listboxExampleStyles } from '../listbox-example-styles'

interface City {
  label: string
  value: string
  region: string
}

@Component({
  selector: 'listbox-group-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ArkListboxRoot,
    ArkListboxLabel,
    ArkListboxContent,
    ArkListboxItemGroup,
    ArkListboxItemGroupLabel,
    ArkListboxItem,
    ArkListboxItemText,
    ArkListboxItemIndicator,
    ListboxCheckIcon,
  ],
  template: `
    <div arkListboxRoot [collection]="collection">
      <span arkListboxLabel>Select Region</span>
      <div arkListboxContent>
        @for (group of collection.group(); track group[0]) {
          <div arkListboxItemGroup>
            <div arkListboxItemGroupLabel>{{ group[0] }}</div>
            @for (item of group[1]; track item.value) {
              <div arkListboxItem [item]="item">
                <span arkListboxItemText>{{ item.label }}</span>
                <span arkListboxItemIndicator><listbox-check-icon /></span>
              </div>
            }
          </div>
        }
      </div>
    </div>
  `,
  styles: [listboxExampleStyles],
})
export class ListboxGroupExample {
  readonly collection: ListCollection<City> = createListCollection<City>({
    items: [
      { label: 'New York', value: 'nyc', region: 'North America' },
      { label: 'Los Angeles', value: 'lax', region: 'North America' },
      { label: 'Toronto', value: 'yyz', region: 'North America' },
      { label: 'London', value: 'lhr', region: 'Europe' },
      { label: 'Paris', value: 'cdg', region: 'Europe' },
      { label: 'Berlin', value: 'ber', region: 'Europe' },
      { label: 'Tokyo', value: 'nrt', region: 'Asia Pacific' },
      { label: 'Singapore', value: 'sin', region: 'Asia Pacific' },
      { label: 'Sydney', value: 'syd', region: 'Asia Pacific' },
    ],
    groupBy: (item) => item.region,
  })
}
