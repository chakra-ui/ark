import { ChangeDetectionStrategy, Component, signal } from '@angular/core'
import { createListCollection, type ListCollection } from '@ark-ui/angular/collection'
import {
  ArkListboxContent,
  ArkListboxEmpty,
  ArkListboxInput,
  ArkListboxItem,
  ArkListboxItemIndicator,
  ArkListboxItemText,
  ArkListboxLabel,
  ArkListboxRoot,
} from '@ark-ui/angular/listbox'
import { listboxExampleStyles } from '../listbox-example-styles'

interface Framework {
  label: string
  value: string
}

const initialItems: Framework[] = [
  { label: 'React', value: 'react' },
  { label: 'Vue', value: 'vue' },
  { label: 'Angular', value: 'angular' },
  { label: 'Svelte', value: 'svelte' },
  { label: 'Solid', value: 'solid' },
  { label: 'Next.js', value: 'nextjs' },
  { label: 'Nuxt.js', value: 'nuxtjs' },
  { label: 'Remix', value: 'remix' },
  { label: 'Gatsby', value: 'gatsby' },
  { label: 'Preact', value: 'preact' },
]

@Component({
  selector: 'listbox-filtering-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ArkListboxRoot,
    ArkListboxLabel,
    ArkListboxInput,
    ArkListboxContent,
    ArkListboxEmpty,
    ArkListboxItem,
    ArkListboxItemText,
    ArkListboxItemIndicator,
  ],
  template: `
    <div arkListboxRoot [collection]="collection()">
      <span arkListboxLabel>Select Framework</span>
      <input arkListboxInput placeholder="Search frameworks..." (input)="filter($event)" />
      <div arkListboxContent>
        @for (item of collection().items; track item.value) {
          <div arkListboxItem [item]="item">
            <span arkListboxItemText>{{ item.label }}</span>
            <span arkListboxItemIndicator>✓</span>
          </div>
        }
        <div arkListboxEmpty>No frameworks found</div>
      </div>
    </div>
  `,
  styles: [listboxExampleStyles],
})
export class ListboxFilteringExample {
  readonly collection = signal<ListCollection<Framework>>(createListCollection<Framework>({ items: initialItems }))

  filter(event: Event): void {
    const query = (event.target as HTMLInputElement).value.toLowerCase()
    const items = initialItems.filter((item) => item.label.toLowerCase().includes(query))
    this.collection.set(createListCollection<Framework>({ items }))
  }
}
